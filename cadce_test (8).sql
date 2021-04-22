-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
<<<<<<< HEAD:cadce_test.sql
-- Tiempo de generación: 21-04-2021 a las 22:51:15
=======
-- Tiempo de generación: 19-04-2021 a las 18:27:02
>>>>>>> Ángel/GraficaTiempoRealTiempoEstimado:cadce_test (8).sql
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cadce_test`
--

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `airtable_view`
-- (Véase abajo para la vista actual)
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
-- Estructura de tabla para la tabla `casodeuso`
--

CREATE TABLE `casodeuso` (
  `IdCasoDeUso` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `IdProyecto` int(11) NOT NULL,
  `dificultad` float NOT NULL,
  `tiempoMax` float DEFAULT NULL,
  `tiempoMin` float DEFAULT NULL,
  `iteracion` float DEFAULT NULL,
  `Status` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `casodeuso`
--

INSERT INTO `casodeuso` (`IdCasoDeUso`, `nombre`, `descripcion`, `IdProyecto`, `dificultad`, `tiempoMax`, `tiempoMin`, `iteracion`, `Status`) VALUES
(1, 'iniciar sesion', 'Crear el login de la herramienta digital', 1, 1, 0, 0, 1, ''),
(2, 'Agregar producto', 'Agregar producto que vende la tienda', 2, 5, 0, 0, 1, ''),
(3, 'Cerrar sesion', 'Logout de la sesion', 1, 13, 0, 0, 1, ''),
(5, 'Login del sistema', 'Este caso de uso es el login del sistema', 1, 13, 0, 0, 1, ''),
(6, 'caso test editado', 'caso test descripcion ', 3, 1, 0, 0, 1, ''),
(7, 'Registrarse en la plataforma', 'El usuario debe poder crear una cuenta con su correo institucional', 5, 13, 0, 0, 1, NULL),
(8, 'Software para finanzas', 'Este software será destinado al departamento de finanzas...', 1, 0, 0, 0, 1, NULL),
(9, 'Prueba para demostración', 'descripción de prueba ', 1, 0, 0, 0, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casodeuso_tarea`
--

