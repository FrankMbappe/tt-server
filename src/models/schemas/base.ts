import { Schema } from "mongoose";
import Base from "../interfaces/Base";

const baseSchema = new Schema<Base>({
  createdAt: { type: Date, default: Date.now },
});

export default baseSchema;
