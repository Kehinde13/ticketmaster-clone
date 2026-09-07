import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  TICKETMASTER_API_KEY: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().trim().min(1).optional(),
  ),
});

const databaseEnvSchema = z.object({
  DATABASE_URL: z.url().refine(
    (value) => {
      if (!URL.canParse(value)) {
        return false;
      }

      const protocol = new URL(value).protocol;

      return protocol === "postgres:" || protocol === "postgresql:";
    },
    { message: "Must be a PostgreSQL connection URL." },
  ),
});

function invalidVariableNames(error: z.ZodError) {
  return [
    ...new Set(
      error.issues.map((issue) => String(issue.path[0] ?? "environment")),
    ),
  ];
}

export function parseServerEnv(input: {
  NODE_ENV?: string;
  TICKETMASTER_API_KEY?: string;
}) {
  const result = serverEnvSchema.safeParse(input);

  if (!result.success) {
    const invalidVariables = invalidVariableNames(result.error);

    throw new Error(
      `Invalid server environment configuration: ${invalidVariables.join(", ")}.`,
    );
  }

  return Object.freeze(result.data);
}

export function parseDatabaseEnv(input: { DATABASE_URL?: string }) {
  const result = databaseEnvSchema.safeParse(input);

  if (!result.success) {
    const invalidVariables = invalidVariableNames(result.error);

    throw new Error(
      `Invalid database environment configuration: ${invalidVariables.join(", ")}.`,
    );
  }

  return Object.freeze(result.data);
}
