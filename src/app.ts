import { IncomingMessage, Server, ServerResponse } from "node:http";

import { config } from "@utils/config";
import { createServer } from "@utils/createServer";
import { connectToDB, disconnectFromDB, TConnection } from "@utils/db";
import { logger } from "@utils/logger";

const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
type TServer = Server<typeof IncomingMessage, typeof ServerResponse>;

async function gracefulShutdown(
  signal: typeof signals[number],
  server: TServer,
  connection: TConnection
): Promise<void> {
  logger.info(`Received ${signal} signal, shutting server down gracefully`);
  await disconnectFromDB(connection);
  await server.close();
  process.exit(0);
}

let retryCount = config.MAX_RETRIES;
export async function startServer(): Promise<void> {
  try {
    const connection = await connectToDB();
    const server = (await createServer()).listen({
      port: config.PORT,
      host: config.HOST,
    });
    logger.info(`Server started at ${new Date().toISOString()} on port ${config.PORT}`);
    signals.forEach(signal =>
      process.on(signal, () => gracefulShutdown(signal, server, connection))
    );
  } catch (error) {
    if (--retryCount) {
      logger.error(
        `Error starting server. Retrying in ${
          config.RETRY_DELAY / 1000
        } second(s). Retries left: ${retryCount}`
      );
      setTimeout(startServer, config.RETRY_DELAY);
    } else {
      logger.error(`Error starting server. Retries exhausted. Exiting process`);
      logger.error(error);
      process.exit(1);
    }
  }
}

startServer();
