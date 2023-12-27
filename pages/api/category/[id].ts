import * as passport from "passport";
import { createHandler } from "@api/handler";
import { ERROR_MESSAGES } from "@util/errors";
import jwt from "jsonwebtoken";
import { getZarList } from "@lib/zar/service/zarService";
import { getCountry } from "@lib/country/api/main";

const handler = createHandler();

handler.get(async (req, res, next) => {
    const categoryId = req.query.id as string;
    if (!categoryId) {
        res.sendError(400, ERROR_MESSAGES.BAD_REQUEST, "category-id-not-found");
    }

    const list = await getZarList(categoryId);

    res.sendSuccess({ list });
});

export default handler;
