const mysql = require('mysql2');
const dotenv = require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

//conexion con BBDD - TODO: Usar usuario creado en phpmyadmin y .env para credenciales
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


connection.connect(error => {
    if(error) throw error;
    console.log('Conexión exitosa a la BBDD');
});

module.exports = connection;

