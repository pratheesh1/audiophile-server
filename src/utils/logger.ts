import { isDevEnv } from "@utils/config";
import { formatDateTime } from "@utils/datetime";
import { createDir, createFile } from "@utils/fs";
import pino from "pino";
import pretty from "pino-pretty";

const pinoConfig = {
  redact: {
    paths: [
      "req.headers.authorization",
      "res.headers.authorization",
      "req.headers.cookie",
      "res.headers.cookie",
      "hostname",
      "pid",
    ],
    remove: false,
    censor: "**REDACTED**",
  },
  timestamp() {
    return `,"time":" ${new Date().toISOString()} "`;
  },
};

// ---------- stdout ---------- //
const stream = pino.destination(1);
const prettyStream = () =>
  pretty({
    colorize: true,
    destination: stream,
  });

// ---------- file ---------- //
const logFile = `./log/${formatDateTime(new Date())}_audiophile_api.log`;
createDir("./log", () => createFile(logFile));
const fileStream = pino.destination(logFile);
process.on("SIGHUP", () => fileStream.reopen());

// ------ export logger ------ //
const logStream = isDevEnv ? prettyStream() : fileStream;
export const logger = pino(pinoConfig, logStream);
export const fileLogger = pino(pinoConfig, fileStream);
