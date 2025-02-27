import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma/client";

const DB = new SQLDatabase("users", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DB.connectionString,
    },
  },
});

export { prisma };
