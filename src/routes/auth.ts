import { Router } from "express";
import config from "config";
import Joi from "joi";
import twilioClientFactory from "twilio";
import { ConfigEntryEnum, UserCategoryEnum } from "@/enums";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "@/models/schemas/user";

const router = Router();
const twilioClient = twilioClientFactory(
  config.get(ConfigEntryEnum.TwilioAccountSid),
  config.get(ConfigEntryEnum.TwilioAuthToken)
);
const payloadSchema = Joi.object<{
  phone: string;
  code: string;
}>({
  phone: Joi.string().min(5).max(255).required(),
  code: Joi.string().min(4).max(255),
});

/**
 * Send OTP
 */
router.get("/", async (req, res) => {
  const { error, value: query } = payloadSchema.validate(req.query);
  if (error || !query)
    return res.status(StatusCodes.BAD_REQUEST).send(error?.details[0].message);

  try {
    const verificationInstance = await twilioClient.verify.v2
      .services(config.get(ConfigEntryEnum.TwilioVerifySid))
      .verifications.create({ to: query.phone, channel: "sms" });

    return res.send(verificationInstance);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
});

/**
 * Verify OTP
 */
router.get("/confirm", async (req, res) => {
  const { error, value: query } = payloadSchema.validate(req.query);
  if (error || !query)
    return res.status(StatusCodes.BAD_REQUEST).send(error?.details[0].message);

  try {
    const { dateCreated, status, to } = await twilioClient.verify.v2
      .services(config.get(ConfigEntryEnum.TwilioVerifySid))
      .verificationChecks.create({ to: query.phone, code: query.code });

    // Prepare response
    const response = {
      createdOn: dateCreated.toDateString(),
      isApproved: status === "approved",
      phone: to,
    };

    // If request has not been approved (e.g., Wrong code), exit right away
    if (!response.isApproved)
      return res.status(StatusCodes.BAD_REQUEST).send(response);

    // Check if user already exists with current phone number
    const user = await UserModel.findOne({ phoneNumber: response.phone });

    // If no such user, create new one
    if (!user) {
      const newUser = new UserModel({
        category: UserCategoryEnum.Student,
        phoneNumber: response.phone,
      });
      await newUser.save();

      // Generate JWT
      const token = newUser.generateAuthToken();

      return res.send({
        res: response,
        authToken: token,
        isNew: true, // User is new
      });
    }

    // If user exists, generate JWT
    const token = user.generateAuthToken();

    return res.send({
      res: response,
      authToken: token,
      isNew: false, // User existed already
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
});

export default router;
