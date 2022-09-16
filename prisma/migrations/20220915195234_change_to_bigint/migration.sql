/*
  Warnings:

  - You are about to alter the column `endsOn` on the `Match` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceUserId" TEXT NOT NULL,
    "endsOn" BIGINT NOT NULL DEFAULT 0,
    "sourceUserJoined" BOOLEAN NOT NULL DEFAULT false,
    "sinkUserId" TEXT NOT NULL,
    "sinkUserJoined" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "sourceUserFeedback" TEXT,
    "sinkUserFeedback" TEXT,
    CONSTRAINT "Match_sourceUserId_fkey" FOREIGN KEY ("sourceUserId") REFERENCES "SpeedDateUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Match_sinkUserId_fkey" FOREIGN KEY ("sinkUserId") REFERENCES "SpeedDateUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("endsOn", "id", "sinkUserFeedback", "sinkUserId", "sinkUserJoined", "sourceUserFeedback", "sourceUserId", "sourceUserJoined", "status") SELECT "endsOn", "id", "sinkUserFeedback", "sinkUserId", "sinkUserJoined", "sourceUserFeedback", "sourceUserId", "sourceUserJoined", "status" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
