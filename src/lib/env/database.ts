import "server-only";

import { parseDatabaseEnv } from "./schema";

export const databaseEnv = parseDatabaseEnv({
  DATABASE_URL: process.env.DATABASE_URL,
});
