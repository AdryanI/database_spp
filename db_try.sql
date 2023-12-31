-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2023 at 03:25 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_try`
--

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(16) NOT NULL,
  `nama_kelas` varchar(10) NOT NULL,
  `kompetensi_keahlian` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `nama_kelas`, `kompetensi_keahlian`) VALUES
(1, 'X RPL 1', 'Rekayasa Perangkat Lunak'),
(2, 'X RPL 2', 'Rekayasa Perangkat Lunak'),
(3, 'X RPL 3', 'Rekayasa Perangkat Lunak'),
(4, 'X TKJ 1', 'Teknik Komputer Jaringan'),
(5, 'X TKJ 2', 'Teknik Komputer Jaringan'),
(6, 'X MM 1', 'Multimedia'),
(7, 'X MM 2', 'Multimedia'),
(8, 'X MM 3', 'Multimedia'),
(9, 'X MM 4', 'Multimedia'),
(10, 'X PKM 1', 'Perbankan Keuangan Mikro'),
(11, 'X PKM 2', 'Perbankan Keuangan Mikro'),
(12, 'XI RPL 1', 'Rekayasa Perangkat Lunak'),
(13, 'XI RPL 2', 'Rekayasa Perangkat Lunak'),
(14, 'XI RPL 3', 'Rekayasa Perangkat Lunak'),
(15, 'XI TKJ 1', 'Teknik Komputer Jaringan'),
(16, 'XI TKJ 2', 'Teknik Komputer Jaringan'),
(17, 'XI MM 1', 'Multimedia'),
(18, 'XI MM 2', 'Multimedia'),
(19, 'XI MM 3', 'Multimedia'),
(20, 'XI MM 4', 'Multimedia'),
(21, 'XI PKM 1', 'Perbankan Keuangan Mikro'),
(22, 'XI PKM 2', 'Perbankan Keuangan Mikro');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `user_id` int(16) NOT NULL,
  `photo_id` int(16) NOT NULL,
  `user_name` varchar(64) NOT NULL,
  `user_email` varchar(64) NOT NULL,
  `user_password` text NOT NULL,
  `status` enum('admin','petugas','siswa') NOT NULL,
  `periode` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user_id`, `photo_id`, `user_name`, `user_email`, `user_password`, `status`, `periode`) VALUES
(1, 1, 'Erlang', 'erlang@siesta.com', '123', 'admin', '2022-2024'),
(2, 2, 'Adryan', 'adryan@elaina.com', '123', 'petugas', '2022-2024'),
(3, 3, 'Rangga', 'rangga@komi.com', '123', 'siswa', '2022-2024'),
(4, 4, 'Raffi', 'raffi@mai.com', '123', 'siswa', '2022-2024'),
(5, 5, 'Ronald', 'ronald@kokomi.com', '123', 'siswa', '2022-2024');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `photo_id` int(16) NOT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `nisn` int(10) NOT NULL,
  `nis` char(8) NOT NULL,
  `nama` varchar(32) NOT NULL,
  `user_id` int(16) NOT NULL,
  `id_kelas` int(8) NOT NULL,
  `alamat` text NOT NULL,
  `nomor_telp` varchar(13) NOT NULL,
  `id_spp` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`nisn`, `nis`, `nama`, `user_id`, `id_kelas`, `alamat`, `nomor_telp`, `id_spp`) VALUES
(204001, '1234', 'Rangga Athaya Dzikri', 3, 14, 'Jalan Jalan ', '082116660825', 2040001),
(204002, '1234', 'Erlangga Muhammad Hafiz', 1, 14, 'Perum Ambar', '0895341429414', 2040002);

-- --------------------------------------------------------

--
-- Table structure for table `spp`
--

CREATE TABLE `spp` (
  `id_spp` int(32) NOT NULL,
  `nama` varchar(32) NOT NULL,
  `user_email` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spp`
--

INSERT INTO `spp` (`id_spp`, `nama`, `user_email`) VALUES
(2040001, 'Rangga Athaya Dzikri', 'rangga@komi.com'),
(2040002, 'Erlangga Muhammad Hafiz', 'erlang@siesta.com'),
(2040003, 'Adryan Islami Putra', 'adryan@elaina.com');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(64) NOT NULL,
  `nisn` int(10) NOT NULL,
  `nama` varchar(128) NOT NULL,
  `id_spp` int(32) NOT NULL,
  `nominal` varchar(18) NOT NULL,
  `waktu` datetime NOT NULL,
  `penanggung_jawab` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `nisn`, `nama`, `id_spp`, `nominal`, `waktu`, `penanggung_jawab`) VALUES
(1, 204001, 'Rangga Athaya Dzikri', 2040001, 'Rp350,000.00', '2023-11-11 23:28:19', 'Admin: Erlang');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`photo_id`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`nisn`),
  ADD KEY `id_kelas` (`id_kelas`),
  ADD KEY `id_spp` (`id_spp`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `spp`
--
ALTER TABLE `spp`
  ADD PRIMARY KEY (`id_spp`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_spp` (`id_spp`),
  ADD KEY `nisn` (`nisn`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `user_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `photo_id` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `nisn` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204003;

--
-- AUTO_INCREMENT for table `spp`
--
ALTER TABLE `spp`
  MODIFY `id_spp` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2040004;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `siswa_ibfk_2` FOREIGN KEY (`id_spp`) REFERENCES `spp` (`id_spp`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `siswa_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_spp`) REFERENCES `spp` (`id_spp`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`nisn`) REFERENCES `siswa` (`nisn`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
