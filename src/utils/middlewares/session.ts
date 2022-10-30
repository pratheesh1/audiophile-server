import { config, isDevEnv } from "@utils/config";
import { Request } from "express";
import session from "express-session";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import { syncBindApiErrCode } from "./errHandler";

const sessionSetup = session({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  genid: function (_req: Request) {
    // TODO: check if req properties need to be used instead of uuid
    return uuidv4();
  },
  name: "sid",
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: isDevEnv,
    httpOnly: true, // https://github.com/expressjs/session#cookiehttponly
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
    sameSite: "lax",
  },
});

export default syncBindApiErrCode(sessionSetup, StatusCodes.UNAUTHORIZED);
