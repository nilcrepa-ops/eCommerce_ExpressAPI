const express = require('express');
const app = express();

//Hola mundo en http://localhost:3000
app.get('/', (req, res) => {
    res.send('hola mundo');
});

//Comprobar que el servidor este activo
app.listen(3000, () => {
    console.log('Servidor activo');
});

//GET todos los productos



//GET de un producto



//POST de un producto



//PUT de un producto



//DELETE de un producto
