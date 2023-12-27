import { createHandler } from "@api/handler";
import { validateName } from "@lib/profile/data/validators";
import { validateEmail } from "@lib/user/data/validators";
import { ERROR_MESSAGES } from "@util/errors";

const handler = createHandler();

handler
  .get(async (req, res) => {
    try {
    
      res.sendSuccess({});
    } catch (error) {
      res.sendError(error);
    }
  })
  .patch(async (req, res) => {
    try {
      if (!validateName(req.body.firstName)) {
        return res.sendError(
          400,
          ERROR_MESSAGES.BAD_REQUEST,
          "validation-first-name"
        );
      }

      if (!validateName(req.body.lastName)) {
        return res.sendError(
          400,
          ERROR_MESSAGES.BAD_REQUEST,
          "validation-last-name"
        );
      }
      if (!validateEmail(req.body.emailAddress)) {
        return res.sendError(
          400,
          ERROR_MESSAGES.BAD_REQUEST,
          "validation-email"
        );
      }

    
      res.sendSuccess({});
    } catch (error) {
      res.sendError(error);
    }
  });

export default handler;
