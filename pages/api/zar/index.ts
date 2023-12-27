import * as passport from "passport";
import { createHandler } from "@api/handler";
import { ERROR_MESSAGES } from "@util/errors";
import jwt from "jsonwebtoken";
import { createZar, getZarById } from "@lib/zar/service/zarService";
import { getCountry } from "@lib/country/api/main";

const handler = createHandler();

handler.post(async (req, res, next) => {
  //print header values
  console.log(req.headers);
  if (!req.user) {
    return res.sendError(401, ERROR_MESSAGES.UNAUTHORIZED, "not-logged-in");
  }

  let {
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

  if (!countryCode) {
    res.sendError(401, ERROR_MESSAGES.BAD_REQUEST, "country-code-null");
  }
  if (!media) {
    const randFolder = Math.floor(Math.random() * 99) + 1;
    media = {
      images:
        [randFolder + "/1.jpg",
        randFolder + "/2.jpg",
        randFolder + "/3.jpg",
        randFolder + "/thumbnail.jpg"]
    }
  }
  const selCountry = await getCountry(countryCode);
  if (selCountry) {
    const newZar = await createZar(req.body, selCountry.id, req.user.id);

    res.sendSuccess({ success: true, zarId: newZar.id });
  }

  res.sendError(400, ERROR_MESSAGES.BAD_REQUEST, "country-code-not-found");
}).get(async (req, res, next) => {

  res.sendSuccess({ success: Math.floor(Math.random() * 99) + 1 });

})

export default handler;
