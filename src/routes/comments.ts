import auth from "@/middlewares/auth";
import Comment from "@/models/interfaces/Comment";
import { ClassroomModel } from "@/models/schemas/classroom";
import { CommentModel } from "@/models/schemas/comment";
import { PostModel } from "@/models/schemas/post";
import commentValidator from "@/models/validators/comment";
import { Request, Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const router = Router({ mergeParams: true });

/**
 * Get all comments of a post
 */
router.get("/", auth, async (req, res) => {
  // Get comments
  const comments = await CommentModel.find({ postId: req.params.postId });

  // Return OK
  res.send(comments);
});

/**
 * Get single comment by ID
 */
router.get("/:commentId", auth, async (req, res) => {
  // Get comment list from the post of a classroom
  const comment = await CommentModel.findById(req.params.commentId);

  // Return OK
  res.send(comment);
});

/**
 * Add comment
 */
router.post("/", auth, async (req: Request, res) => {
  // Validate input
  const commentToAdd: Comment = { author: req.user?._id, ...req.body };
  const error = commentValidator.validate(commentToAdd).error;
  if (error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(error.details.map(({ message }) => message));

  // Start transaction
  const session = await CommentModel.startSession();
  session.startTransaction();

  try {
    // Add comment
    const comment = new CommentModel(commentToAdd);
    await comment.save();

    // Increment post's comment count
    const result = await PostModel.findByIdAndUpdate(req.params.postId, {
      $inc: { commentsCount: 1 },
    });

    // Commit transaction
    await session.commitTransaction();
    res.send(result);
  } catch (error) {
    // Abort transaction
    await session.abortTransaction();
    throw new Error();
  } finally {
    // End session
    session.endSession();
  }
});

/**
 * Delete comment
 */
router.delete("/:commentId", auth, async (req, res) => {
  // TODO Start transaction
  // Delete comment likes
  // Delete comment
  // Decrease post's comment count
  // Commit transaction
});

export default router;
