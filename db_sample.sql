-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               PostgreSQL 9.4.25, compiled by Visual C++ build 1800, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table public.Employees
CREATE TABLE IF NOT EXISTS "Employees" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''"Employees_id_seq"''::regclass)',
	"firstName" VARCHAR(255) NULL DEFAULT NULL,
	"lastName" VARCHAR(255) NULL DEFAULT NULL,
	"age" INTEGER NULL DEFAULT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL,
	"updatedAt" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY ("id")
);

-- Dumping data for table public.Employees: 0 rows
DELETE FROM "Employees";
/*!40000 ALTER TABLE "Employees" DISABLE KEYS */;
INSERT INTO "Employees" ("id", "firstName", "lastName", "age", "createdAt", "updatedAt") VALUES
	(3, 'Harby', 'Anwardi', 26, '2023-02-24 15:34:01+07', '2023-02-24 15:34:03+07'),
	(5, '77ee8c21', '77ee8e21', 25, '2023-02-24 15:49:41.472+07', '2023-02-24 15:49:41.472+07'),
	(6, '7cff89', '75fe9225e8b6', 25, '2023-02-24 15:50:17.47+07', '2023-02-24 15:50:17.47+07'),
	(7, 'Uda', 'Kandung', 25, '2023-02-24 15:54:35.422+07', '2023-02-24 15:54:35.422+07'),
	(8, 'Jamal', 'Kandung', 25, '2023-03-21 21:22:23.297+07', '2023-03-21 21:22:23.297+07');
/*!40000 ALTER TABLE "Employees" ENABLE KEYS */;

-- Dumping structure for table public.refresh_tokens
CREATE TABLE IF NOT EXISTS "refresh_tokens" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''refresh_tokens_id_seq''::regclass)',
	"token" TEXT NULL DEFAULT NULL,
	"user_id" INTEGER NULL DEFAULT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL,
	"updatedAt" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY ("id")
);

-- Dumping data for table public.refresh_tokens: 0 rows
DELETE FROM "refresh_tokens";
/*!40000 ALTER TABLE "refresh_tokens" DISABLE KEYS */;
INSERT INTO "refresh_tokens" ("id", "token", "user_id", "createdAt", "updatedAt") VALUES
	(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6ImhhcmJ5IiwiZnVsbG5hbWUiOiJhbndhcmRpICIsImVtYWlsIjoiaGFyYnlAbWFpbC5jb20ifSwiaWF0IjoxNjc5NTU0MDQ0LCJleHAiOjE2Nzk2NDA0NDR9.C8_alf4VfibBifCZlzY0-OTLKv8HxTH4hTeuSN9ECwk', NULL, '2023-03-23 13:47:24.675+07', '2023-03-23 13:47:24.675+07');
/*!40000 ALTER TABLE "refresh_tokens" ENABLE KEYS */;

-- Dumping structure for table public.SequelizeMeta
CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
	"name" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("name")
);

-- Dumping data for table public.SequelizeMeta: 0 rows
DELETE FROM "SequelizeMeta";
/*!40000 ALTER TABLE "SequelizeMeta" DISABLE KEYS */;
INSERT INTO "SequelizeMeta" ("name") VALUES
	('20230203100003-create-employees.js'),
	('20230323025103-create-users.js'),
	('20230323055821-create-refresh-tokens.js'),
	('20230323061157-create-refresh-tokens.js'),
	('20230323062521-create-refresh-tokens.js'),
	('20230323063545-create-refresh-tokens.js'),
	('20230323064150-create-refresh-tokens.js');
/*!40000 ALTER TABLE "SequelizeMeta" ENABLE KEYS */;

-- Dumping structure for table public.Users
CREATE TABLE IF NOT EXISTS "Users" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''"Users_id_seq"''::regclass)',
	"username" VARCHAR(255) NULL DEFAULT NULL,
	"fullname" VARCHAR(255) NULL DEFAULT NULL,
	"email" VARCHAR(255) NULL DEFAULT NULL,
	"password" TEXT NULL DEFAULT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL,
	"updatedAt" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY ("id")
);

-- Dumping data for table public.Users: 0 rows
DELETE FROM "Users";
/*!40000 ALTER TABLE "Users" DISABLE KEYS */;
INSERT INTO "Users" ("id", "username", "fullname", "email", "password", "createdAt", "updatedAt") VALUES
	(1, 'Azam', 'Dwi ', 'azam@mail.com', 'password', '2023-03-23 11:27:57.935+07', '2023-03-23 11:27:57.935+07'),
	(2, 'harby', 'anwardi ', 'harby@mail.com', '$2b$10$EMCyOzSEVk8gTLVg.opsi.ze09Vy8cR6DA8L2SQ9vf00zbhGKkvPe', '2023-03-23 11:32:20.458+07', '2023-03-23 11:32:20.458+07');
/*!40000 ALTER TABLE "Users" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
