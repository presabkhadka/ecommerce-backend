/*
  Warnings:

  - Added the required column `order_status` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('ON_THE_WAY', 'DELIVERED', 'CANCELED');

-- AlterTable
ALTER TABLE "public"."Orders" ADD COLUMN     "order_status" "public"."OrderStatus" NOT NULL;
