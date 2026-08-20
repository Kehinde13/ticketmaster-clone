# Database foundation

PostgreSQL is the application database engine, with Prisma ORM 7 as the server-side data-access layer.

- Prisma schema: `prisma/schema.prisma`
- Prisma CLI configuration: `prisma.config.ts`
- Generated client: `src/generated/prisma`
- Application client entry point: `src/lib/db/prisma.ts`
- Connection variable: `DATABASE_URL`, using a standard PostgreSQL connection URL

The Prisma 7 `prisma-client` generator writes ESM TypeScript into the project-local generated directory. Generated code is ignored by Git, contains no application logic, and is recreated by `postinstall` or `npm run db:generate`.

The database entry point is protected as server-only, uses the PostgreSQL driver adapter, validates its connection URL when imported, and reuses a `globalThis` client during development hot reload. It must not be imported into Client Components.

Migrations will be small, reviewed, and tied to deliberate domain changes. Production deployments will apply committed migrations with `npm run db:deploy`; development creates migrations with `npm run db:migrate`.

No application domain models have been defined yet. No migrations or seed data exist.
