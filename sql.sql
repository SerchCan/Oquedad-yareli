CREATE DATABASE yareli3_project;
USE yareli3_project;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `yareli3_project`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `major`
--

CREATE TABLE `major` (
  `ID_M` int(11) NOT NULL,
  `Major` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `major`
--

INSERT INTO `major` (`ID_M`, `Major`) VALUES
(1, 'Ingeniería en Telemática'),
(2, 'IDeIO'),
(3, 'Ingeniería Industrial'),
(4, 'Ingeniería Ambiental'),
(5, 'Ingeniería en logistica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periods`
--

CREATE TABLE `periods` (
  `ID_PER` int(11) NOT NULL,
  `Period` varchar(11) NOT NULL,
  `Year` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `periods`
--

INSERT INTO `periods` (`ID_PER`, `Period`, `Year`) VALUES
(1, 'Primavera', 2017),
(2, 'Verano', 2017),
(3, 'Otoño', 2017),
(4, 'Primavera', 2018),
(5, 'Verano', 2018),
(6, 'Otoño', 2018);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pivot`
--

CREATE TABLE `pivot` (
  `ID_PIV` int(11) NOT NULL,
  `ID_U` int(11) NOT NULL,
  `ID_P` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects`
--

CREATE TABLE `projects` (
  `ID_P` int(11) NOT NULL,
  `Title` varchar(150) NOT NULL,
  `Description` varchar(500) NOT NULL,
  `Image` varchar(5000) NOT NULL,
  `Creation` date NOT NULL,
  `File` varchar(5000) NOT NULL,
  `Adviser` int(11) NOT NULL,
  `ID_M` int(11) NOT NULL,
  `ID_PER` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID_U` int(11) NOT NULL,
  `Mail` varchar(150) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `Salt` int(11) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `LastName` varchar(150) NOT NULL,
  `Date` date NOT NULL,
  `Type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_types`
--

CREATE TABLE `user_types` (
  `ID_T` int(11) NOT NULL,
  `TYPE` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user_types`
--

INSERT INTO `user_types` (`ID_T`, `TYPE`) VALUES
(1, 'Alumno'),
(2, 'Asesor'),
(3, 'Administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `major`
--
ALTER TABLE `major`
  ADD PRIMARY KEY (`ID_M`);

--
-- Indices de la tabla `periods`
--
ALTER TABLE `periods`
  ADD PRIMARY KEY (`ID_PER`);

--
-- Indices de la tabla `pivot`
--
ALTER TABLE `pivot`
  ADD PRIMARY KEY (`ID_PIV`),
  ADD KEY `ID_U` (`ID_U`),
  ADD KEY `ID_P` (`ID_P`);

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`ID_P`),
  ADD KEY `Adviser` (`Adviser`),
  ADD KEY `ID_M` (`ID_M`),
  ADD KEY `ID_PER` (`ID_PER`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_U`),
  ADD KEY `Type` (`Type`);

--
-- Indices de la tabla `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`ID_T`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `major`
--
ALTER TABLE `major`
  MODIFY `ID_M` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `periods`
--
ALTER TABLE `periods`
  MODIFY `ID_PER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `pivot`
--
ALTER TABLE `pivot`
  MODIFY `ID_PIV` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `projects`
--
ALTER TABLE `projects`
  MODIFY `ID_P` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID_U` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `user_types`
--
ALTER TABLE `user_types`
  MODIFY `ID_T` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pivot`
--
ALTER TABLE `pivot`
  ADD CONSTRAINT `pivot_ibfk_1` FOREIGN KEY (`ID_U`) REFERENCES `users` (`ID_U`),
  ADD CONSTRAINT `pivot_ibfk_2` FOREIGN KEY (`ID_P`) REFERENCES `projects` (`ID_P`);

--
-- Filtros para la tabla `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`Adviser`) REFERENCES `users` (`ID_U`),
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`ID_M`) REFERENCES `major` (`ID_M`),
  ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`ID_PER`) REFERENCES `periods` (`ID_PER`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `user_types` (`ID_T`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
