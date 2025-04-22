import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma-db-organizations/client";

const isSelfHost = process.env.ENCORE_SELF_HOST === 'true';

const DB = new SQLDatabase("organizations", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prismaOrganizations = new PrismaClient({
  datasources: {
    db: {
      url: isSelfHost ? "postgresql://postgres:admin@antik-moderne:5432/organizations" : DB.connectionString,
    },
  },
});

export { prismaOrganizations };
