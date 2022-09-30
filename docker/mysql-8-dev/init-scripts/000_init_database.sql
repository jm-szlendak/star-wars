CREATE DATABASE IF NOT EXISTS star_wars;

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'secret';
FlUSH PRIVILEGES;

USE star_wars;
