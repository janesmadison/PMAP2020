-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2020 at 09:19 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pmap_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `assigned_to`
--

CREATE TABLE `assigned_to` (
  `surveyID` bigint(20) NOT NULL,
  `group_class_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `class_group`
--

CREATE TABLE `class_group` (
  `className` varchar(100) NOT NULL,
  `groupName` varchar(100) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `group_class_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `member_of`
--

CREATE TABLE `member_of` (
  `student_email` varchar(255) NOT NULL,
  `group_class_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `option`
--

CREATE TABLE `option` (
  `questionID` bigint(20) NOT NULL,
  `optionID` bigint(20) NOT NULL,
  `option_text` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_text` varchar(8000) NOT NULL,
  `surveyID` bigint(20) NOT NULL,
  `questionID` bigint(20) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `answerID` bigint(20) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `answer_text` varchar(8000) NOT NULL,
  `questionID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

CREATE TABLE `survey` (
  `survey_name` varchar(200) NOT NULL,
  `surveyID` bigint(20) NOT NULL,
  `admin_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `name` char(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `type` enum('admin','standard') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigned_to`
--
ALTER TABLE `assigned_to`
  ADD PRIMARY KEY (`surveyID`,`group_class_id`),
  ADD KEY `group_class_id` (`group_class_id`);

--
-- Indexes for table `class_group`
--
ALTER TABLE `class_group`
  ADD PRIMARY KEY (`group_class_id`),
  ADD KEY `admin_email` (`admin_email`);

--
-- Indexes for table `member_of`
--
ALTER TABLE `member_of`
  ADD PRIMARY KEY (`student_email`,`group_class_id`),
  ADD KEY `group_class_id` (`group_class_id`);

--
-- Indexes for table `option`
--
ALTER TABLE `option`
  ADD PRIMARY KEY (`optionID`) USING BTREE,
  ADD KEY `questionID` (`questionID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`questionID`),
  ADD KEY `surveyID` (`surveyID`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`answerID`,`student_email`),
  ADD KEY `student_email` (`student_email`),
  ADD KEY `questionID` (`questionID`);

--
-- Indexes for table `survey`
--
ALTER TABLE `survey`
  ADD PRIMARY KEY (`surveyID`),
  ADD KEY `admin_email` (`admin_email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assigned_to`
--
ALTER TABLE `assigned_to`
  ADD CONSTRAINT `assigned_to_ibfk_1` FOREIGN KEY (`group_class_id`) REFERENCES `class_group` (`group_class_id`),
  ADD CONSTRAINT `assigned_to_ibfk_2` FOREIGN KEY (`surveyID`) REFERENCES `survey` (`surveyID`);

--
-- Constraints for table `class_group`
--
ALTER TABLE `class_group`
  ADD CONSTRAINT `class_group_ibfk_1` FOREIGN KEY (`admin_email`) REFERENCES `users` (`email`);

--
-- Constraints for table `member_of`
--
ALTER TABLE `member_of`
  ADD CONSTRAINT `member_of_ibfk_1` FOREIGN KEY (`student_email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `member_of_ibfk_2` FOREIGN KEY (`group_class_id`) REFERENCES `class_group` (`group_class_id`);

--
-- Constraints for table `option`
--
ALTER TABLE `option`
  ADD CONSTRAINT `option_ibfk_1` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`surveyID`) REFERENCES `survey` (`surveyID`);

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`answerID`) REFERENCES `option` (`optionID`),
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`student_email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `results_ibfk_3` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`);

--
-- Constraints for table `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`admin_email`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
