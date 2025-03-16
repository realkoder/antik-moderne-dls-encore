import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma-db-organizations/client";

const DB = new SQLDatabase("organizations", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prismaOrganizations = new PrismaClient({
  datasources: {
    db: {
      url: DB.connectionString,
    },
  },
});

export { prismaOrganizations };
