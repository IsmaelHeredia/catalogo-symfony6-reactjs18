insert into user_type(name) 
	values('Administrador');

insert into user_type(name) 
	values('Usuario');

insert into user(username,password,email,user_type_id) 
	values('supervisor','$2y$10$JJ4fPddDwBzSfuTQM8ZWBu2uxrX6wpwR0prP37zys2nOIwPPO/zTq','supervisor@localhost.com',1);

insert into category(name,icon) 
	values('Panificados','panificados.jpg');

insert into category(name,icon) 
	values('Cafetería','cafetería.jpg');

insert into category(name,icon) 
	values('Pastelería','pasteleria.jpg');

insert into category(name,icon) 
	values('Salados','salados.jpg');

insert into category(name,icon) 
	values('Línea nutricional','chalitas.jpg');

insert into product(name,description,price,image,category) 
	values('Pan casero','Pan casero',600,'pan_casero.jpg',1);

insert into product(name,description,price,image,category) 
	values('Criollos','Criollos',300,'criollos.jpg',1);

insert into product(name,description,price,image,category) 
	values('Facturas','Facturas',800,'facturas.jpg',1);

insert into product(name,description,price,image,category) 
	values('Café con leche','Café con leche',400,'cafe_leche.jpg',2);

insert into product(name,description,price,image,category) 
	values('Mate cocido','Mate cocido',500,'mate_cocido.jpg',2);

insert into product(name,description,price,image,category) 
	values('Chalitas','Chalitas',100,'chalitas.jpg',5);
