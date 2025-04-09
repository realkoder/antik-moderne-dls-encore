import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma-db-baskets/client";

const DB = new SQLDatabase("baskets", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prismaBaskets = new PrismaClient({
  datasources: {
    db: {
      // url: DB.connectionString,
      url: "postgresql://postgres:admin@postgres:5432/baskets",
    },
  },
});

export { prismaBaskets };