CREATE TABLE `casodeuso_tarea` (
  `IdCasoDeUso` int(11) NOT NULL,
  `IdTarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `casodeuso_tarea`
--

INSERT INTO `casodeuso_tarea` (`IdCasoDeUso`, `IdTarea`) VALUES
(1, 2),
(1, 9),
(1, 11),
(1, 12),
(1, 24),
(1, 25),
(2, 22),
(3, 1),
(3, 27),
(6, 19),
(6, 20),
(6, 23),
(7, 21),
(9, 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
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
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`IdEmpleado`, `nombre`, `apellidos`, `correo`, `contraseña`, `IdRol`) VALUES
(1, 'cut', 'cut', 'cut@cut.com', '$2a$12$vP0VWgvW.bB18N8C8fxWie5vXwETUaviK9mZtnif1fOXMgylNJknq', 1),
(2, 'Empleado', 'empleado', 'empleado', '$2a$12$zQ5B4mksnynHbstNW99tDuiIRb4uJ4gLlwkhOz/bJdxqHu1s8ku3y', 2),
(3, 'Diego', 'Padilla', 'asd@gmail.com', '$2a$12$WZ2ign2fGFNBvP0eXUlr.uuDzQOSMMbrvblHKS4C34nXtq2YxKaSG', 2),
(4, 'Diego ', 'Padilla', 'asd@gmail.com', '$2a$12$HqZdUDQ8fMs59YxKQWSMherDKmIf5GCjC8Oxa6iUSHiEfzN/0yJJK', 1),
(5, 'Carolina', 'Herrera', 'caro@gmail.com', '$2a$12$4PIC2ap1wWDESOl.Rf9vPeDgb2LtDiq5dgjGPArgmq6qh/mIfc2iS', 1),
(6, 'Cutberto', 'Arizabalo ', 'Nava', '$2a$12$UFPVccn..0e2LtLdAbtKZuahSJXDYS/zIo6SFRTiv2uu0q7X4cpe.', 2),
(8, 'juan admin', 'perez', 'juan@juan.juan', '$2a$12$ZY.FzNKiAJVTgeCOAjM7R.dN/D0DY9pfn115JDopHXr88hdBvLr0e', 2),
(9, 'roberto', 'perez', 'rob@rob.com', '$2a$12$bkHT0LZdVPzB6ThU5oeTZexcUjOws2Z7Kluz5GOhb9kdNK5sLJhK6', 1),
(10, 'nombre', 'apellido', 'correo@mail.com', '$2a$12$Lj0iqksTL3deBq4onEmra./shJxfsPsFVjckBa1UPrHIG8q63yvJO', 1),
(11, 'nombre 2', 'arizabalo', 'cut3@cut.com', '$2a$12$Zyga.mutUInGrNDonqc0L.Y3QSOaf1Pmgrik.Geqiz1ZgDjrGABZC', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_proyecto`
--

CREATE TABLE `empleado_proyecto` (
  `IdProyecto` int(11) NOT NULL,
  `IdEmpleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `IdProyecto` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `fechaPlaneada` date DEFAULT NULL,
  `fechaLimite` date DEFAULT NULL,
  `fechaInicial` date DEFAULT NULL,
  `tiempoMax` float DEFAULT NULL,
  `tiempoMin` float DEFAULT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`IdProyecto`, `nombre`, `descripcion`, `fechaPlaneada`, `fechaLimite`, `fechaInicial`, `tiempoMax`, `tiempoMin`, `estado`) VALUES
(1, 'Administrador de proyectos natdev', 'Desarrollo de una aplicación para administrar proyectos dentro de nadtdev ', '2021-03-27', '2021-04-03', '2021-03-09', 0, 0, 'Activo'),
(2, 'Aplicación para aprender ingles', 'Desarrollo de aplicación de ingles para openenglish ', '2021-03-02', '2021-03-09', '2021-03-25', 0, 0, 'Finalizado'),
(3, 'Pagina web, tienda de mascotas', 'Creación de una pagina web para presentar los productos que ofrece la tienda de mascotas milmaskotas', '2021-04-07', '2021-04-29', '2021-03-03', 0, 0, 'Activo'),
(5, 'Proyecto con nuevo id', 'Este es un nuevo proyecto pero ahora la id se actualiza sola', '2021-04-10', '2021-04-12', '2021-04-09', 0, 0, 'Activo'),
(6, 'Videojuego de Unity', 'Este vieojuego debe ser compilado para ejecutarse en html5 para ser insertado en la sección recreativa de la pagina web', '2021-04-23', '2021-04-07', '2021-03-28', 0, 0, 'Activo'),
(8, 'temp', 'temp', '2021-02-17', '2021-04-14', '2021-04-13', 0, 0, 'Activo'),
(9, 'nombre', 'desc', '2021-04-30', '2021-05-07', '2021-04-19', 0, 0, 'Activo');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `proyecto_conteotareas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `proyecto_conteotareas` (
`IdProyecto` int(11)
,`totales` bigint(21)
,`terminadas` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `proyecto_tareasdone`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `proyecto_tareasdone` (
`IdProyecto` int(11)
,`conteo` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `proyecto_tareastotales`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `proyecto_tareastotales` (
`IdProyecto` int(11)
,`totales` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `proyecto_tiempoinvertido`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `proyecto_tiempoinvertido` (
`IdProyecto` int(11)
,`TiempoInvertido` double
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_wbs`
--

CREATE TABLE `proyecto_wbs` (
  `IdProyecto` int(11) NOT NULL,
  `1` int(11) NOT NULL,
  `2` int(11) NOT NULL,
  `3` int(11) NOT NULL,
  `5` int(11) NOT NULL,
  `8` int(11) NOT NULL,
  `13` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `IdRol` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`IdRol`, `nombre`) VALUES
(1, 'admin'),
(2, 'empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `IdTarea` int(11) NOT NULL,
  `nombre` varchar(2000) NOT NULL,
  `fase` varchar(500) NOT NULL,
  `dificultad` float NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `Status` varchar(500) DEFAULT NULL,
  `TiempoEstimado` float NOT NULL DEFAULT 0,
  `TiempoReal` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`IdTarea`, `nombre`, `fase`, `dificultad`, `IdProyecto`, `Status`, `TiempoEstimado`, `TiempoReal`) VALUES
<<<<<<< HEAD:cadce_test.sql
(1, 'tarea para caso 13', '1', 13, 1, 'Done', 0, 1.5),
(2, 'Segunda tarea (editada otra vez)', 'Análisis', 5, 1, 'Done', 0, 1),
(5, 'Crear diseño de boto', '1', 5, 1, NULL, 0, 0),
(9, 'otra tarea (editada)', 'Análisis', 3, 1, 'In progress', 0, 0),
=======
(1, 'tarea para caso 13', '1', 13, 1, 'Done', 0, 0),
(2, 'Segunda tarea (editada otra vez)', 'Análisis', 1, 1, NULL, 0, 0),
(5, 'Crear diseño de boto', '1', 5, 1, NULL, 0, 0),
(9, 'otra tarea (editada)', 'Análisis', 3, 1, NULL, 0, 0),
>>>>>>> Ángel/GraficaTiempoRealTiempoEstimado:cadce_test (8).sql
(10, 'dibujar iconos de la', '1', 13, 1, NULL, 0, 0),
(11, 'tarea de proyecto 1', 'Diseño', 1, 1, 'In progress', 0, 0),
(12, 'testing task', 'Pruebas', 1, 1, 'Done', 0, 0),
(13, 'Tarea para caso 5', '1', 13, 1, NULL, 0, 0),
(19, 'tarea nueva caso 3 editada otra vez 2', '1', 5, 3, NULL, 0.5, 0),
(20, 'otra tarea caso de uso caro', '1', 1, 3, NULL, 1, 0),
(21, 'crear icono de registro', '1', 1, 5, NULL, 0.5, 0),
(22, 'programar openenglish', '1', 13, 2, 'Done', 50, 0),
(23, 'tarea con wbs 2', '2', 2, 3, NULL, 0, 0),
<<<<<<< HEAD:cadce_test.sql
(24, 'tarea con fase y dificultad', 'Despliegue', 3, 1, 'Done', 0, 0),
(25, 'test 4', 'Pruebas', 8, 1, 'Done', 0, 2),
(26, 'Planear el login', 'Análisis', 1, 1, 'Done', 0, 2),
(27, 'tareaa', 'Análisis', 2, 1, 'Done', 0, 0.5);
=======
(24, 'tarea con fase y dificultad', 'Despliegue', 3, 1, NULL, 0, 0),
(25, 'test 4', 'Pruebas', 8, 1, NULL, 0, 0);
>>>>>>> Ángel/GraficaTiempoRealTiempoEstimado:cadce_test (8).sql

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_estimacion_tiempo_proyecto`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_estimacion_tiempo_proyecto` (
`IdProyecto` int(11)
,`IdCasoDeUso` int(11)
,`dificultad` float
,`TiempoTotal` double
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_proyecto_tareas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_proyecto_tareas` (
`IdProyecto` int(11)
,`nombre` varchar(200)
,`descripcion` varchar(2000)
,`fechaPlaneada` date
,`fechaLimite` date
,`fechaInicial` date
,`tiempoMax` float
,`tiempoMin` float
,`estado` varchar(20)
,`totales` bigint(21)
,`terminadas` bigint(21)
,`TiempoInvertido` double
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wbs`
--

CREATE TABLE `wbs` (
  `Dificultad` int(11) NOT NULL,
  `TiempoEstimado` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `wbs`
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
-- Estructura para la vista `airtable_view`
--
DROP TABLE IF EXISTS `airtable_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `airtable_view`  AS  select `tarea`.`IdTarea` AS `IdTarea`,`tarea`.`IdProyecto` AS `IdProyecto`,`tarea`.`nombre` AS `Tarea`,`casodeuso`.`nombre` AS `Casodeuso`,`casodeuso`.`iteracion` AS `Iteración`,`tarea`.`fase` AS `Fasededesarrollo`,`tarea`.`Status` AS `Status`,`tarea`.`TiempoReal` AS `Tiempodecompletado` from ((`tarea` join `casodeuso`) join `casodeuso_tarea`) where `tarea`.`IdTarea` = `casodeuso_tarea`.`IdTarea` and `casodeuso`.`IdCasoDeUso` = `casodeuso_tarea`.`IdCasoDeUso` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `proyecto_conteotareas`
--
DROP TABLE IF EXISTS `proyecto_conteotareas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyecto_conteotareas`  AS  select `proyecto_tareastotales`.`IdProyecto` AS `IdProyecto`,`proyecto_tareastotales`.`totales` AS `totales`,`proyecto_tareasdone`.`conteo` AS `terminadas` from (`proyecto_tareastotales` left join `proyecto_tareasdone` on(`proyecto_tareastotales`.`IdProyecto` = `proyecto_tareasdone`.`IdProyecto`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `proyecto_tareasdone`
--
DROP TABLE IF EXISTS `proyecto_tareasdone`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyecto_tareasdone`  AS  select `tarea`.`IdProyecto` AS `IdProyecto`,count(`tarea`.`IdTarea`) AS `conteo` from `tarea` where `tarea`.`Status` = 'Done' group by `tarea`.`IdProyecto` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `proyecto_tareastotales`
--
DROP TABLE IF EXISTS `proyecto_tareastotales`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyecto_tareastotales`  AS  select `tarea`.`IdProyecto` AS `IdProyecto`,count(`tarea`.`IdTarea`) AS `totales` from `tarea` group by `tarea`.`IdProyecto` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `proyecto_tiempoinvertido`
--
DROP TABLE IF EXISTS `proyecto_tiempoinvertido`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyecto_tiempoinvertido`  AS  select `tarea`.`IdProyecto` AS `IdProyecto`,sum(`tarea`.`TiempoReal`) AS `TiempoInvertido` from `tarea` group by `tarea`.`IdProyecto` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_estimacion_tiempo_proyecto`
--
DROP TABLE IF EXISTS `vista_estimacion_tiempo_proyecto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_estimacion_tiempo_proyecto`  AS  select `casodeuso`.`IdProyecto` AS `IdProyecto`,`casodeuso_tarea`.`IdCasoDeUso` AS `IdCasoDeUso`,`tarea`.`dificultad` AS `dificultad`,sum(`wbs`.`TiempoEstimado`) AS `TiempoTotal` from (((`casodeuso_tarea` join `tarea`) join `wbs`) join `casodeuso`) where `casodeuso_tarea`.`IdTarea` = `tarea`.`IdTarea` and `tarea`.`dificultad` = `wbs`.`Dificultad` and `casodeuso`.`IdCasoDeUso` = `casodeuso_tarea`.`IdCasoDeUso` group by `casodeuso`.`IdProyecto` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_proyecto_tareas`
--
DROP TABLE IF EXISTS `vista_proyecto_tareas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_proyecto_tareas`  AS  select `proyecto`.`IdProyecto` AS `IdProyecto`,`proyecto`.`nombre` AS `nombre`,`proyecto`.`descripcion` AS `descripcion`,`proyecto`.`fechaPlaneada` AS `fechaPlaneada`,`proyecto`.`fechaLimite` AS `fechaLimite`,`proyecto`.`fechaInicial` AS `fechaInicial`,`proyecto`.`tiempoMax` AS `tiempoMax`,`proyecto`.`tiempoMin` AS `tiempoMin`,`proyecto`.`estado` AS `estado`,`proyecto_conteotareas`.`totales` AS `totales`,`proyecto_conteotareas`.`terminadas` AS `terminadas`,`proyecto_tiempoinvertido`.`TiempoInvertido` AS `TiempoInvertido` from ((`proyecto` left join `proyecto_conteotareas` on(`proyecto`.`IdProyecto` = `proyecto_conteotareas`.`IdProyecto`)) left join `proyecto_tiempoinvertido` on(`proyecto_tiempoinvertido`.`IdProyecto` = `proyecto`.`IdProyecto`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `casodeuso`
--
ALTER TABLE `casodeuso`
  ADD PRIMARY KEY (`IdCasoDeUso`),
  ADD KEY `IdProyecto` (`IdProyecto`);

--
-- Indices de la tabla `casodeuso_tarea`
--
ALTER TABLE `casodeuso_tarea`
  ADD PRIMARY KEY (`IdCasoDeUso`,`IdTarea`),
  ADD KEY `IdTarea` (`IdTarea`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`IdEmpleado`),
  ADD KEY `IdRol` (`IdRol`);

--
-- Indices de la tabla `empleado_proyecto`
--
ALTER TABLE `empleado_proyecto`
  ADD PRIMARY KEY (`IdProyecto`,`IdEmpleado`),
  ADD KEY `IdEmpleado` (`IdEmpleado`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IdRol`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`IdTarea`,`dificultad`),
  ADD KEY `dificultad` (`dificultad`);

--
-- Indices de la tabla `wbs`
--
ALTER TABLE `wbs`
  ADD PRIMARY KEY (`Dificultad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `casodeuso`
--
ALTER TABLE `casodeuso`
  MODIFY `IdCasoDeUso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `IdEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `IdProyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
<<<<<<< HEAD:cadce_test.sql
  MODIFY `IdTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
=======
  MODIFY `IdTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
>>>>>>> Ángel/GraficaTiempoRealTiempoEstimado:cadce_test (8).sql

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `casodeuso`
--
ALTER TABLE `casodeuso`
  ADD CONSTRAINT `casoDeUso_ibfk_1` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`);

--
-- Filtros para la tabla `casodeuso_tarea`
--
ALTER TABLE `casodeuso_tarea`
  ADD CONSTRAINT `casoDeUso_tarea_ibfk_1` FOREIGN KEY (`IdCasoDeUso`) REFERENCES `casodeuso` (`IdCasoDeUso`),
  ADD CONSTRAINT `casoDeUso_tarea_ibfk_2` FOREIGN KEY (`IdTarea`) REFERENCES `tarea` (`IdTarea`);

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`);

--
-- Filtros para la tabla `empleado_proyecto`
--
ALTER TABLE `empleado_proyecto`
  ADD CONSTRAINT `empleado_proyecto_ibfk_1` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`),
  ADD CONSTRAINT `empleado_proyecto_ibfk_2` FOREIGN KEY (`IdEmpleado`) REFERENCES `empleado` (`IdEmpleado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
