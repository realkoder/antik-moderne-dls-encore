import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma-db-products/client";

const DB = new SQLDatabase("products", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prismaProducts = new PrismaClient({
  datasources: {
    db: {
      // url: DB.connectionString,
      url: "postgresql://postgres:admin@postgres:5432/products",
    },
  },
});

export { prismaProducts };
