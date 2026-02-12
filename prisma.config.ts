import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv();

const databaseUrl =
  process.env["DATABASE_URL"] ??
  process.env["POSTGRES_PRISMA_URL"] ??
  process.env["POSTGRES_URL"] ??
  "postgres://harcamayonetimi:harcamayonetimi123.@45.158.14.222:54399/harcamayonetimi";

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
