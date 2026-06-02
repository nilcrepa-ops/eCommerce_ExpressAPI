const url = `http://localhost:3000`;

const inputIDPost = document.getElementById('id-prod-post');
const inputPricePost = document.getElementById('precio-prod-post');
const inputDescPost = document.getElementById('desc-prod-post');
const btnGuardar = document.getElementById('btn-guardar-prod');

const inputIDPut = document.getElementById('id-prod-put');
const inputNamePut = document.getElementById('nombre-prod-put');
const inputPricePut = document.getElementById('precio-prod-put');
const inputDescPut = document.getElementById('desc-prod-put');
const btnActualizar = document.getElementById('btn-actualizar-prod');

const prodsTable = document.getElementById('tabla-prods');

async function llenarTabla() {
    prodsTable.innerHTML = `
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Descripción</th>
        <th>Acción</th>
    `;
    const data = await fetchJson(`${url}/products`);
    console.log('Data de /products', data);
    data.products.forEach((p) => {
        prodsTable.innerHTML += `
        <tbody id='product-${p.prod_id}'>
            <td>${p.prod_id}</td>
            <td>${p.prod_name}</td>
            <td>${p.prod_price} €</td>
            <td>${p.prod_desc}</td>
            <td><button id="btn-delete-prod" onclick=eliminarProd(${p.prod_id})>Eliminar</button> </td>
        </tbody>
        `; 
    });
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
}

btnGuardar.addEventListener('click', function () {
    const apiUrl = `${url}/products`;
    const prodData =
    {
        product: {
            prod_name: inputIDPost.value,
            prod_price: inputPricePost.value,
            prod_desc: inputDescPost.value
        }
    };
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prodData)
    })
        .then((response) => {
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log('Producto agregado con éxito', data);
            alert('Producto agregado con éxito.');
        })
        .catch((error) => {
            console.error('Error al agregar el producto:', error);
            alert('Error al agregar el producto');
        });
});

btnActualizar.addEventListener('click', function () {
    const apiUrl = `${url}/products/${inputIDPut.value}`;
    const prodToPut =
    {
        product: {
            prod_id: inputIDPut.value,
            prod_name: inputNamePut.value,
            prod_price: inputPricePut.value,
            prod_desc: inputDescPut.value
        }
    }
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prodToPut)
    })
        .then((response) => {
            if (!response.ok) throw new Error(`Error en la solicitud ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log('Producto actualizado con exito', data);
            alert('Producto actualizado con exito');
        })
        .catch((error) => {
            console.error('Error al actualizar el producto:', error);
            alert('Error al actualizar el producto');
        });
});

function eliminarProd(prod_id) {
    const apiUrl = `${url}/products/${prod_id}`;
    console.log('apiURL: ', apiUrl);

    if (!confirmarDelete()) {
        return;
    }

    fetch(apiUrl, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) throw new Error(`Error en la solicitud ${response.status}`);
        })
        .then((data) => {
            console.log('Producto eliminado con éxito', data);
            alert('Producto eliminado con éxito');
            const producto = document.getElementById(`product-${prod_id}`);
            producto.remove();
        })
        .catch((error) => {
            console.error('Error al eliminar producto', error);
            alert('Error al eliminar producto');
        });
}

function confirmarDelete() {
    let confirmado = false;
    let respuesta = confirm('¿Seguro que quieres eliminar el producto?');

    if (respuesta) {
        confirmado = true;
    } else {
        console.log('Cancelado');
    }
    return confirmado;
}

window.onload = llenarTabla;
