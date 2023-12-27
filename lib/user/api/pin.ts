import { differenceInMilliseconds as dm } from "date-fns";
import { prisma } from "@api/prisma";
import { EmailType } from "@api/email/types";
import { AppError } from "@util/errors";
import { sendEmailValidationCode } from "@api/email/mailService";

const expiry = 24 * 60 * 60 * 1000;

const findUserByUsername = (method: string, username: string) => {
  return prisma.user.findUnique({
    where: method === "phone" ? { phoneNumber: username } : { email: username },
    include: { profile: true },
  });
};
const generatePIN = (method: string) =>
  Math.floor(Math.random() * 1000000)
    .toString().padStart(4,"0").substring(0, 4);

const isExpired = (date: Date | null) => !date || expiry < dm(new Date(), date);

export const createPINandSend = async (
  method: string,
  username: string,
  emailTemplate: EmailType = EmailType.OneTimeLoginCode
) => {
  let user = await findUserByUsername(method, username);

  if (!user) {
    await prisma.user.create({
      data: {
        email: username,
        phoneNumber: username,
      },
    });

    console.log("user created");
  }

  user = await findUserByUsername(method, username);

  if (!user) return;

  const pin = username == "tester@negtseg.mn" ? "1234" : generatePIN(method);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      pin,
      pinType: method,
      pinCreatedAt: new Date(),
      pinVerifiedAt: null,
    },
  });

  if (method === "phone") {
  } else if (method === "email") {
    pin != "1234" && await sendEmailValidationCode(username, pin!);
    //[TODO]
    //send email using gmail service
  }

  return user;
};
export const updateLastLoggedInDate = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { lastLoggedInAt: new Date() },
  });
};
export const verifyPIN = async (
  method: string,
  username: string,
  pin: string
) => {
  const user = await findUserByUsername(method, username);

  if (!user) throw AppError.BadRequest("validation.pin.check.invalid");
  if (user.pinType !== method || isExpired(user.pinCreatedAt))
    throw AppError.BadRequest("validation.pin.check.invalid");

  if (method === "phone") {
    // let data;
    // try {
    //     data = await confirmVerificationCode(username, pin);
    // } catch (e: any) {
    //     if (e.code === 20404)
    //         throw AppError.BadRequest("validation.pin.check.no-pin");
    //     else throw AppError.BadRequest("validation.pin.check.error");
    // }
    // if (!data?.valid) throw AppError.BadRequest("validation.pin.check.invalid");
  } else if (method === "email") {
    if (user.pin !== pin)
      throw AppError.BadRequest("validation.pin.check.invalid");
  } else throw AppError.BadRequest("undefined");

  await prisma.user.update({
    where: { id: user.id },
    data: { pin, pinVerifiedAt: new Date() },
  });
};

export const consumePIN = async (
  userId: string
) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      pin: null,
      pinType: null,
      pinCreatedAt: null,
      pinVerifiedAt: null,
    },
  });
};
