import cloudinary from "@/libs/cloudinary";
import { convertMulterToUserFile, upload } from "@/libs/multer";
import auth from "@/middlewares/auth";
import Tutorial from "@/models/interfaces/Tutorial";
import TutorialStep from "@/models/interfaces/TutorialStep";
import { PostModel } from "@/models/schemas/post";
import tutorialValidator from "@/models/validators/tutorial";
import express, { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const router = express.Router({ mergeParams: true });

/**
 * Add tutorial
 */
router.post(
  "/",
  [auth, upload.array("videos", 10)],
  async (req: Request, res: Response) => {
    const videoFiles = req.files as Express.Multer.File[];

    // If no files provided, exit
    if (!videoFiles?.length)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("No video files provided.");

    // Validate tutorial
    const tutorialToCreate: Tutorial = {
      authorId: req.user?._id,
      classroomId: req.params.classroomId,
      ...req.body,
    };
    if (tutorialValidator.validate(tutorialToCreate).error)
      throw new Error(ReasonPhrases.BAD_REQUEST);

    // Upload each video
    const steps = req.body.steps as TutorialStep[];
    await Promise.all(
      videoFiles.map(async (file, index) => {
        // Upload video
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path,
          { resource_type: "video" }
        );
        // Update tutorial step
        steps[index] = {
          ...steps[index],
          video: {
            ...convertMulterToUserFile(file),
            createdAt: new Date(),
            url: secure_url,
            publicCloudId: public_id,
          },
        };
      })
    );

    // Add tutorial
    const tutorial = await PostModel.create({ ...tutorialToCreate, steps });

    res.send(tutorial);
  }
);

export default router;
