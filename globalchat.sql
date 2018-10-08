-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2018 at 12:44 PM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `globalchat`
--

CREATE TABLE `globalchat` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `chatmsg` varchar(255) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `globalchat`
--

INSERT INTO `globalchat` (`id`, `username`, `chatmsg`, `time`) VALUES
(1, 'bd', 'Hello World', '06:21:18'),
(15, 'bd', 'test numba wan', '14:19:39'),
(16, 'mew', 'Hello i am mew', '14:20:43'),
(40, 'kaisar', 'hahahha :P', '16:27:03'),
(59, 'kaisar', 'qweqw', '17:22:41'),
(67, 'kaisar', 'qweqwe', '14:18:13'),
(68, 'bd', '22', '14:20:43'),
(69, 'kaisar', 'himel', '15:40:17'),
(70, 'kaisar', 'this is public chat', '15:47:09'),
(71, 'bd', 'hi i am bd', '15:47:41'),
(72, 'kaisar', 'hi i am kaisar', '15:47:56'),
(73, 'kaisar', 'himel', '16:00:54'),
(74, 'kaisar', 'himel 2', '16:01:57'),
(80, 'kaisar', 'hi this is kaisar ', '16:17:15'),
(81, 'kaisar', 'bangladesh', '16:18:32'),
(82, 'kaisar', 'now this', '16:23:10'),
(83, 'kaisar', 'hello', '16:23:13'),
(84, 'kaisar', 'ww', '16:24:11'),
(85, 'bd', 'hello i am bd', '16:24:38'),
(86, 'kaisar', 'hello i am kaisar', '16:24:51'),
(87, 'kaisar', 'newday', '16:30:13'),
(88, 'kaisar', 'wew', '16:34:10'),
(89, 'kaisar', 'qqq', '16:34:16'),
(90, 'kaisar', 'check login status', '16:37:18'),
(91, 'kaisar', 'check login status 2', '16:38:13'),
(92, 'kaisar', 'login stat 3', '16:42:18'),
(93, 'kaisar', 'stat 4', '16:43:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `globalchat`
--
ALTER TABLE `globalchat`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `globalchat`
--
ALTER TABLE `globalchat`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
