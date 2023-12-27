import { createHandler } from "@api/handler";
import { getTopZarList, zarSelectType } from "@lib/zar/service/zarService";

const handler = createHandler();

handler.get(async (req, res, next) => {

    const list = await getTopZarList();

    res.sendSuccess({
        list
    });
});

export default handler;
