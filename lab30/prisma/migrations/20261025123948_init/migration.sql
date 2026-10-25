-- CreateTable
CREATE TABLE `User` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserName` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(150) NOT NULL,
    `PasswordHash` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_UserName_key`(`UserName`),
    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `TaskID` INTEGER NOT NULL AUTO_INCREMENT,
    `TaskTitle` VARCHAR(150) NOT NULL,
    `TaskDescription` TEXT NOT NULL,
    `IsCompleted` BOOLEAN NOT NULL DEFAULT false,
    `UserID` INTEGER NOT NULL,

    PRIMARY KEY (`TaskID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
