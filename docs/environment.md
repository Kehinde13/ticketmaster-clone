# Environment configuration

Next.js loads `.env*` files from the project root into `process.env`; files inside `src` are not loaded. The application runtime relies on that framework behavior. The standalone Prisma CLI configuration imports `dotenv/config` because it runs outside the Next.js runtime.

## Conventions

- Variables without `NEXT_PUBLIC_` are server-only. Database URLs, API secrets, authentication secrets, and privileged credentials must use this form and must not be imported into client code.
- `NEXT_PUBLIC_*` is reserved for values intentionally exposed to browsers. Next.js inlines these values into client JavaScript during the build, so they are public and fixed for that build—not mutable runtime secrets.
- `.env.example` documents supported names using empty, safe placeholders. It never contains real values.
- Developers put real local values in ignored root files such as `.env.local`. Deployment platforms provide production values through their environment configuration.
- `src/lib/env/server.ts` validates selected server values with Zod and reports invalid variable names without including their values. Its schema grows only when an integration genuinely requires another variable.
- `DATABASE_URL` is validated only when the server-only database entry point is imported, so routes that do not use the database remain independent of PostgreSQL.

## Adding a variable

1. Decide whether it is server-only or intentionally public.
2. Add it to the appropriate Zod schema.
3. Add a safe placeholder to `.env.example`.
4. Add the real value only to the developer or deployment environment.
5. Never commit the real secret.
6. Verify startup and build behavior as appropriate.
