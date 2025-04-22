import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma-db-users/client";

const isSelfHost = process.env.ENCORE_SELF_HOST === 'true';

const DB = new SQLDatabase("users", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prismaUsers = new PrismaClient({
  datasources: {
    db: {
      url: isSelfHost ? "postgresql://postgres:admin@antik-moderne:5432/users" : DB.connectionString,
    },
  },
});

export { prismaUsers };
