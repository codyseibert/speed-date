-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceUserId" TEXT NOT NULL,
    "sinkUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'running',
    CONSTRAINT "Match_sourceUserId_fkey" FOREIGN KEY ("sourceUserId") REFERENCES "SpeedDateUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Match_sinkUserId_fkey" FOREIGN KEY ("sinkUserId") REFERENCES "SpeedDateUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
