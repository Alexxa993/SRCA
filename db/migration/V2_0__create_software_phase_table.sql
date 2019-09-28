CREATE TABLE IF NOT EXISTS `s_phase` (

`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
`name` varchar (25),
`date_from` DATE,
`date_to` DATE,
`requirements` varchar (255),
`cmp_id` int,
FOREIGN KEY (cmp_id) REFERENCES s_component(id)

)ENGINE=InnoDB DEFAULT CHARSET=UTF8;