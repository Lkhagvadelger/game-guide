import { createHandler } from "@api/handler";
import { getRecentZarList } from "@lib/zar/service/zarService";

const handler = createHandler();

handler.get(async (req, res, next) => {

    const list = await getRecentZarList();

    res.sendSuccess({list});
});

export default handler;
