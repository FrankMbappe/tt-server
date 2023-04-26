import express, { Request } from "express";
import auth from "@/middlewares/auth";
import { userCategoryValidator } from "@/models/validators/user.js";
import { UserModel } from "@/models/schemas/user.js";
import { ReasonPhrases } from "http-status-codes";

const router = express.Router();

/**
 * Get all users
 */
router.get("/", async (_, res) => {
  const users = await UserModel.find().sort("creationDate");
  res.send(users);
});

/**
 * Get single user by ID
 */
router.get("/:id", async (req: Request, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) throw new Error(ReasonPhrases.NOT_FOUND);

  res.send(user);
});

/**
 * Get single user from JWT
 */
router.get("/me", auth, async (req: Request, res) => {
  const user = await UserModel.findById(req.user?._id);
  res.send(user);
});

// TODO Update user

/**
 * Update user category
 */
router.put("/category", auth, async (req: Request, res) => {
  // Validate input
  const error = userCategoryValidator.validate(req.body.category).error;
  if (error) return res.status(400).send(error.details[0].message);

  // Update user category
  const user = await UserModel.findByIdAndUpdate(req.user?._id, {
    $set: { category: req.body.category },
  });
  if (!user) throw new Error(ReasonPhrases.NOT_FOUND);

  // Generate new JWT
  const authToken = user.generateAuthToken();

  res.send(authToken);
});

export default router;
