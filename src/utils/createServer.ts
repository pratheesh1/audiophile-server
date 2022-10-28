import { logError, logRequest } from "@utils/middleware";
import compression from "compression";
import express, { Express } from "express";

import docsRouter from "@/modules/docs/docs.route";

export async function createServer(): Promise<Express> {
  const app = express();
  app.use(express.json());
  app.use(compression());
  app.use(express.urlencoded({ extended: true }));

  app.use(logRequest);
  app.use("/docs", docsRouter);

  app.use(logError);
  return app;
}
