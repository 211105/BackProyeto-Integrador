-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: marcadores-mario.cnihecgfgkcq.us-east-1.rds.amazonaws.com    Database: marcadores
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `pines`
--

DROP TABLE IF EXISTS `pines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pines` (
  `uuid` char(36) NOT NULL,
  `location` point NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `url_image` varchar(255) DEFAULT NULL,
  `user_uuid` varchar(36) DEFAULT NULL,
  `activity_uuid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  SPATIAL KEY `location` (`location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pines`
--

LOCK TABLES `pines` WRITE;
/*!40000 ALTER TABLE `pines` DISABLE KEYS */;
INSERT INTO `pines` VALUES ('a5d2fbf4-fd85-4c5a-b378-8a649c9d3b32',_binary '\0\0\0\0\0\0\0uu\Çb› 0@/O\çŠRFWÀ','prueba desde produccion 01','2023-12-06 22:38:22','2023-12-07 02:38:22','https://firebasestorage.googleapis.com/v0/b/integrador-ff8cd.appspot.com/o/1701902301940-evenmap-select-point.png?alt=media','d9081998-e53d-4f47-892a-b289a680f2d5','36027f04-9fc6-4b66-b326-639268e9ebb4');
/*!40000 ALTER TABLE `pines` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-06 18:50:27
