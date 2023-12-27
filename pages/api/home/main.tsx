import { createHandler } from "@api/handler";
import { getCategory, getMainCategory } from "@lib/category/api/category";
import { getCountry } from "@lib/country/api/main";
import { getPromos } from "@lib/home/api/main";
import { ERROR_MESSAGES } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    if (req.query.countryCode) {
      const country = await getCountry(req.query.countryCode);

      if (country?.id) {
        // console.log("countryID-", country.id);
        const mainCategories = await getMainCategory(country.id);
        const categories = await getCategory(country.id);
        const promos = await getPromos(country.id);

        res.sendSuccess({
          mainCategories,
          categories,
          promos,
        });
      } else {
        res.sendSuccess({ categories: null, promos: null });
      }
    } else {
      res.sendError(401, ERROR_MESSAGES.BAD_REQUEST, "not-logged-in");
    }
  } catch (error: any) {
    res.sendError(401, ERROR_MESSAGES.BAD_REQUEST, error);
  }
});

export default handler;
