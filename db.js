const mysql = require('mysql2');

//conexion con BBDD
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apiexpress'
});

connection.connect(error => {
    if(error) throw error;
    console.log('Conexión exitosa a la BBDD');
});

module.exports = connection;

