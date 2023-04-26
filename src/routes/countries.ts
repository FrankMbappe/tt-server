import { CountryModel } from "@/models/schemas/country";
import express from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import escapeRegExp from "lodash/escapeRegExp";

const router = express.Router();
const payloadSchema = Joi.object({
  search: Joi.string().regex(/^[\+\w\-\s]+$/),
});

/**
 * Get all countries
 */
router.get("/", async (req, res) => {
  // If no search string, return all countries
  if (!req.body.search) {
    const countries = await CountryModel.find().sort("name");
    return res.send(countries);
  }

  // Input validation
  if (payloadSchema.validate(req.body).error)
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid search value.");

  // Countries containing search string
  const pattern = new RegExp(`^.*${escapeRegExp(req.body.search)}.*$`, "i");
  const countries = await CountryModel.find({
    $or: [{ name: pattern }, { code: pattern }, { dialCode: pattern }],
  }).sort("name");

  res.send(countries);
});

export default router;
