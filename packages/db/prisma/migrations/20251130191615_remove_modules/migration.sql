/*
  Warnings:

  - You are about to drop the `Edge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Node` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_workflowId_fkey";

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "edges" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "nodes" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "Edge";

-- DropTable
DROP TABLE "Node";
