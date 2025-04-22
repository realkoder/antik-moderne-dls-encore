import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "@prisma-db-baskets/client";

const isSelfHost = process.env.ENCORE_SELF_HOST === 'true';

const DB = new SQLDatabase("baskets", {
  migrations: {
    path: "migrations",
    source: "prisma",
  },
});

const prismaBaskets = new PrismaClient({
  datasources: {
    db: {
      url: isSelfHost ? "postgresql://postgres:admin@postgres-service.antik-moderne:5432/baskets" : DB.connectionString ,
    },
  },
});

export { prismaBaskets };
