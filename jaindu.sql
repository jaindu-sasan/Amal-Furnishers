-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: amalfurnishers_admin
-- ------------------------------------------------------
-- Server version	8.0.37

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

--
-- Table structure for table `adminuser`
--

DROP TABLE IF EXISTS `adminuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminuser` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdminUser_email_key` (`email`),
  KEY `AdminUser_isActive_idx` (`isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminuser`
--

LOCK TABLES `adminuser` WRITE;
/*!40000 ALTER TABLE `adminuser` DISABLE KEYS */;
INSERT INTO `adminuser` VALUES ('cmmgfvtif0000z2wgp6yhju9a','admin@amalfurnishers.com','$2b$12$8p5Tn4smnOENjmb/ORWR3urHgUJlca6kHyeetx8019YJiE0pEFPq6','Admin User',1,'2026-03-07 14:49:19.142','2026-03-07 14:49:19.142');
/*!40000 ALTER TABLE `adminuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_slug_key` (`slug`),
  KEY `Category_status_idx` (`status`),
  KEY `Category_name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('cmmgfvtjd0001z2wgpx29pdm9','Seating','seating','ACTIVE','2026-03-07 14:49:19.177','2026-03-07 15:08:06.642'),('cmmgfvtjo0002z2wg7y7bfc9l','Dining','dining','ACTIVE','2026-03-07 14:49:19.189','2026-03-07 14:49:19.189'),('cmmgfvtk20003z2wgcriobp6p','Office Furniture','office-furniture','ACTIVE','2026-03-07 14:49:19.202','2026-03-07 14:49:19.202'),('cmmgfvtkc0004z2wgte0qwpg5','Outdoor Furniture','outdoor-furniture','INACTIVE','2026-03-07 14:49:19.213','2026-03-07 14:49:19.213'),('cmmggjzj10001z28olzraog01','Sleeping & Resting','sleeping','ACTIVE','2026-03-07 15:08:06.685','2026-03-07 15:08:06.685'),('cmmggjzjw0002z28ozo5ljq41','Storage & Organization','storage','ACTIVE','2026-03-07 15:08:06.717','2026-03-07 15:08:06.717'),('cmmggjzkc0003z28oryqzr1p3','Tables & Surfaces','tables','ACTIVE','2026-03-07 15:08:06.732','2026-03-07 15:08:06.732'),('cmmggjzku0004z28o8aqm7gh8','Office Furniture','office','ACTIVE','2026-03-07 15:08:06.751','2026-03-07 15:08:06.751'),('cmmggjzlb0005z28oyzbqryji','Outdoor Furniture','outdoor','ACTIVE','2026-03-07 15:08:06.767','2026-03-07 15:08:06.767'),('cmmggjzlt0006z28ouwepma0s','Accent Furniture','accent','ACTIVE','2026-03-07 15:08:06.786','2026-03-07 15:08:06.786'),('cmmggjzm60007z28o39yjgw6m','Entertainment Furniture123','entertainment','ACTIVE','2026-03-07 15:08:06.799','2026-03-08 09:55:08.198');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('READ','UNREAD') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'UNREAD',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_status_createdAt_idx` (`status`,`createdAt`),
  KEY `Message_productId_idx` (`productId`),
  KEY `Message_email_idx` (`email`),
  CONSTRAINT `Message_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES ('cmmgfvtmp000az2wg0lh5naec','John Smith','+1 555-0123','john@example.com','Please share a quotation for this sofa with custom finish options.','cmmgfvtl30006z2wg2x7waz04','READ','2026-03-07 14:49:19.298','2026-03-07 17:44:28.605'),('cmmhkgs4m0001z2mwl7kr93xt','arosh','0725684625','arosh@gmail.com','Quotation Inquiry\nProduct: Velvet Media Console\nProduct Code: VLT-MED-010\nQuantity: 1\nPreferred Wood Type: teaka\nPreferred Size: large\nDelivery Address: svefgeagt\nAdditional Notes: eagrthgryhryhryharyhrh','cmmggjzsq000rz28ojbdx1mlt','READ','2026-03-08 09:45:21.758','2026-03-08 09:57:33.427');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stockStatus` enum('IN_STOCK','OUT_OF_STOCK','MADE_TO_ORDER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDescription` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_productCode_key` (`productCode`),
  KEY `Product_categoryId_idx` (`categoryId`),
  KEY `Product_name_idx` (`name`),
  KEY `Product_stockStatus_idx` (`stockStatus`),
  CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('cmmgfvtl30006z2wg2x7waz04','Premium Teak Sofa','cmmgfvtjd0001z2wgpx29pdm9','SOFA-001',45000.00,'IN_STOCK','Luxurious 3-seater teak sofa with deep cushioning.','Crafted from premium teak wood, this sofa combines elegance with comfort and durability.','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500','2026-03-07 14:49:19.223','2026-03-07 14:49:19.223'),('cmmgfvtmc0008z2wgaw01lheh','Sheesham Dining Table','cmmgfvtjo0002z2wg7y7bfc9l','DINING-001',28000.00,'MADE_TO_ORDER','6-seater dining table with natural wood grain finish.','Beautiful sheesham wood dining table designed for modern and traditional homes.','https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500','2026-03-07 14:49:19.284','2026-03-07 14:49:19.284'),('cmmggjzo50009z28ojbcjnqop','Milano Sectional Sofa','cmmgfvtjd0001z2wgpx29pdm9','MLN-SEC-001',4500.00,'IN_STOCK','Handcrafted grey fabric sectional with deep cushioning and oak frame.','Experience unparalleled comfort with our handcrafted Milano Sectional Sofa. Upholstered in premium grey fabric with deep cushioning, this modular piece adapts to your living space with effortless elegance. Solid oak frame ensures lasting durability.','/images/product-1.jpg','2026-03-07 15:08:06.863','2026-03-07 15:08:06.863'),('cmmggjzoo000bz28or5iwa7ky','Windsor Leather Armchair','cmmgfvtjd0001z2wgpx29pdm9','WND-ARM-002',2800.00,'IN_STOCK','Tufted cognac leather armchair with walnut frame and brass accents.','The Windsor Armchair embodies timeless British craftsmanship. Deep-tufted cognac leather upholstery over a solid walnut frame creates an heirloom-quality piece that only improves with age. Brass-capped legs add a distinguished finishing touch.','/images/product-2.jpg','2026-03-07 15:08:06.888','2026-03-07 15:08:06.888'),('cmmggjzp0000dz28oe6xq1l98','Artisan Dining Table','cmmggjzkc0003z28oryqzr1p3','ART-DIN-003',3800.00,'IN_STOCK','Solid walnut slab dining table seating six, mid-century design.','Our signature Artisan Dining Table is crafted from a single slab of solid walnut, hand-selected for its natural grain pattern. Seats six comfortably with a clean mid-century silhouette that anchors any dining room.','/images/product-3.jpg','2026-03-07 15:08:06.900','2026-03-07 15:08:06.900'),('cmmggjzpf000fz28omymeiasw','Serenity King Bed','cmmggjzj10001z28olzraog01','SRN-BED-004',3200.00,'IN_STOCK','Upholstered king bed in blue fabric with solid hardwood platform frame.','Drift into luxury with the Serenity King Bed. A plush upholstered headboard in serene blue fabric crowns a solid hardwood platform frame. Thoughtful details like hidden storage and cable management make this bed as practical as it is beautiful.','/images/product-4.jpg','2026-03-07 15:08:06.916','2026-03-07 15:08:06.916'),('cmmggjzpw000hz28okehd5ghb','Nordic Bookcase','cmmggjzjw0002z28ozo5ljq41','NRD-BKC-005',1600.00,'IN_STOCK','Five-shelf oak bookcase with Scandinavian-inspired clean lines.','Scandinavian simplicity meets artisan craftsmanship. Five open shelves provide generous display and storage space, while the warm oak finish adds natural beauty to any room. Adjustable shelves accommodate books, art, and collectibles.','/images/product-5.jpg','2026-03-07 15:08:06.933','2026-03-07 15:08:06.933'),('cmmggjzqc000jz28o0jgen6bi','Carrara Coffee Table','cmmggjzkc0003z28oryqzr1p3','CRR-COF-006',2200.00,'IN_STOCK','Carrara marble top coffee table with black iron minimalist base.','Italian-inspired elegance for your living space. A genuine Carrara marble top rests on a minimalist black iron base, creating a striking focal point. Each table features unique natural veining, making every piece one of a kind.','/images/product-6.jpg','2026-03-07 15:08:06.948','2026-03-07 15:08:06.948'),('cmmggjzqt000lz28os3trxiwk','ErgoMax Office Chair','cmmggjzku0004z28o8aqm7gh8','ERG-CHR-007',950.00,'IN_STOCK','Ergonomic mesh office chair with adjustable lumbar and chrome base.','Engineered for all-day comfort, the ErgoMax features a breathable mesh back, adjustable lumbar support, and a synchronized tilt mechanism. Chrome accents and clean lines make it as stylish as it is functional.','/images/product-7.jpg','2026-03-07 15:08:06.965','2026-03-07 15:08:06.965'),('cmmggjzr5000nz28oc0p5mff7','Heritage Nightstand','cmmggjzkc0003z28oryqzr1p3','HRT-NGT-008',680.00,'IN_STOCK','Two-drawer oak nightstand with solid brass handles.','The Heritage Nightstand brings warmth and functionality to your bedside. Two spacious drawers with solid brass handles offer elegant storage, while the warm oak finish complements any bedroom decor.','/images/product-8.jpg','2026-03-07 15:08:06.978','2026-03-07 15:08:06.978'),('cmmggjzse000pz28ouq6gy13r','Riviera Patio Set','cmmggjzlb0005z28oyzbqryji','RVR-PAT-009',3600.00,'IN_STOCK','Premium wicker patio set with weather-resistant white cushions.','Bring resort-style luxury to your outdoor space. This premium wicker set includes a three-seat sofa, two armchairs, and a matching coffee table, all with weather-resistant white cushions that resist fading and moisture.','/images/product-9.jpg','2026-03-07 15:08:07.023','2026-03-07 15:08:07.023'),('cmmggjzsq000rz28ojbdx1mlt','Velvet Media Console','cmmggjzm60007z28o39yjgw6m','VLT-MED-010',1900.00,'IN_STOCK','Dark walnut media console with soft-close doors and cable management.','A sophisticated media center in rich dark walnut. Three generous compartments with cable management keep electronics organized, while adjustable shelves adapt to your equipment. Soft-close doors ensure quiet operation.','/images/product-10.jpg','2026-03-07 15:08:07.034','2026-03-07 15:08:07.034'),('cmmggjzt3000tz28omt44lz3p','Provence Recliner','cmmgfvtjd0001z2wgpx29pdm9','PRV-RCL-011',2400.00,'OUT_OF_STOCK','Italian leather power recliner with solid hardwood frame.','Sink into the embrace of our Provence Recliner. Premium Italian leather covers a solid hardwood frame with power reclining functionality. The gentle push-back mechanism ensures smooth, effortless reclining.','/images/product-2.jpg','2026-03-07 15:08:07.047','2026-03-07 15:08:07.047'),('cmmggjztd000vz28odpdygz2z','Executive Oak Desk','cmmggjzku0004z28o8aqm7gh8','EXC-DSK-012',2800.00,'IN_STOCK','Quarter-sawn oak executive desk with integrated cable management.','Command your workspace with the Executive Oak Desk. A generous work surface, built-in drawer organizers, and integrated cable routing combine functionality with stunning aesthetics in solid quarter-sawn oak.','/images/product-3.jpg','2026-03-07 15:08:07.058','2026-03-07 15:08:07.058');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-08 21:11:28
