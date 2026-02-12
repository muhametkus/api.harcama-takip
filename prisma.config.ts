import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv();

const databaseUrl =
  process.env["DATABASE_URL"] ??
  process.env["POSTGRES_PRISMA_URL"] ??
  process.env["POSTGRES_URL"];

if (!databaseUrl) {
  throw new Error(
    "Missing database URL. Set DATABASE_URL (preferred) or POSTGRES_PRISMA_URL/POSTGRES_URL in the runtime environment.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
