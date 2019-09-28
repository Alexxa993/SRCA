CREATE TABLE IF NOT EXISTS `s_component` (

`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
`component_id` varchar (25),
`description` varchar (255),
`emails` varchar (255)

)ENGINE=InnoDB DEFAULT CHARSET=UTF8;