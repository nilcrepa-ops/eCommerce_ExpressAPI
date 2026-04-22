//TODO: Crear constante de boton eliminar (creado desde js) y añadir DELETE

const url = `http://localhost:3000`;

//Elementos para insertar
const inputIDPost = document.getElementById('id-prod-post');
const inputPricePost = document.getElementById('precio-prod-post');
const inputDescPost = document.getElementById('desc-prod-post');
const btnGuardar = document.getElementById('btn-guardar-prod');

//Elementos para actualizar
const inputIDPut = document.getElementById('id-prod-put');
const inputNamePut = document.getElementById('nombre-prod-put');
const inputPricePut = document.getElementById('precio-prod-put');
const inputDescPut = document.getElementById('desc-prod-put');
const btnActualizar = document.getElementById('btn-actualizar-prod');

//Tabla de productos y boton de eliminar
const prodsTable = document.getElementById('tabla-prods');
//Añadir constante con boton eliminar

//Rellena tabla con los datos de la BBDD
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
    //Extraemos la info de cada posicion
    data.products.forEach((p) => {
        console.log('ID de cada producto FOREACH', p.prod_id);
        console.log('Nombre de cada producto FOREACH', p.prod_name);
        console.log('Precio de cada producto FOREACH', p.prod_price);
        console.log('Descripción de cada producto FOREACH', p.prod_desc);

        prodsTable.innerHTML += `
            <td>${p.prod_id}</td>
            <td>${p.prod_name}</td>
            <td>${p.prod_price} €</td>
            <td>${p.prod_desc}</td>
            <td><button id="btn-delete-prod">Eliminar</button> </td>
        `;
    });
}



//Llamada a la API
async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
}
/*Funcion para testear la recepcion de datos de la bbdd en el endpoint /products
async function recibirData(){
    const data = await fetchJson(`${url}/products/1`);
    console.log('Data de /products', data);
}
btnGuardarPost.addEventListener('click', recibirData);*/

//Insertar producto nuevo

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

//Modificar producto

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

//Eliminar producto







window.onload = llenarTabla;
