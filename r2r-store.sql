-- MySQL dump 10.13  Distrib 5.7.21, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: r2r_store
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `picurl` varchar(200) NOT NULL,
  `active_status` int(11) NOT NULL,
  `trending_status` int(11) DEFAULT '0',
  `details` varchar(1200) NOT NULL,
  `category` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Harry Potter','Rowling','https://images-na.ssl-images-amazon.com/images/I/71m3HEJJl5L.jpg',1,1,'dfhljskfh','Fantasy',2000),(2,'Shoe Dog','Phil Knight','https://images-na.ssl-images-amazon.com/images/I/71m3HEJJl5L.jpg',1,1,'In this candid and riveting memoir, for the first time ever, Nike founder and CEO Phil Knight shares the inside story of the company’s early days as an intrepid start-up and its evolution into one of the world’s most iconic, game-changing, and profitable brands.\n\nIn 1962, fresh out of business school, Phil Knight borrowed $50 from his father and created a company with a simple mission: import high-quality, low-cost athletic shoes from Japan. Selling the shoes from the trunk of his lime green Plymouth Valiant, Knight grossed $8,000 his first year. Today, Nike’s annual sales top $30 billion. In an age of startups, Nike is the ne plus ultra of all startups, and the swoosh has become a revolutionary, globe-spanning icon, one of the most ubiquitous and recognizable symbols in the world today.\n\nBut Knight, the man behind the swoosh, has always remained a mystery. Now, for the first time, in a memoir that is candid, humble, gutsy, and wry, he tells his story, beginning with his crossroads moment. At twenty-four, after backpacking around the world, he decided to take the unconventional path, to start his own business—a business that would be dynamic, different.','Non-Fiction',1000),(3,'Sherlock Holmes','Doyle','https://images-na.ssl-images-amazon.com/images/I/71m3HEJJl5L.jpg',2,1,'fhdjgklshfg','Mystery',800),(4,'Romeo and Juliet','Shakespeare','https://images-na.ssl-images-amazon.com/images/I/71m3HEJJl5L.jpg',1,1,'hjlkfsdhf','Romance',3000),(5,'Factfulness','Hans','https://images-na.ssl-images-amazon.com/images/I/51tvugRSHKL._SX322_BO1,204,203,200_.jpg',1,1,'fdhskljfh','Non-Fiction',5000),(6,'Sherlock Holmes 2','Doyle','https://images-na.ssl-images-amazon.com/images/I/71m3HEJJl5L.jpg',1,0,'In this candid and riveting memoir, for the first time ever, Nike founder and CEO Phil Knight shares the inside story of the company’s early days as an intrepid start-up and its evolution into one of the world’s most iconic, game-changing, and profitable brands.  In 1962, fresh out of business school, Phil Knight borrowed $50 from his father and created a company with a simple mission: import high-quality, low-cost athletic shoes from Japan. Selling the shoes from the trunk of his lime green Plymouth Valiant, Knight grossed $8,000 his first year. Today, Nike’s annual sales top $30 billion. In an age of startups, Nike is the ne plus ultra of all startups, and the swoosh has become a revolutionary, globe-spanning icon, one of the most ubiquitous and recognizable symbols in the world today.  But Knight, the man behind the swoosh, has always remained a mystery. Now, for the first time, in a memoir that is candid, humble, gutsy, and wry, he tells his story, beginning with his crossroads moment. At twenty-four, after backpacking around the world, he decided to take the unconventional path, to start his own business—a business that would be dynamic, different.','Mystery',2000),(7,'Steve Jobs','Walter Isaacson','https://images-na.ssl-images-amazon.com/images/I/81VStYnDGrL.jpg',2,1,'Steve Jobs is the authorized self-titled biography book of Steve Jobs. The book was written at the request of Jobs by Walter Isaacson, a former executive at CNN and TIME who has written best-selling biographies of Benjamin Franklin and Albert Einstein.[1][2]  Based on more than forty interviews with Jobs conducted over two years—in addition to interviews with more than one hundred family members, friends, adversaries, competitors, and colleagues—Isaacson was given \"unprecedented\" access to Jobs\'s life.[3] Jobs is said to have encouraged the people interviewed to speak honestly. Although Jobs cooperated with the book, he asked for no control over its content other than the book\'s cover, and waived the right to read it before it was published.[4]  The book was released on October 24, 2011, by Simon & Schuster in the United States, 19 days after Jobs\' death.[5]  A film adaptation written by Aaron Sorkin and directed by Danny Boyle, with Michael Fassbender starring in the title role, was released on October 9, 2015.','Non-Fiction',5000);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `order_status` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'Vinuda Weerasinghe','vinudaweerasinghe@gmail.com','0772807788',0,'2019-01-06 08:35:39',2000),(2,3,'Anud','ahdjskhd','hdjkshf',2,'2019-01-13 07:33:08',800),(3,7,'ghijgj','ghjkgk','777123456',1,'2019-01-13 14:05:43',5000);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'anuda','anuda');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-13 19:40:06
