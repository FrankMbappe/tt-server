import { DbModelEnum } from "@/enums";
import mongoose from "mongoose";
import Country from "../interfaces/Country";

const countrySchema = new mongoose.Schema<Country>({
  code: String,
  dialCode: { type: String, required: true },
  name: { type: String, required: true },
  flag: String,
});

export const CountryModel = mongoose.model(DbModelEnum.Country, countrySchema);

export default countrySchema;
