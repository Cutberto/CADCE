-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2021 at 02:34 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cadce_test`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `airtable_view`
-- (See below for the actual view)
--
CREATE TABLE `airtable_view` (
`IdTarea` int(11)
,`IdProyecto` int(11)
,`Tarea` varchar(2000)
,`Casodeuso` varchar(200)
,`Iteración` float
,`Fasededesarrollo` varchar(500)
,`Status` varchar(500)
,`Tiempodecompletado` float
);

-- --------------------------------------------------------

--
-- Table structure for table `casodeuso`
--

CREATE TABLE `casodeuso` (
  `IdCasoDeUso` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `IdProyecto` int(11) NOT NULL,
  `dificultad` float NOT NULL,
  `iteracion` float DEFAULT NULL,
  `Status` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `casodeuso`
--

INSERT INTO `casodeuso` (`IdCasoDeUso`, `nombre`, `descripcion`, `IdProyecto`, `dificultad`, `iteracion`, `Status`) VALUES
(1, 'Consultar preaprobación con el método FICO', 'Preaprobación del método FICO', 1, 0, 1, NULL),
(3, 'Crear solicitudes de kit de conversión en Impúlsate desde Orígenes ', 'Crear las solicitudes para el kit de conversión', 1, 0, 2, NULL),
(4, 'Ver las solicitudes que requieren agendar visita de preaprobación', 'solicitudes que requieren agendar visita de preaprobación', 1, 0, 3, NULL),
(5, 'Consultar preaprobación con el método FICO Banco', 'Implementación que permita la preaprobración', 2, 0, 1, NULL),
(6, 'Crear solicitudes de kit de conversión en Impúlsate desde Orígenes Banco', 'Crear las solicitudes para el kit de conversión', 2, 0, 2, NULL),
(7, 'Solicitudes que requieren agendar visita de preaprobación Banco', 'Ver las solicitudes que requieren agendar visita de preaprobación', 2, 0, 3, NULL),
(8, 'Registrar que se agendó la visita de una solicitud', 'Agregar los registros', 2, 0, 4, NULL),
(9, 'Consultar preaprobación con el método FICO Segunda Versión', 'Revisión de las solicitudes que requieren agendar visita de preaprobación', 2, 0, 5, NULL),
(10, 'Quitar status de preaprobación', 'Proceso para la eliminación del status', 2, 0, 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `casodeuso_tarea`
--

CREATE TABLE `casodeuso_tarea` (
  `IdCasoDeUso` int(11) NOT NULL,
  `IdTarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `casodeuso_tarea`
--

