/*
  Warnings:

  - You are about to drop the column `numSeatsLeft` on the `Events` table. All the data in the column will be lost.
  - Added the required column `seatsLeft` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSeats` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "numSeatsLeft",
ADD COLUMN     "seatsLeft" INTEGER NOT NULL,
ADD COLUMN     "totalSeats" INTEGER NOT NULL;
