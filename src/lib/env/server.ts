import "server-only";

import { parseServerEnv } from "./schema";

export const serverEnv = parseServerEnv({
  NODE_ENV: process.env.NODE_ENV,
  TICKETMASTER_API_KEY: process.env.TICKETMASTER_API_KEY,
});
