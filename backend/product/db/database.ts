import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma-db-products/client";

const isSelfHost = process.env.ENCORE_SELF_HOST === 'true';

const DB = new SQLDatabase("products", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prismaProducts = new PrismaClient({
  datasources: {
    db: {
      url: isSelfHost ? "postgresql://postgres:admin@postgres:5432/products" : DB.connectionString,
    },
  },
});

export { prismaProducts };
