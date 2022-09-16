-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceUserId" TEXT NOT NULL,
    "endsOn" INTEGER NOT NULL DEFAULT 0,
    "sourceUserJoined" BOOLEAN NOT NULL DEFAULT false,
    "sinkUserId" TEXT NOT NULL,
    "sinkUserJoined" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "sourceUserFeedback" TEXT,
    "sinkUserFeedback" TEXT,
    CONSTRAINT "Match_sourceUserId_fkey" FOREIGN KEY ("sourceUserId") REFERENCES "SpeedDateUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Match_sinkUserId_fkey" FOREIGN KEY ("sinkUserId") REFERENCES "SpeedDateUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("id", "sinkUserFeedback", "sinkUserId", "sinkUserJoined", "sourceUserFeedback", "sourceUserId", "sourceUserJoined", "status") SELECT "id", "sinkUserFeedback", "sinkUserId", "sinkUserJoined", "sourceUserFeedback", "sourceUserId", "sourceUserJoined", "status" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
