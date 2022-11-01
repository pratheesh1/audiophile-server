import cookie from "@middlewares/cookie";
import { handleError } from "@middlewares/errHandler";
import { logRequest } from "@middlewares/logRequest";
import sessionMiddleware from "@middlewares/session";
import countriesRouter from "@modules/country/country.router";
import { isDevEnv } from "@utils/config";
import compression from "compression";
import express, { Express } from "express";
import path from "path";

export type TAppConfig = { staticDirs: string[]; rootDir: string };

export async function createServer(config: TAppConfig): Promise<Express> {
  const app = express();

  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookie);

  if (isDevEnv) {
    // https://github.com/expressjs/session#cookiesecure
    app.set("trust proxy", 1); // trust first proxy
  }
  app.use(sessionMiddleware);

  app.use(logRequest);
  for (const file of config.staticDirs) {
    app.use(express.static(path.join(config.rootDir, file)));
  }

  app.use("/api/country", countriesRouter);

  app.use(handleError);
  return app;
}
