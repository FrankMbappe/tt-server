import express, { Request, Response } from "express";
import { PostModel } from "@/models/schemas/post";
import { ReasonPhrases } from "http-status-codes";
import upload from "@/libs/multerCloudinary";
import cloudinary from "@/libs/cloudinary";
import commentRouter from "./comments";
import auth from "@/middlewares/auth";
import { ClassroomModel } from "@/models/schemas/classroom";
import { SupportedFileTypeEnum, convertMulterToUserFile } from "@/libs/multer";
import Post from "@/models/interfaces/Post";
import postValidator from "@/models/validators/post";
import UserFile from "@/models/interfaces/UserFile";

type RequestParams = { classroomId: string };

const router = express.Router({ mergeParams: true });

// Sub routers
router.use("/:postId/comments", commentRouter);

/**
 * Get all posts of a classroom
 */
router.get<RequestParams>("/", async (req, res) => {
  const posts = await PostModel.find({ classroomId: req.params.classroomId });
  res.send(posts);
});

/**
 * Get post by ID
 */
router.get<RequestParams & { postId: string }>("/:postId", async (req, res) => {
  const post = await PostModel.findById(req.params.postId);
  if (!post) throw new Error(ReasonPhrases.NOT_FOUND);

  res.send(post);
});

/**
 * Add post
 */
router.post(
  "/",
  [auth, upload.single("_file")],
  async (req: Request, res: Response) => {
    // Classroom must exist
    const classroom = await ClassroomModel.findById(req.params.classroomId);
    if (!classroom) throw new Error(ReasonPhrases.NOT_FOUND);

    // If post has a file, push to cloudinary
    let file: UserFile | null = null;
    if (req.file) {
      const fileType = req.file.mimetype.includes(SupportedFileTypeEnum.Image)
        ? SupportedFileTypeEnum.Image
        : SupportedFileTypeEnum.Video;

      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { resource_type: fileType }
      );

      file = {
        ...convertMulterToUserFile(req.file),
        createdAt: new Date(),
        url: secure_url,
        publicCloudId: public_id,
      };
    }

    // Validate post input
    const postToCreate: Post = {
      authorId: req.user?._id,
      classroomId: req.params.classroomId,
      ...(file && { file }),
      ...req.body,
    };
    if (postValidator.validate(postToCreate).error)
      throw new Error(ReasonPhrases.BAD_REQUEST);

    // Add post
    const createdPost = await PostModel.create(postToCreate);
    res.send(createdPost);
  }
);

/**
 * Update post
 */
router.put("/:postId", auth, async (req: Request, res) => {
  // Validate input
  const postUpdate: Partial<Post> = {
    authorId: req.user?._id,
    classroomId: req.params.classroomId,
    ...req.body,
  };
  if (postValidator.validate(postUpdate).error)
    throw new Error(ReasonPhrases.BAD_REQUEST);

  // Update post
  const result = await PostModel.findByIdAndUpdate(req.params.postId, {
    $set: postUpdate,
  });

  res.send(result);
});

/**
 * Delete post
 */
router.delete("/:postId", auth, async (req, res) => {
  // Delete post
  const result = await PostModel.findByIdAndDelete(req.params.postId);
  if (!result) throw new Error(ReasonPhrases.NOT_FOUND);

  res.send(result);
});

export default router;
