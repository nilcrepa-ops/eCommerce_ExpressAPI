const express = require('express');
const db = require('./db');
const app = express();
const port = 3000

//Hola mundo en http://localhost:3000
app.get('/', (req, res) => {
    res.send('hola mundo');
});

//Comprobar que el servidor este activo
app.listen(3000, () => {
    console.log(`Servidor activo en el puerto ${port}`);
});

//GET todos los productos - funciona

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

//GET de un producto



//POST de un producto



//PUT de un producto



//DELETE de un producto
