-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "createdBy" VARCHAR(200) NOT NULL,
    "slug" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_domains" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "enrollment_mode" TEXT NOT NULL,
    "affiliation_email_address" TEXT NOT NULL,
    "total_pending_invitations" INTEGER NOT NULL,
    "total_pending_suggestions" INTEGER NOT NULL,
    "primary_email_address_id" VARCHAR(200),
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "organization_domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verifications" (
    "organization_domain_id" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    "status" VARCHAR(200) NOT NULL,
    "strategy" VARCHAR(200) NOT NULL,
    "expire_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("organization_domain_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations"("slug");

-- AddForeignKey
ALTER TABLE "organization_domains" ADD CONSTRAINT "organization_domains_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_organization_domain_id_fkey" FOREIGN KEY ("organization_domain_id") REFERENCES "organization_domains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
