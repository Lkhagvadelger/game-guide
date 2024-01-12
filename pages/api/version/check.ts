import { createHandler } from "@api/handler";
import { validateName } from "@lib/profile/data/validators";
import { validateEmail } from "@lib/user/data/validators";
import { ERROR_MESSAGES } from "@util/errors";

const handler = createHandler();

handler
    .get(async (req, res) => {
        try {
            res.sendSuccess({ onrintation: true });
        } catch (error) {
            res.sendError(error);
        }
    })


export default handler;
