SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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

CREATE TABLE casodeuso (
  IdCasoDeUso int(11) NOT NULL,
  nombre varchar(200) NOT NULL,
  descripcion varchar(2000) DEFAULT NULL,
  IdProyecto int(11) NOT NULL,
  dificultad float NOT NULL,
  iteracion float DEFAULT NULL,
  Status varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO casodeuso (IdCasoDeUso, nombre, descripcion, IdProyecto, dificultad, iteracion, `Status`) VALUES
(1, 'iniciar sesion', 'Crear el login de la herramienta digital', 1, 1, 3, ''),
(2, 'Agregar producto', 'Agregar producto que vende la tienda', 2, 5, 1, ''),
(3, 'Cerrar sesion', 'Logout de la sesion', 1, 13, 3, ''),
(5, 'Login del sistema', 'Este caso de uso es el login del sistema', 1, 13, 1, ''),
(7, 'Registrarse en la plataforma', 'El usuario debe poder crear una cuenta con su correo institucional', 5, 13, 1, NULL),
(9, 'Prueba para demostración', 'descripción de prueba 2', 1, 0, 2, NULL),
(12, '23', '23', 3, 0, 2, NULL),
(14, 'caso de uso para temp', 'descripcion para temp', 8, 0, 1, NULL),
(15, 'temp', 'descripcion para temp', 9, 0, 1, NULL);

CREATE TABLE casodeuso_tarea (
  IdCasoDeUso int(11) NOT NULL,
  IdTarea int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO casodeuso_tarea (IdCasoDeUso, IdTarea) VALUES
(1, 2),
(1, 9),
(1, 11),
(1, 12),
(1, 24),
(2, 22),
(3, 27),
(5, 30),
(5, 31),
(7, 21),
(9, 26),
(12, 36),
(14, 29);

CREATE TABLE empleado (
  IdEmpleado int(11) NOT NULL,
  nombre varchar(30) NOT NULL,
  apellidos varchar(30) NOT NULL,
  correo varchar(30) NOT NULL,
  contraseña varchar(200) NOT NULL,
  IdRol int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO empleado (IdEmpleado, nombre, apellidos, correo, contraseña, IdRol) VALUES
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

CREATE TABLE iteracion (
  iteracion int(11) NOT NULL,
  IdProyecto int(11) NOT NULL,
  FechaFinalizacion date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO iteracion (iteracion, IdProyecto, FechaFinalizacion) VALUES
(1, 1, '2021-04-30'),
(1, 2, '2021-04-29'),
(1, 3, '2021-04-27'),
(1, 5, '2021-04-24'),
(1, 6, '2021-04-29'),
(1, 8, '2021-05-08'),
(1, 9, '2021-04-30'),
(2, 1, '2021-04-24'),
(2, 3, '2021-04-23'),
(3, 1, '2021-05-05');

CREATE TABLE proyecto (
  IdProyecto int(11) NOT NULL,
  nombre varchar(200) NOT NULL,
  descripcion varchar(2000) DEFAULT NULL,
  fechaPlaneada date DEFAULT NULL,
  fechaLimite date DEFAULT NULL,
  fechaInicial date DEFAULT NULL,
  estado varchar(20) NOT NULL,
  apiKey varchar(500) DEFAULT 'Insertar la llave api para este proyecto',
  tableKey varchar(500) DEFAULT 'Insertar la clave de la tabla para este proyecto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO proyecto (IdProyecto, nombre, descripcion, fechaPlaneada, fechaLimite, fechaInicial, estado, apiKey, tableKey) VALUES
(1, 'Administrador de proyectos natdev', 'Desarrollo de una aplicación para administrar proyectos dentro de nadtdev ', '2021-03-27', '2021-04-03', '2021-03-09', 'Activo', 'keyIytlxEjOWlvP1H', 'appfHD8Ikbtk78MrM'),
(2, 'Aplicación para aprender ingles', 'Desarrollo de aplicación de ingles para openenglish ', '2021-03-02', '2021-03-09', '2021-03-25', 'Finalizado', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto'),
(3, 'Pagina web, tienda de mascotas', 'Creación de una pagina web para presentar los productos que ofrece la tienda de mascotas milmaskotas', '2021-04-07', '2021-04-29', '2021-03-03', 'Activo', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto'),
(5, 'Proyecto con nuevo id', 'Este es un nuevo proyecto pero ahora la id se actualiza sola', '2021-04-10', '2021-04-12', '2021-04-09', 'Activo', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto'),
(6, 'Videojuego de Unity', 'Este vieojuego debe ser compilado para ejecutarse en html5 para ser insertado en la sección recreativa de la pagina web', '2021-04-23', '2021-04-07', '2021-03-28', 'Activo', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto'),
(8, 'temp', 'temp', '2021-02-17', '2021-04-14', '2021-04-13', 'Activo', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto'),
(9, 'nombre', 'desc', '2021-04-30', '2021-05-07', '2021-04-19', 'Finalizado', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto'),
(10, 'gcloud', 'gcloud', '2021-04-07', '2021-04-22', '2021-04-05', 'Activo', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto'),
(11, 's editado', 's ediy', '2021-04-30', '2021-05-08', '2021-05-01', 'Activo', 'Insertar la llave api para este proyecto', 'Insertar la clave de la tabla para este proyecto');
CREATE TABLE `proyecto_conteotareas` (
`IdProyecto` int(11)
,`totales` bigint(21)
,`terminadas` bigint(21)
);
CREATE TABLE `proyecto_tareasdone` (
`IdProyecto` int(11)
,`conteo` bigint(21)
);
CREATE TABLE `proyecto_tareastotales` (
`IdProyecto` int(11)
,`totales` bigint(21)
);
CREATE TABLE `proyecto_tiempoinvertido` (
`IdProyecto` int(11)
,`TiempoInvertido` double
);

CREATE TABLE rol (
  IdRol int(11) NOT NULL,
  nombre varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO rol (IdRol, nombre) VALUES
(1, 'admin'),
(2, 'empleado');

CREATE TABLE tarea (
  IdTarea int(11) NOT NULL,
  nombre varchar(2000) NOT NULL,
  fase varchar(500) NOT NULL,
  dificultad float NOT NULL,
  IdProyecto int(11) NOT NULL,
  Status varchar(500) DEFAULT NULL,
  TiempoReal float NOT NULL DEFAULT 0,
  FechaFinalizacion date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tarea (IdTarea, nombre, fase, dificultad, IdProyecto, `Status`, TiempoReal, FechaFinalizacion) VALUES
(2, 'Tarea modificada (airtable) 2', 'Análisis', 1, 1, 'Done', 1, '2021-04-28'),
(5, 'Crear diseño de boto', '1', 5, 1, NULL, 0, NULL),
(9, 'otra tarea (editada)', 'Análisis', 3, 1, 'In progress', 2, NULL),
(10, 'dibujar iconos de la', '1', 13, 1, NULL, 0, NULL),
(11, 'tarea de proyecto 1', 'Análisis', 3, 1, 'In progress', 0, NULL),
(12, 'testing task', 'Pruebas', 1, 1, 'In progress', 0, NULL),
(13, 'Tarea para caso 5', '1', 13, 1, NULL, 0, NULL),
(20, 'otra tarea caso de uso caro', '1', 1, 3, 'Done', 0, NULL),
(21, 'crear icono de registro', '1', 1, 5, NULL, 0, NULL),
(22, 'programar openenglish', '1', 13, 2, 'Done', 0, NULL),
(24, 'tarea con fase y dificultad', 'Despliegue', 3, 1, 'Done', 10, '2021-04-28'),
(26, 'Planear el login', 'Análisis', 1, 1, 'Done', 2, '2021-04-28'),
(27, 'tareaa', 'Análisis', 2, 1, 'Done', 0.5, '2021-04-28'),
(28, 'si', 'Análisis', 1, 3, NULL, 0, NULL),
(29, 'tarea si', 'Implementación', 5, 8, NULL, 0, NULL),
(30, 'Diseñar botones del login', 'Diseño', 3, 1, 'Done', 0, '2021-04-28'),
(31, 'Implementar login', 'Análisis', 1, 1, 'Done', 0, '2021-04-28'),
(36, 's', 'Análisis', 1, 3, NULL, 0, NULL);
CREATE TABLE `vista_estimacion_tiempo_proyecto` (
`IdProyecto` int(11)
,`IdCasoDeUso` int(11)
,`dificultad` float
,`TiempoTotal` double
);
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

CREATE TABLE wbs (
  Dificultad int(11) NOT NULL,
  TiempoEstimado float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO wbs (Dificultad, TiempoEstimado) VALUES
(1, 0.5),
(2, 2),
(3, 3),
(5, 4),
(8, 5),
(13, 10);
DROP TABLE IF EXISTS `airtable_view`;

CREATE ALGORITHM=UNDEFINED DEFINER= CURRENT_USER SQL SECURITY DEFINER VIEW airtable_view  AS  select tarea.IdTarea AS IdTarea,tarea.IdProyecto AS IdProyecto,tarea.nombre AS Tarea,casodeuso.nombre AS Casodeuso,casodeuso.iteracion AS Iteración,tarea.fase AS Fasededesarrollo,tarea.`Status` AS `Status`,tarea.TiempoReal AS Tiempodecompletado from ((tarea join casodeuso) join casodeuso_tarea) where tarea.IdTarea = casodeuso_tarea.IdTarea and casodeuso.IdCasoDeUso = casodeuso_tarea.IdCasoDeUso ;
DROP TABLE IF EXISTS `proyecto_conteotareas`;

CREATE ALGORITHM=UNDEFINED DEFINER= CURRENT_USER SQL SECURITY DEFINER VIEW proyecto_conteotareas  AS  select proyecto_tareastotales.IdProyecto AS IdProyecto,proyecto_tareastotales.totales AS totales,proyecto_tareasdone.conteo AS terminadas from (proyecto_tareastotales left join proyecto_tareasdone on(proyecto_tareastotales.IdProyecto = proyecto_tareasdone.IdProyecto)) ;
DROP TABLE IF EXISTS `proyecto_tareasdone`;

CREATE ALGORITHM=UNDEFINED DEFINER= CURRENT_USER SQL SECURITY DEFINER VIEW proyecto_tareasdone  AS  select tarea.IdProyecto AS IdProyecto,count(tarea.IdTarea) AS conteo from tarea where tarea.`Status` = 'Done' group by tarea.IdProyecto ;
DROP TABLE IF EXISTS `proyecto_tareastotales`;

CREATE ALGORITHM=UNDEFINED DEFINER= CURRENT_USER SQL SECURITY DEFINER VIEW proyecto_tareastotales  AS  select tarea.IdProyecto AS IdProyecto,count(tarea.IdTarea) AS totales from tarea group by tarea.IdProyecto ;
DROP TABLE IF EXISTS `proyecto_tiempoinvertido`;

CREATE ALGORITHM=UNDEFINED DEFINER= CURRENT_USER SQL SECURITY DEFINER VIEW proyecto_tiempoinvertido  AS  select tarea.IdProyecto AS IdProyecto,sum(tarea.TiempoReal) AS TiempoInvertido from tarea group by tarea.IdProyecto ;
DROP TABLE IF EXISTS `vista_estimacion_tiempo_proyecto`;

CREATE ALGORITHM=UNDEFINED DEFINER= CURRENT_USER SQL SECURITY DEFINER VIEW vista_estimacion_tiempo_proyecto  AS  select casodeuso.IdProyecto AS IdProyecto,casodeuso_tarea.IdCasoDeUso AS IdCasoDeUso,tarea.dificultad AS dificultad,sum(wbs.TiempoEstimado) AS TiempoTotal from (((casodeuso_tarea join tarea) join wbs) join casodeuso) where casodeuso_tarea.IdTarea = tarea.IdTarea and tarea.dificultad = wbs.Dificultad and casodeuso.IdCasoDeUso = casodeuso_tarea.IdCasoDeUso group by casodeuso.IdProyecto ;
DROP TABLE IF EXISTS `vista_proyecto_tareas`;

CREATE ALGORITHM=UNDEFINED DEFINER= CURRENT_USER SQL SECURITY DEFINER VIEW vista_proyecto_tareas  AS  select proyecto.IdProyecto AS IdProyecto,proyecto.nombre AS nombre,proyecto.descripcion AS descripcion,proyecto.fechaPlaneada AS fechaPlaneada,proyecto.fechaLimite AS fechaLimite,proyecto.fechaInicial AS fechaInicial,proyecto.estado AS estado,proyecto_conteotareas.totales AS totales,proyecto_conteotareas.terminadas AS terminadas,proyecto_tiempoinvertido.TiempoInvertido AS TiempoInvertido from ((proyecto left join proyecto_conteotareas on(proyecto.IdProyecto = proyecto_conteotareas.IdProyecto)) left join proyecto_tiempoinvertido on(proyecto_tiempoinvertido.IdProyecto = proyecto.IdProyecto)) ;


ALTER TABLE casodeuso
  ADD PRIMARY KEY (IdCasoDeUso),
  ADD KEY IdProyecto (IdProyecto);

ALTER TABLE casodeuso_tarea
  ADD PRIMARY KEY (IdCasoDeUso,IdTarea),
  ADD KEY IdTarea (IdTarea);

ALTER TABLE empleado
  ADD PRIMARY KEY (IdEmpleado),
  ADD KEY IdRol (IdRol);

ALTER TABLE iteracion
  ADD PRIMARY KEY (iteracion,IdProyecto);

ALTER TABLE proyecto
  ADD PRIMARY KEY (IdProyecto);

ALTER TABLE rol
  ADD PRIMARY KEY (IdRol);

ALTER TABLE tarea
  ADD PRIMARY KEY (IdTarea,dificultad),
  ADD KEY dificultad (dificultad);

ALTER TABLE wbs
  ADD PRIMARY KEY (Dificultad);


ALTER TABLE casodeuso
  MODIFY IdCasoDeUso int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

ALTER TABLE empleado
  MODIFY IdEmpleado int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE proyecto
  MODIFY IdProyecto int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE tarea
  MODIFY IdTarea int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;


ALTER TABLE casodeuso
  ADD CONSTRAINT casoDeUso_ibfk_1 FOREIGN KEY (IdProyecto) REFERENCES proyecto (IdProyecto);

ALTER TABLE casodeuso_tarea
  ADD CONSTRAINT casoDeUso_tarea_ibfk_1 FOREIGN KEY (IdCasoDeUso) REFERENCES casodeuso (IdCasoDeUso),
  ADD CONSTRAINT casoDeUso_tarea_ibfk_2 FOREIGN KEY (IdTarea) REFERENCES tarea (IdTarea);

ALTER TABLE empleado
  ADD CONSTRAINT empleado_ibfk_1 FOREIGN KEY (IdRol) REFERENCES rol (IdRol);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
