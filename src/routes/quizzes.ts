import auth from "@/middlewares/auth";
import Quiz from "@/models/interfaces/Quiz";
import { ClassroomModel } from "@/models/schemas/classroom";
import { PostModel } from "@/models/schemas/post";
import quizValidator from "@/models/validators/quiz";
import express, { Request } from "express";
import { ReasonPhrases } from "http-status-codes";

const router = express.Router({ mergeParams: true });

/**
 * Add quiz
 */
router.post("/", auth, async (req: Request, res) => {
  // Classroom must exist
  const classroom = await ClassroomModel.findById(req.params.classroomId);
  if (!classroom) throw new Error(ReasonPhrases.NOT_FOUND);

  // Validate input
  const quizToAdd: Quiz = {
    authorId: req.user?._id,
    classroomId: req.params.classroomId,
    ...req.body,
  };
  if (quizValidator.validate(quizToAdd).error)
    throw new Error(ReasonPhrases.BAD_REQUEST);

  // Add quiz
  const createdQuiz = await PostModel.create(quizToAdd);

  res.send(createdQuiz);
});

export default router;
