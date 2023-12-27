import * as passport from "passport";
import { createHandler } from "@api/handler";
import { ERROR_MESSAGES } from "@util/errors";
import jwt from "jsonwebtoken";
import { getZarList } from "@lib/zar/service/zarService";
import { getCountry } from "@lib/country/api/main";

const handler = createHandler();

handler.get(async (req, res, next) => {
  const countryCode = req.query.countryCode as string;

  if (!countryCode) {
    res.sendError(401, ERROR_MESSAGES.BAD_REQUEST, "countryCode null");
  }

  const list = await getZarList(countryCode);

  res.sendSuccess({ list });
});

export default handler;
