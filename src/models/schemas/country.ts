import { DbModelEnum } from "@/enums";
import { Schema, model } from "mongoose";
import Country from "../interfaces/Country";

const countrySchema = new Schema<Country>({
  code: String,
  dialCode: { type: String, required: true },
  name: { type: String, required: true },
  flag: String,
});

export const CountryModel = model<Country>(DbModelEnum.Country, countrySchema);

export default countrySchema;
