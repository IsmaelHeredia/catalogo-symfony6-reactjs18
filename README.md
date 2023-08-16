# Catálogo de productos en PHP

Es un programa que funciona como catalogo de productos en PHP, esta hecho en Symfony 6 como Rest API con MySQL y ReactJS 18 como frontend.

Se puede cargar productos con fotos y categorias con iconos, tambien tiene una sección donde se muestran los productos y categorias a los 
visitantes y una sección de administración para gestionar los productos y categorias.

Unas imágenes : 

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdZv_QBRKlGaUa6RsUVBwohizuTHo9QVHgPw_JoDvYA6nCHI3lRvIgA9evZr8Pam_yox9l8QW2sGBfflk92EHqkzjOMxnkw-cY49K6DoSjHiATPBgKqq7v-fBSrfudfXn051uSUICLVeXLUGJiQiQiA3dvtQh9x1YU3dYpJ-2BJzpSL2ROhgR5jfzAaYs/s633/cat1.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgUxmPTzEI51bEE_sxeMybGNVmtwpo_CxPxIDDzwndfVJErNK2Ov0jYQ41ov9BWGulhS-OqlCcyeapdgC4rn9Up_dELU7RKe_u5tzn0VfeDJiiquSXO_jxsgeQTKke0eLQ9CcjR1f8Pk9C_dC4XDKartgrV60jDzCAcojSWL-89Vjtot8D66wh12cLqPCA/s1900/cat2.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnehK7cAwaY_RmNJZfWzxczXYt1dsOomftfBsIJmMB7mseOoE73WGUmsoVEqn0Afc8lapa8yDyGQT30SaZ9QdijEHcK-FZ2f4KMjpnHxGAyd2XxyZS6Kart5FFel6WByO6jd5D09pqfLFO2lwNQF31YW4qwshdarypuT_KLDAQNM0qhU2Vi0L8zZEL-Jw/s1901/cat3.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGIU0OBaBRVy3Cylu_Et36JM-cquqbjdVAVTXzPqlKBbxcV2baRpBAHfNp-pg2oHYJiZ3fsFY_hwrV4FKn__FcRuF2iy6vtUVHFTyRoUy6NaySoT0jm3wNG8DDgbwDXieuobV98ehIYEvJNreE1G_VMk-uWd3jSQBVInRj3QRpt7_B3Pgs58hfNERWXNo/s1919/cat4.png)

Para instalar el programa se debe clonar el proyecto en el directorio que quieran y en el caso del backend se deben ejecutar los siguientes comandos : 

```
composer install

php bin/console doctrine:database:create
php bin/console make:migration
php bin/console doctrine:migrations:migrate

php -S localhost:3000 -t public
```

Tambien se debe editar el archivo .env en la siguiente seccion con sus respectivos datos del servidor MySQL

```
# DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7"
```

Despues deben modificar el SECRET_KEY por la clave que quieran para el uso de JWT como metodo para una autentificación segura.

Ademas en el mismo directorio del backend hay un archivo llamado bd_catalogo.sql que deben correr para instalar los datos por defecto, el usuario y la contraseña seran
supervisor.

Para la parte del frontend, tiene que ejecutar los siguientes comandos : 

```
npm install
npm run dev
```
