import { DbModelEnum } from "@/enums";
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  code: String,
  dialCode: { type: String, required: true },
  name: { type: String, required: true },
  flag: String,
});

export const CountryModel = mongoose.model(DbModelEnum.Country, countrySchema);

export default countrySchema;
