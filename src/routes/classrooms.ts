import { Request, Response, Router } from "express";
import { ClassroomModel } from "@/models/schemas/classroom";
import authUserCategory from "@/middlewares/authUserCategory";
import { UserCategoryEnum } from "@/enums";
import classroomValidator from "@/models/validators/classroom";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { UserModel } from "@/models/schemas/user";
import auth from "@/middlewares/auth";

const router = Router();

// TODO Get all classrooms by user ID

/**
 * Get all classrooms
 */
router.get("/", auth, async (req, res) => {
  const classrooms = await ClassroomModel.find({});
  res.send(classrooms);
});

/**
 * Get a classroom by ID
 */
router.get("/:id", auth, async (req, res) => {
  const classroom = await ClassroomModel.findById(req.params.id).populate(
    "teacher posts.authorId posts.comments.authorId" +
      " quizzes.authorId quizzes.comments.authorId" +
      " tutorials.authorId tutorials.comments.authorId"
  );
  res.send(classroom);
});

/**
 * Add a classroom
 */
router.post(
  "/",
  [auth, authUserCategory(UserCategoryEnum.Teacher)],
  async (req: Request, res: Response) => {
    const classroomToAdd = { ...req.body, teacherId: req.user?._id };

    // Validate input
    const { error } = classroomValidator.validate(classroomToAdd);
    if (error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(error.details.map(({ message }) => message));

    // Start transaction
    const session = await ClassroomModel.startSession();
    session.startTransaction();
    try {
      // Add classroom
      const classroom = new ClassroomModel(classroomToAdd);
      await classroom.save();

      // Update author
      const author = await UserModel.findByIdAndUpdate(
        req.user?._id,
        {
          $push: { classroomIds: classroom._id },
        },
        { new: true }
      );
      if (!author) throw new Error();

      // Commit transaction
      await session.commitTransaction();
      return res.send({
        classroom: classroom,
        authorClassroomIds: author.classroomIds,
      });
    } catch (error) {
      // Abort transaction
      await session.abortTransaction();
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    } finally {
      // End session
      session.endSession();
    }
  }
);

/**
 * Update a classroom
 */
router.put("/:id", auth, async (req, res) => {
  // Validate input
  // TODO Might be a problem here with the 'teacher' property not set
  const { error } = classroomValidator.validate(req.body);
  if (error)
    return res.status(400).send(error.details.map(({ message }) => message));

  // Update classroom
  const classroom = await ClassroomModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.send(classroom);
});

/**
 * Quit a classroom
 */
router.put("/quit/:id", auth, async (req: Request, res) => {
  // Start transaction
  const session = await ClassroomModel.startSession();
  session.startTransaction();

  try {
    const classroom = await ClassroomModel.findById(req.params.id);
    if (!classroom) {
      await session.abortTransaction();
      return res.status(StatusCodes.NOT_FOUND).send("No such classroom");
    }

    // Remove user from classroom members
    const updatedClassroom = await ClassroomModel.findByIdAndUpdate(
      classroom._id,
      {
        $pull: { members: req.user?._id },
      },
      { new: true }
    );
    if (!updatedClassroom) throw new Error();

    // Remove classroom from user classrooms
    const userLeaving = await UserModel.findByIdAndUpdate(
      req.user?._id,
      {
        $pull: { classroomIds: classroom._id },
      },
      { new: true }
    );
    if (!userLeaving) throw new Error();

    // Commit transaction
    await session.commitTransaction();
    res.send({
      classroomMembers: updatedClassroom.members,
      userClassrooms: userLeaving.classroomIds,
    });
  } catch (error) {
    // Abort transaction
    await session.abortTransaction();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  } finally {
    // End session
    session.endSession();
  }
});

/**
 * Delete classroom
 */
router.delete(
  "/:id",
  [auth, authUserCategory(UserCategoryEnum.Teacher)],
  async (req: Request, res: Response) => {
    // Start transaction
    const session = await ClassroomModel.startSession();
    session.startTransaction();

    try {
      const classroom = await ClassroomModel.findById(req.params.id);
      if (!classroom) {
        await session.abortTransaction();
        return res.status(StatusCodes.NOT_FOUND).send("No such classroom");
      }

      // Remove classroom ref from its members
      await Promise.all(
        classroom.members.map(({ userId }) =>
          UserModel.findByIdAndUpdate(userId, {
            $pull: { classroomIds: classroom._id },
          })
        )
      );

      // Delete classroom
      await ClassroomModel.findByIdAndDelete(classroom._id);

      // Commit transaction
      await session.commitTransaction();
      res.send({
        deletedClassroom: classroom,
        usersUpdatedCount: classroom.members.length,
      });
    } catch (ex) {
      // Abort transaction
      await session.abortTransaction();
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    } finally {
      // End session
      session.endSession();
    }
  }
);

// External route handlers
// router.use("/:classroomId/posts", postRouter);
// router.use("/:classroomId/quizzes", quizRouter);
// router.use("/:classroomId/tutorials", tutorialRouter);

export default router;
