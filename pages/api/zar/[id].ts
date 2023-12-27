import * as passport from "passport";
import { createHandler } from "@api/handler";
import { ERROR_MESSAGES } from "@util/errors";
import jwt from "jsonwebtoken";
import { createZar, getZarById } from "@lib/zar/service/zarService";
import { getCountry } from "@lib/country/api/main";

const handler = createHandler();

handler
  .get(async (req, res, next) => {
    const zarId = req.query.id as string;

    if (!zarId) {
      res.sendError(400, ERROR_MESSAGES.BAD_REQUEST, "zar-id-not-found");
    }

    const item = await getZarById(zarId);

    res.sendSuccess({ item });
  })
  .post(async (req, res, next) => {
    console.log("Zar create start");

    if (!req.user) {
      return res.sendError(401, ERROR_MESSAGES.UNAUTHORIZED, "not-logged-in");
    }

    const {
      title,
      description,
      categoryId, //string
      categoryIds, //[string]
      categoryFieldData,
      location,
      media, //[images]
      price,
      compareAtPrice,
      isFlexiblePrice,
      countryCode,
    } = req.body;

    console.log("hahha");

    if (!countryCode) {
      res.sendError(401, ERROR_MESSAGES.BAD_REQUEST, "countryCode null");
    }

    const selCountry = await getCountry(countryCode);

    console.log(req.user);

    if (selCountry) {
      const newZar = await createZar(
        req.body,
        "clqcdyomg00044x9tttbspwp9",
        selCountry.id
      );

      res.sendSuccess({ success: true, zarId: newZar.id });
    }

    res.sendError(401, ERROR_MESSAGES.BAD_REQUEST, "countryCode not found");
  });

export default handler;
