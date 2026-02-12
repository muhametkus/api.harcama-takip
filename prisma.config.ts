import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv();

const databaseUrl =
  process.env["DATABASE_URL"] ??
  process.env["POSTGRES_PRISMA_URL"] ??
  process.env["POSTGRES_URL"] ??
  "postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=public";

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
