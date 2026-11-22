-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2026 at 04:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`) VALUES
(1, 'Rita Bekteshi', 'ritabekteshi12', 'ritabekteshi12@gmail.com', '$2y$10$L.jWjdbe72RsnR645D2y5e4TqiI1ZZbNlu5Wzk5H7Z9CQy2CX6n/O'),
(2, 'Nar Krasniqi', 'nar123', 'nar@gmail.com', '$2y$10$S6nYl11uA62gfxcRUx5zXuI4NdlNR28/ujPVh0yp6uMKVb2HlUmVu'),
(3, 'Meris Bellagoshi', 'merisii45', 'merisi45@gmail.com', '$2y$10$et1nK6zKRUNOYypeiuHNBeSJe01sf7ZqTyxdrg0EPGLECka2/sVFO'),
(4, 'Bun Ilazi', 'buni11', 'ilazibun11@gmail.com', '$2y$10$DAs.5lQHvqiTDW6LRg9NC.tq3O3u.bfJkQKXcXvh2jpmkyANJxSlm'),
(5, 'Ilazi Gashi', 'ilaziigashi', 'ilazigashi12@gmail.com', '$2y$10$XalukjB9oqnbSIu3LQuSMu/ePIBn1n33lflA7Wa9TojcsZxLbFl1y'),
(6, 'Ronat Hoxha', 'ronatii13', 'ronati13@gmail.com', '$2y$10$ovR4k0UJ/lEC5q8QJt78eeUTUTW8XkeZ1JGIUfbSW9YCnbbJQa.au'),
(7, 'Fron Bekteshi', 'fron13', 'fron13@gmail.com', '$2y$10$09WQ0ojeJkemVffRRoN2e./Wn9AD9thj4qRQmnBWSrC9P.jlMgFiu'),
(8, 'Diella Maqedonci', 'diellushe', 'diellam@gmail.com', '$2y$10$JmJuak1A34hmC6Tzlx717unbPlMLBmc8gRjoj4yLy56eZ2Jul/5FK'),
(9, 'Olsa Ibrahimi', 'olsaa', 'olsai@gmail.com', '$2y$10$OJ0NdH6eSUCiWw0q6ooV3.ghEvgxJpCvKZxWsdBxxi7jyYHLxoRbW'),
(10, 'Amela Sinani', 'amelaa_a123', 'amela123@gmail.com', '$2y$10$ySXMsQ3wtMm4sD2NR5mMlue20G7JB8Kc6e.K2Lb89USGwY9fMlQOu'),
(11, 'Rita Bekteshi', 'rita_a30', 'ritabekteshi@gmail.com', '$2y$10$en3nHJaSjJX8KbUw79NnaeaLWtSoqity8syRX5NAUmjoR8Ndl4Sgi'),
(12, 'Ervin Shehu', 'ervini12', 'ervin@gmail.com', '$2y$10$88/yAYFcmDWNuN0PahkJCeiAWlou0S9FrKnHKGAv9xlXnyXOxbRo2'),
(13, 'Drinor Shala', 'drinori23', 'drinori@gmail.com', '$2y$10$ONm7VjtSvJHdN1wVPpq01OHAh6RKvMioiEHeNWfQWp7HNKUzoA7am');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
