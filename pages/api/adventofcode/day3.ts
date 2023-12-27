import * as passport from "passport";
import { createHandler } from "@api/handler";
import { ERROR_MESSAGES } from "@util/errors";
import jwt from "jsonwebtoken";
import { createZar } from "@lib/zar/service/zarService";

const handler = createHandler();

handler.get(async (req, res, next) => {
    const fs = require('fs');
    const data = fs.readFileSync('/input.txt', 'utf8');

    console.log(data)

    res.sendSuccess({ success: true })
});

export default handler;
