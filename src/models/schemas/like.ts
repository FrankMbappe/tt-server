import mongoose from "mongoose";
import { DbModelEnum } from "@/enums";

const likeSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now },
  author: { type: mongoose.Types.ObjectId, ref: DbModelEnum.User },
});

export default likeSchema;
