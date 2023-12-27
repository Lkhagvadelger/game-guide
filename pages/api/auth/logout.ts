import { createHandler } from "@api/handler";

const handler = createHandler();

handler.get((req, res) => {
  req.logOut(()=>{});
  res.sendSuccess({});
});

export default handler;
