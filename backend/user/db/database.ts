import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma-db-users/client";

const DB = new SQLDatabase("users", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prismaUsers = new PrismaClient({
  datasources: {
    db: {
      url: DB.connectionString,
    },
  },
});

export { prismaUsers };
