-- AlterEnum
ALTER TYPE "public"."OrderStatus" ADD VALUE 'PROCESSING';

-- AlterTable
ALTER TABLE "public"."Orders" ALTER COLUMN "order_status" DROP NOT NULL;
