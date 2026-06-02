const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor activo en el puerto ${port}`);
});

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error al obtener productos: ', err);
        } else {
            res.json({ products: results });
        }
    });
});

app.get('/products/:prod_id', (req, res) => {
    const productId = req.params.prod_id;
    db.query('SELECT * FROM products WHERE prod_id = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error al obtener el producto: ', err);
            res.status(500).json({ error: 'Error al obtener el producto' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            } else {
                res.json({ product: results[0] });
            }
        }
    });
});

app.post('/products', (req, res) => {
    const newProd = req.body.product;
    if ((!newProd.prod_name || newProd.prod_name.trim() === '') || newProd.prod_price < 0) {
        res.status(400).json({ error: 'Datos no válidos' });
        return;
    }
    db.query('INSERT INTO products (prod_name, prod_price, prod_desc) VALUES (?, ?, ?)', [newProd.prod_name, newProd.prod_price, newProd.prod_desc], (err, results) => {
        if (err) {
            console.error('Error al crear el producto ', err)
            res.status(500).json({ error: 'Error al crear nuevo producto' });
        } else {
            res.json({ message: 'Producto creado con éxito', product: newProd });
        }
    });
});

app.put('/products/:prod_id', (req, res) => {
    const prodId = req.params.prod_id;
    const updatedProd = req.body.product;
    if ((!updatedProd.prod_name || updatedProd.prod_name.trim() === '') || updatedProd.prod_price < 0) {
        res.status(400).json({ error: 'Datos no válidos' });
        return;
    }
    console.log('body del prodId: ', prodId);
    console.log('body del updated prod: ', updatedProd);
    db.query('UPDATE products SET prod_name = ?, prod_price = ?, prod_desc = ? WHERE prod_id = ?', [updatedProd.prod_name, updatedProd.prod_price, updatedProd.prod_desc, prodId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        } else {
            res.json({ message: 'Producto actualizado con exito', product: updatedProd });
        }
    });
});

app.delete('/products/:prod_id', (req, res) => {
    const prodId = req.params.prod_id;
    console.log('prodId: ', prodId);
    db.query('DELETE FROM products WHERE prod_id = ?', [prodId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto', err);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        } else {
            res.json({ message: 'Producto eliminado con exito' });
        }
    });
});