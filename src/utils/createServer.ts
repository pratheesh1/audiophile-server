import { logError, logRequest } from "@utils/middleware";
import compression from "compression";
import express, { Express } from "express";
import path from "path";

export type TAppConfig = { staticDirs: string[]; rootDir: string };

export async function createServer(config: TAppConfig): Promise<Express> {
  const app = express();
  app.use(express.json());
  app.use(compression());
  app.use(express.urlencoded({ extended: true }));

  for (const file of config.staticDirs) {
    app.use(express.static(path.join(config.rootDir, file)));
  }

  app.use(logRequest);

  app.use(logError);
  return app;
}
