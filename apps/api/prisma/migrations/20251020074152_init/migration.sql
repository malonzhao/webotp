-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "refreshToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "platforms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "user_platforms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "encryptedSecret" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "user_platforms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_platforms_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_name_key" ON "platforms"("name");

-- CreateIndex
CREATE INDEX "user_platforms_userId_createdAt_idx" ON "user_platforms"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "user_platforms_userId_platformId_idx" ON "user_platforms"("userId", "platformId");

-- CreateIndex
CREATE INDEX "user_platforms_userId_platformId_accountName_idx" ON "user_platforms"("userId", "platformId", "accountName");

-- CreateIndex
CREATE UNIQUE INDEX "user_platforms_userId_platformId_accountName_key" ON "user_platforms"("userId", "platformId", "accountName");
