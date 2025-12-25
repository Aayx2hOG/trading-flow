/*
  Warnings:

  - A unique constraint covering the columns `[webhookUrl]` on the table `Workflow` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "webhookUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_webhookUrl_key" ON "Workflow"("webhookUrl");
