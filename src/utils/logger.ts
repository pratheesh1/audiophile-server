import pino from "pino";
import pretty from "pino-pretty";

const stream = pino.destination(1);
const prettyStream = () =>
  pretty({
    colorize: true,
    destination: stream,
  });

const logStream = process.env.NODE_ENV === "production" ? stream : prettyStream();

export const logger = pino(
  {
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
  },
  logStream
);
