const mysql = require('mysql2');

//conexion con BBDD
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apiexpress'
});