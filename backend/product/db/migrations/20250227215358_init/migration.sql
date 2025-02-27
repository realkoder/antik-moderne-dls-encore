-- CreateEnum
CREATE TYPE "Format" AS ENUM ('A4', 'Size_30X30_cm', 'Size_30X40_cm', 'Size_50x50', 'Size_50x70_cm', 'Size_70x70_cm', 'Size_70x100_cm', 'Size_100x100_cm', 'Size_100x140_cm');

-- CreateTable
CREATE TABLE "posters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artistFullName" TEXT NOT NULL,
    "posterImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "format_prices" (
    "id" SERIAL NOT NULL,
    "format" "Format" NOT NULL,
    "price" INTEGER NOT NULL,
    "posterId" INTEGER NOT NULL,

    CONSTRAINT "format_prices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "format_prices" ADD CONSTRAINT "format_prices_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "posters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
