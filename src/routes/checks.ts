import { Router } from "express";
import config from "config";
import debugFactory from "debug";
import twilioClientFactory from "twilio";
import { ConfigEntryEnum } from "@/enums/index.js";
import { UserModel } from "@/models/schemas/user";
import { StatusCodes } from "http-status-codes";

const router = Router();
const twilioClient = twilioClientFactory(
  config.get(ConfigEntryEnum.TwilioAccountSid),
  config.get(ConfigEntryEnum.TwilioAuthToken)
);
const debug = debugFactory("ns:routes:checks");

/**
 * Check if phone number exists
 */
router.get("/:phone", async (req, res) => {
  const noSuchPhoneNumberError = new Error("No such phone number");
  try {
    const phoneNumberInstance = await twilioClient.lookups.v1
      .phoneNumbers(req.params.phone)
      .fetch({ type: ["carrier"] });

    const phoneNumberExists =
      (await UserModel.findOne({
        phoneNumber: phoneNumberInstance.phoneNumber,
      }).countDocuments()) > 0;
    if (!phoneNumberExists) throw noSuchPhoneNumberError;

    return res.send({
      ...phoneNumberInstance,
      phoneNumberExists,
    });
  } catch (error: any) {
    debug(error);

    return error.message == noSuchPhoneNumberError.message
      ? res
          .status(StatusCodes.NOT_FOUND)
          .send(`'${req.params.phone}' does not match any valid phone number.`)
      : res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(
            `Internal server error verifying if '${req.params.phone}' already exists.`
          );
  }
});

export default router;
