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

export async function startServer(): Promise<void> {
  const server = (await createServer()).listen({
    port: config.PORT,
    host: config.HOST,
  });
  const connection = await connectToDB();
  logger.info(`Server started on ${new Date().toISOString()}`);

  signals.forEach(signal => process.on(signal, () => gracefulShutdown(signal, server, connection)));
}

startServer();
