-- CreateTable
CREATE TABLE `Usuarios` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `resetPasswordToken` VARCHAR(191) NULL,
    `resetPasswordTokenExpiry` DATETIME(3) NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `emailVerificationToken` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    UNIQUE INDEX `Usuarios_username_key`(`username`),
    UNIQUE INDEX `Usuarios_resetPasswordToken_key`(`resetPasswordToken`),
    UNIQUE INDEX `Usuarios_emailVerificationToken_key`(`emailVerificationToken`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusAuditoriaLogin` (
    `IdStatusAuditoriaLogin` INTEGER NOT NULL AUTO_INCREMENT,
    `Status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IdStatusAuditoriaLogin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditoriaLogin` (
    `IdAuditoriaLogin` INTEGER NOT NULL AUTO_INCREMENT,
    `FechaLogin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Usuario` VARCHAR(191) NOT NULL,
    `Clave` VARCHAR(191) NULL,
    `IdStatusAuditoriaLogin` INTEGER NOT NULL,
    `FechaEstadoActualizado` DATETIME(3) NULL,
    `Mensaje` VARCHAR(191) NULL,

    PRIMARY KEY (`IdAuditoriaLogin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Role_roleName_key`(`roleName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permiso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permissionName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Permiso_permissionName_key`(`permissionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioRole` (
    `usuarioId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`usuarioId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolPermiso` (
    `roleId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuditoriaLogin` ADD CONSTRAINT `AuditoriaLogin_IdStatusAuditoriaLogin_fkey` FOREIGN KEY (`IdStatusAuditoriaLogin`) REFERENCES `StatusAuditoriaLogin`(`IdStatusAuditoriaLogin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioRole` ADD CONSTRAINT `UsuarioRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioRole` ADD CONSTRAINT `UsuarioRole_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permiso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