INSERT INTO `casodeuso_tarea` (`IdCasoDeUso`, `IdTarea`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(3, 24),
(5, 25),
(6, 30),
(7, 27),
(7, 38),
(8, 31),
(8, 39),
(9, 36),
(9, 40),
(10, 34),
(10, 35);

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE `empleado` (
  `IdEmpleado` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `contraseña` varchar(200) NOT NULL,
  `IdRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`IdEmpleado`, `nombre`, `apellidos`, `correo`, `contraseña`, `IdRol`) VALUES
(1, 'cut', 'cut', 'cut@cut.com', '$2a$12$vP0VWgvW.bB18N8C8fxWie5vXwETUaviK9mZtnif1fOXMgylNJknq', 1);

-- --------------------------------------------------------

--
-- Table structure for table `iteracion`
--

CREATE TABLE `iteracion` (
  `iteracion` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `FechaFinalizacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iteracion`
--

INSERT INTO `iteracion` (`iteracion`, `IdProyecto`, `FechaFinalizacion`) VALUES
(1, 1, '2021-04-28'),
(1, 2, '2021-04-29'),
(2, 1, '2021-04-29'),
(2, 2, '2021-04-30'),
(3, 1, '2021-05-01'),
(3, 2, '2021-05-03'),
(4, 2, '2021-06-06'),
(5, 2, '2021-05-07'),
(6, 2, '2021-05-08'),
(7, 2, '2021-05-09'),
(8, 2, '2021-05-10');

-- --------------------------------------------------------

--
-- Table structure for table `proyecto`
--

CREATE TABLE `proyecto` (
  `IdProyecto` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `fechaPlaneada` date DEFAULT NULL,
  `fechaLimite` date DEFAULT NULL,
  `fechaInicial` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL,
  `apiKey` varchar(500) DEFAULT 'Insertar la llave api para este proyecto',
  `tableKey` varchar(500) DEFAULT 'Insertar la clave de la tabla para este proyecto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `proyecto`
--

INSERT INTO `proyecto` (`IdProyecto`, `nombre`, `descripcion`, `fechaPlaneada`, `fechaLimite`, `fechaInicial`, `estado`, `apiKey`, `tableKey`) VALUES
(1, 'Sistema para comunicación interna entre departamentos', 'Desarrollo del sistema para permitir el manejo óptimo de comunicaciones entre departamentos', '2021-05-04', '2021-05-11', '2021-04-28', 'Activo', 'key5zCvd094dCKt6X', 'appfHD8Ikbtk78MrM'),
(2, 'Sistema bancario para transacciones dentro de la empresa', 'Sistema que permitirá hacer los pagos de forma directa', '2021-05-08', '2021-05-05', '2021-04-29', 'Activo', 'key5zCvd094dCKt6X', 'appfHD8Ikbtk78MrM'),
(3, 'Diseño de funciones para aplicación ya hecha de NatDev', 'Aumentar el número de funciones que ya existen en el sistema', '2021-04-28', '2021-04-28', '2021-04-29', 'Activo', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto');

-- --------------------------------------------------------

--
-- Stand-in structure for view `proyecto_conteotareas`
-- (See below for the actual view)
--
CREATE TABLE `proyecto_conteotareas` (
`IdProyecto` int(11)
,`totales` bigint(21)
,`terminadas` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `proyecto_tareasdone`
-- (See below for the actual view)
--
CREATE TABLE `proyecto_tareasdone` (
`IdProyecto` int(11)
,`conteo` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `proyecto_tareastotales`
-- (See below for the actual view)
--
CREATE TABLE `proyecto_tareastotales` (
`IdProyecto` int(11)
,`totales` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `proyecto_tiempoinvertido`
-- (See below for the actual view)
--
CREATE TABLE `proyecto_tiempoinvertido` (
`IdProyecto` int(11)
,`TiempoInvertido` double
);

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `IdRol` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`IdRol`, `nombre`) VALUES
(1, 'admin'),
(2, 'empleado');

-- --------------------------------------------------------

--
-- Table structure for table `tarea`
--

CREATE TABLE `tarea` (
  `IdTarea` int(11) NOT NULL,
  `nombre` varchar(2000) NOT NULL,
  `fase` varchar(500) NOT NULL,
  `dificultad` float NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `Status` varchar(500) DEFAULT NULL,
  `TiempoReal` float NOT NULL DEFAULT 0,
  `FechaFinalizacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tarea`
--

INSERT INTO `tarea` (`IdTarea`, `nombre`, `fase`, `dificultad`, `IdProyecto`, `Status`, `TiempoReal`, `FechaFinalizacion`) VALUES
(1, 'Test Cases', 'Análisis', 2, 1, 'Done', 2, '2021-04-29'),
(2, 'Verificación', 'Análisis', 3, 1, 'Done', 3, '2021-04-29'),
(3, 'Wireframes', 'Diseño', 5, 1, 'Done', 5, '2021-04-29'),
(4, 'Algorítmo', 'Diseño', 3, 1, 'Done', 4, '2021-04-29'),
(5, 'Diagrama de componentes', 'Diseño', 3, 1, 'Done', 1, '2021-04-29'),
(6, 'Validación del Diseño', 'Diseño', 2, 1, 'Done', 1, '2021-04-29'),
(7, 'Modelo DB', 'Implementación', 5, 1, 'Done', 4, '2021-04-29'),
(18, 'Backend', 'Implementación', 8, 1, 'In progress', 0, NULL),
(19, 'Backend', 'Implementación', 3, 1, 'In progress', 0, NULL),
(20, 'Backend kit', 'Implementación', 3, 1, NULL, 0, NULL),
(21, 'Matriz de trazabilidad ', 'Implementación', 5, 1, 'null', 0, NULL),
(22, 'Matriz de trazabilidad Kit', 'Implementación', 5, 1, NULL, 0, NULL),
(23, 'Frontend logico', 'Implementación', 5, 1, 'Done', 4, '2021-04-29'),
(24, 'Backend Implementación Kit', 'Implementación', 8, 1, NULL, 0, NULL),
(25, 'Test Cases para Banco', 'Análisis', 5, 2, 'Done', 5, '2021-04-29'),
(26, 'Test Cases Banco', 'Análisis', 3, 2, 'In progress', 3, NULL),
(27, 'Test Cases Bancario', 'Análisis', 3, 2, 'Done', 3, '2021-04-29'),
(28, 'Test Cases Bancario', 'Análisis', 3, 2, 'Done', 3, '2021-04-29'),
(29, 'Verificación', 'Análisis', 5, 2, 'Done', 3, '2021-04-29'),
(30, 'Verificación Banco', 'Análisis', 5, 2, 'Done', 4, '2021-04-30'),
(31, 'Verificación Bancaria', 'Análisis', 5, 2, 'Done', 4, '2021-04-29'),
(33, 'Validación del Diseño', 'Diseño', 5, 2, 'Done', 1, '2021-04-29'),
(34, 'Validación del Diseño Status', 'Diseño', 5, 2, 'In progress', 0, NULL),
(35, 'Backend Status', 'Implementación', 8, 2, 'Done', 7.5, '2021-04-30'),
(36, 'Frontend lógica', 'Implementación', 8, 2, 'Done', 6, '2021-04-30'),
(37, 'Verificación', 'Implementación', 5, 2, 'Done', 3, '2021-04-29'),
(38, 'Verificación Imp.', 'Implementación', 5, 2, 'In progress', 8, NULL),
(39, 'Manual de Usuario', 'Implementación', 3, 2, 'Done', 0.8, '2021-04-30'),
(40, 'Pruebas de Usabilidad', 'Pruebas', 5, 2, 'Done', 0.5, '2021-04-30');

-- --------------------------------------------------------

--
-- Stand-in structure for view `vista_estimacion_tiempo_proyecto`
-- (See below for the actual view)
--
CREATE TABLE `vista_estimacion_tiempo_proyecto` (
`IdProyecto` int(11)
,`IdCasoDeUso` int(11)
,`dificultad` float
,`TiempoTotal` double
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vista_proyecto_tareas`
-- (See below for the actual view)
--
CREATE TABLE `vista_proyecto_tareas` (
`IdProyecto` int(11)
,`nombre` varchar(200)
,`descripcion` varchar(2000)
,`fechaPlaneada` date
,`fechaLimite` date
,`fechaInicial` date
,`estado` varchar(20)
,`totales` bigint(21)
,`terminadas` bigint(21)
,`TiempoInvertido` double
);

-- --------------------------------------------------------

--
-- Table structure for table `wbs`
--

CREATE TABLE `wbs` (
  `Dificultad` int(11) NOT NULL,
  `TiempoEstimado` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wbs`
--

INSERT INTO `wbs` (`Dificultad`, `TiempoEstimado`) VALUES
(1, 0.5),
(2, 2),
(3, 3),
(5, 4),
(8, 5),
(13, 10);

-- --------------------------------------------------------

--
-- Structure for view `airtable_view`
--
DROP TABLE IF EXISTS `airtable_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `airtable_view`  AS SELECT `tarea`.`IdTarea` AS `IdTarea`, `tarea`.`IdProyecto` AS `IdProyecto`, `tarea`.`nombre` AS `Tarea`, `casodeuso`.`nombre` AS `Casodeuso`, `casodeuso`.`iteracion` AS `Iteración`, `tarea`.`fase` AS `Fasededesarrollo`, `tarea`.`Status` AS `Status`, `tarea`.`TiempoReal` AS `Tiempodecompletado` FROM ((`tarea` join `casodeuso`) join `casodeuso_tarea`) WHERE `tarea`.`IdTarea` = `casodeuso_tarea`.`IdTarea` AND `casodeuso`.`IdCasoDeUso` = `casodeuso_tarea`.`IdCasoDeUso` ;

-- --------------------------------------------------------

--
-- Structure for view `proyecto_conteotareas`
--
DROP TABLE IF EXISTS `proyecto_conteotareas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyecto_conteotareas`  AS SELECT `proyecto_tareastotales`.`IdProyecto` AS `IdProyecto`, `proyecto_tareastotales`.`totales` AS `totales`, `proyecto_tareasdone`.`conteo` AS `terminadas` FROM (`proyecto_tareastotales` left join `proyecto_tareasdone` on(`proyecto_tareastotales`.`IdProyecto` = `proyecto_tareasdone`.`IdProyecto`)) ;

-- --------------------------------------------------------

--
-- Structure for view `proyecto_tareasdone`
--
DROP TABLE IF EXISTS `proyecto_tareasdone`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyecto_tareasdone`  AS SELECT `tarea`.`IdProyecto` AS `IdProyecto`, count(`tarea`.`IdTarea`) AS `conteo` FROM `tarea` WHERE `tarea`.`Status` = 'Done' GROUP BY `tarea`.`IdProyecto` ;

-- --------------------------------------------------------

--
-- Structure for view `proyecto_tareastotales`
--
DROP TABLE IF EXISTS `proyecto_tareastotales`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyecto_tareastotales`  AS SELECT `tarea`.`IdProyecto` AS `IdProyecto`, count(`tarea`.`IdTarea`) AS `totales` FROM `tarea` GROUP BY `tarea`.`IdProyecto` ;

-- --------------------------------------------------------

--
-- Structure for view `proyecto_tiempoinvertido`
--
DROP TABLE IF EXISTS `proyecto_tiempoinvertido`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyecto_tiempoinvertido`  AS SELECT `tarea`.`IdProyecto` AS `IdProyecto`, sum(`tarea`.`TiempoReal`) AS `TiempoInvertido` FROM `tarea` GROUP BY `tarea`.`IdProyecto` ;

-- --------------------------------------------------------

--
-- Structure for view `vista_estimacion_tiempo_proyecto`
--
DROP TABLE IF EXISTS `vista_estimacion_tiempo_proyecto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_estimacion_tiempo_proyecto`  AS SELECT `casodeuso`.`IdProyecto` AS `IdProyecto`, `casodeuso_tarea`.`IdCasoDeUso` AS `IdCasoDeUso`, `tarea`.`dificultad` AS `dificultad`, sum(`wbs`.`TiempoEstimado`) AS `TiempoTotal` FROM (((`casodeuso_tarea` join `tarea`) join `wbs`) join `casodeuso`) WHERE `casodeuso_tarea`.`IdTarea` = `tarea`.`IdTarea` AND `tarea`.`dificultad` = `wbs`.`Dificultad` AND `casodeuso`.`IdCasoDeUso` = `casodeuso_tarea`.`IdCasoDeUso` GROUP BY `casodeuso`.`IdProyecto` ;

-- --------------------------------------------------------

--
-- Structure for view `vista_proyecto_tareas`
--
DROP TABLE IF EXISTS `vista_proyecto_tareas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_proyecto_tareas`  AS SELECT `proyecto`.`IdProyecto` AS `IdProyecto`, `proyecto`.`nombre` AS `nombre`, `proyecto`.`descripcion` AS `descripcion`, `proyecto`.`fechaPlaneada` AS `fechaPlaneada`, `proyecto`.`fechaLimite` AS `fechaLimite`, `proyecto`.`fechaInicial` AS `fechaInicial`, `proyecto`.`estado` AS `estado`, `proyecto_conteotareas`.`totales` AS `totales`, `proyecto_conteotareas`.`terminadas` AS `terminadas`, `proyecto_tiempoinvertido`.`TiempoInvertido` AS `TiempoInvertido` FROM ((`proyecto` left join `proyecto_conteotareas` on(`proyecto`.`IdProyecto` = `proyecto_conteotareas`.`IdProyecto`)) left join `proyecto_tiempoinvertido` on(`proyecto_tiempoinvertido`.`IdProyecto` = `proyecto`.`IdProyecto`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casodeuso`
--
ALTER TABLE `casodeuso`
  ADD PRIMARY KEY (`IdCasoDeUso`),
  ADD KEY `IdProyecto` (`IdProyecto`);

--
-- Indexes for table `casodeuso_tarea`
--
ALTER TABLE `casodeuso_tarea`
  ADD PRIMARY KEY (`IdCasoDeUso`,`IdTarea`),
  ADD KEY `IdTarea` (`IdTarea`);

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`IdEmpleado`),
  ADD KEY `IdRol` (`IdRol`);

--
-- Indexes for table `iteracion`
--
ALTER TABLE `iteracion`
  ADD PRIMARY KEY (`iteracion`,`IdProyecto`);

--
-- Indexes for table `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IdRol`);

--
-- Indexes for table `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`IdTarea`,`dificultad`),
  ADD KEY `dificultad` (`dificultad`);

--
-- Indexes for table `wbs`
--
ALTER TABLE `wbs`
  ADD PRIMARY KEY (`Dificultad`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casodeuso`
--
ALTER TABLE `casodeuso`
  MODIFY `IdCasoDeUso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `IdEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `IdProyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tarea`
--
ALTER TABLE `tarea`
  MODIFY `IdTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `casodeuso`
--
ALTER TABLE `casodeuso`
  ADD CONSTRAINT `casoDeUso_ibfk_1` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`);

--
-- Constraints for table `casodeuso_tarea`
--
ALTER TABLE `casodeuso_tarea`
  ADD CONSTRAINT `casoDeUso_tarea_ibfk_1` FOREIGN KEY (`IdCasoDeUso`) REFERENCES `casodeuso` (`IdCasoDeUso`),
  ADD CONSTRAINT `casoDeUso_tarea_ibfk_2` FOREIGN KEY (`IdTarea`) REFERENCES `tarea` (`IdTarea`);

--
-- Constraints for table `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
