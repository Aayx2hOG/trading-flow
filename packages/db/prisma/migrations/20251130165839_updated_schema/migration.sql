/*
  Warnings:

  - The values [PENDING] on the enum `ExecutionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `credentials` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `dataKind` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `metaData` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `positionX` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `positionY` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the `CredentialsType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NodeType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExecutionStatus_new" AS ENUM ('SUCCESS', 'FAILURE');
ALTER TABLE "public"."Execution" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Execution" ALTER COLUMN "status" TYPE "ExecutionStatus_new" USING ("status"::text::"ExecutionStatus_new");
ALTER TYPE "ExecutionStatus" RENAME TO "ExecutionStatus_old";
ALTER TYPE "ExecutionStatus_new" RENAME TO "ExecutionStatus";
DROP TYPE "public"."ExecutionStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "CredentialsType" DROP CONSTRAINT "CredentialsType_nodeId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_typeId_fkey";

-- AlterTable
ALTER TABLE "Execution" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "credentials",
DROP COLUMN "dataKind",
DROP COLUMN "metaData",
DROP COLUMN "positionX",
DROP COLUMN "positionY",
DROP COLUMN "typeId",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "position" JSONB NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "CredentialsType";

-- DropTable
DROP TABLE "NodeType";

-- DropEnum
DROP TYPE "DataKind";
