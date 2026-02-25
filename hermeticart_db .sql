-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 25, 2026 at 08:45 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hermeticart_db`
--
CREATE DATABASE IF NOT EXISTS hermeticart_db;
USE hermeticart_db;
-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total_amount`, `status`, `order_date`) VALUES
(6, 7, 6497.00, 'completed', '2026-02-25 06:59:12'),
(7, 8, 48279.00, 'completed', '2026-02-25 07:25:57');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 6, 13, 1, 699.00),
(2, 6, 3, 1, 2299.00),
(3, 6, 2, 1, 3499.00),
(4, 7, 3, 21, 2299.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 20,
  `product_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `image_url`, `description`, `stock_quantity`, `product_type`) VALUES
(1, 'Wireless Mouse', 1499.00, 'assets/images/wirelessmouse1.png', 'Ergonomic high-performance wireless mouse.', 20, 'Hardware'),
(2, 'Mechanical Keyboard', 3499.00, 'assets/images/mechanicalkeyboard1.png', 'RGB mechanical keyboard with premium switches.', 20, 'Hardware'),
(3, 'Headset', 2299.00, 'assets/images/headphones1.png', 'Immersive surround sound gaming headset.', 20, 'Hardware'),
(4, 'USB-C Hub', 999.00, 'assets/images/usb-c.png\r\n', 'Multiport USB-C hub for creators.', 20, 'Hardware'),
(5, 'Smart Watch', 1999.00, 'assets/images/smartwatch1.png', 'Stylish smart watch with fitness tracking.', 20, 'Hardware'),
(6, 'Gaming Mouse', 1299.00, 'assets/images/gamingmouse1.jpeg', 'High-precision RGB gaming mouse.', 20, 'Hardware'),
(7, 'Mechanical Keyboard Pro', 3999.00, 'assets/images/mechanicalkeyboard2.png', 'Premium mechanical keyboard with programmable keys.', 20, 'Hardware'),
(8, 'Bluetooth Speaker', 899.00, 'assets/images/speaker1.png', 'Portable speaker with crystal-clear sound.', 20, 'Hardware\r\n'),
(9, 'Laptop Stand', 599.00, 'assets/images/laptopstand.png', 'Ergonomic laptop stand for better posture.', 20, 'Furniture'),
(10, 'Webcam HD', 1599.00, 'assets/images/webcam.png', 'High-definition webcam for streaming.', 20, 'Hardware'),
(11, 'Gaming Chair', 8999.00, 'assets/images/gamingchair.png', 'Comfortable chair for long gaming sessions.', 20, 'Furniture'),
(12, 'USB Flash Drive', 399.00, 'assets/images/usbdrive.png', 'Portable storage for your data.', 20, 'Hardware'),
(13, 'Wireless Charger', 699.00, 'assets/images/wirelesscharger.png', 'Fast wireless charger for your devices.', 20, 'Hardware'),
(14, 'Graphics Tablet', 4999.00, 'assets/images/graphicstablet.png', 'Create digital art with precision.', 20, 'Hardware'),
(15, 'Noise Cancelling Earbuds', 2999.00, 'assets/images/earbuds.png', 'Block out distractions and enjoy music.', 20, 'Hardware'),
(16, 'Portable Monitor', 5999.00, 'assets/images/portablemonitor.png', 'Extend your laptop screen anywhere.', 20, 'Hardware'),
(17, 'RGB Desk Lamp', 1299.00, 'assets/images/desklamp.png', 'Stylish lamp with customizable lighting.', 20, 'Furniture');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(7, 'mario', 'mario@supermario.com', '$2y$10$APG/qYtp.fwNgDaUJ/NgIOXO8btbrLU.OZxgkozZLxAeXK6ndCk9q', 'admin', '2026-02-22 10:25:57'),
(8, 'sonic', 'sonic@themovie.com', '$2y$10$AU4UXrgOjkSTzys53ECaOebf1vLViQvfgBNdTl8ze6M3EDsyYps.q', 'customer', '2026-02-23 06:38:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_user_order` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_user_order` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
