import { EmailType } from "@api/email/types";
import { createHandler } from "@api/handler";
import {
  consumePIN,
  createPINandSend as createPINandSendToUser,
  updateLastLoggedInDate,
  verifyPIN,
} from "@lib/user/api/pin";
import { AppError, ERROR_MESSAGES } from "@util/errors";
import jwt from "jsonwebtoken";
import passport from "passport";

const handler = createHandler();

handler
  .patch(async (req, res) => {
    let [username] = [req.body.username as string];
    const method = "email";

    const phoneNumber = req.body.phoneNumber as string;

    // if (method === "phone") {
    //     username = await validatePhone(req.body.code, username);
    // }

    console.log("user login start here");

    await createPINandSendToUser(method, username, EmailType.OneTimeLoginCode);

    res.sendSuccess({ success: true });
  })
  .post(async (req, res, next) => {
    passport.authenticate("local", async (err: any, user: any) => {
      if (err || !user) {
        return res.sendError(401, ERROR_MESSAGES.UNAUTHORIZED, err.message);
      }
      if (user) {
        await consumePIN(user.id);
        await updateLastLoggedInDate(user.id);
      }

      req.login(user, (err) => {
        if (err) return res.sendError(401, ERROR_MESSAGES.UNAUTHORIZED);

        if (!req.query.type || req.query.type === "session") {
          req.session.userId = user.id;
          return res.sendSuccess(user);
        }

        if (req.query.type === "jwt") {
          const body = {
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
            username: user.email,
            phoneNumber: user.phoneNumber,
            phoneNumberVerified: user.phoneNumberVerified,
            role: user.role,
            profile: user.profile,
          };
          if (!process.env.JWT_SECRET)
            throw new Error("Jwt secret not provided in env");

          const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
            expiresIn: "365d",
            issuer: "1tseg.mn",
          });

          return res.json({ ...body, token });
        }
      });
    })(req, res, next);
  });

export default handler;
