-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: usuarios.cyp9gempti4l.us-east-1.rds.amazonaws.com    Database: users
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `type_user` varchar(50) NOT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2f970dbe-bd3b-424a-99a4-f7ada4a60eb5','Mariano 02','PERSONA2@gmail.com','2918712240','$2b$10$Zh1Zt0AwuKQyhuq9X8Xwse4r5.igj8c82jO096pF9nQMkAExAwMZy','https://firebasestorage.googleapis.com/v0/b/integrador-ff8cd.appspot.com/o/1701901110263-evenmap-home-create%20activity.png?alt=media','user'),('66e57614-9e9b-47bc-a810-9e20212a519d','Marianito del Campo actualizado','maria@gmail.com','1234567890','$2b$10$TpRdDpnT0Lu75zeKP4bA/eGuIvbSwZKvr4b8.E0pr3.j4/Guz7.Ue','https://firebasestorage.googleapis.com/v0/b/integrador-ff8cd.appspot.com/o/1701901123412-Anotaci%C3%83%C2%B3n%202023-03-17%20013536.jpg?alt=media','user'),('7bd19283-565a-4507-b378-33897f0958ac','Mariano 01','PERSONA1@gmail.com','1234567890','$2b$10$iuHNL4Iu5PBNNyFBVKxJwu8f/wxu35b6RPqz7ug5h3rw6FTsSgbDC','https://firebasestorage.googleapis.com/v0/b/integrador-ff8cd.appspot.com/o/1701901085430-evenmap-home-create%20activity.png?alt=media','user'),('d9081998-e53d-4f47-892a-b289a680f2d5','Mariano 03','PERSONA3@gmail.com','2918712331','$2b$10$r9P9HP5pmexaOyN44PBJ/OQgiZqNYmFn9tYzF0TOdD1dOst2HiT3m','https://firebasestorage.googleapis.com/v0/b/integrador-ff8cd.appspot.com/o/1701901137713-evenmap-home-create%20activity.png?alt=media','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

-- Dump completed on 2023-12-06 18:51:48
