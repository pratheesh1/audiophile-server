import { Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";

const schema = Type.Object({
  NODE_ENV: Type.String({
    enum: ["development", "production", "test"],
    default: "development",
  }),
  PORT: Type.Number({ default: 4000 }),
  HOST: Type.String({ default: "0.0.0.0" }),
  DATABASE_URL: Type.String(),
  SHADOW_DATABASE_URL: Type.String(),
});

type EnvSchema = Static<typeof schema>;

export const config = envSchema<EnvSchema>({
  schema,
  dotenv: true,
});

export const isDevEnv: boolean = config.NODE_ENV === "development";
