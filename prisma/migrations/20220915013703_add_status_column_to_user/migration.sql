-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SpeedDateUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting'
);
INSERT INTO "new_SpeedDateUser" ("contactInfo", "id", "name") SELECT "contactInfo", "id", "name" FROM "SpeedDateUser";
DROP TABLE "SpeedDateUser";
ALTER TABLE "new_SpeedDateUser" RENAME TO "SpeedDateUser";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
