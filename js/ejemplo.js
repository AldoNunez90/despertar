
const productos = document.getElementById('productosVenta');
const subtotal = document.getElementById('subtotal');
let carrito = {}

let listaProductos = ''
const cargarProductos = data => {
    data.forEach(item => {
        listaProductos +=
            `<div class="col-3 productosParaVender" id="productosMostrados">
            <img src="${item.imagen}" alt="${item.preparacion}"  class="itemImg mb-2" id="itemImg${item.id}}">
            <div>
            <h5 class="itemPreparacion">${item.preparacion}</h5>
            <h5 class="precio">$ <span class="itemPrecio">${item.precio}</span></h5>
            <p class="itemSabor mb-2"> ${item.sabor}</p>
            <p class="itemPresentacion mb-2"> ${item.presentacion}</p> 
            <button class="agregar" id="${item.id}">Agregar</button>
            </div> 
            </div>`
    });
    $('.productosVenta').append(listaProductos);
};

const cardsProductos = async () => {
    try {
        const JSONData = await fetch('../json/productos.json')
        const data = await JSONData.json()
        cargarProductos(data);
    } catch (error) {
        alert('error en la carga')
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cardsProductos()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        armarCarrito()
    }
});

productosMostrados.addEventListener('click', e => {
    agregarAlCarrito(e)
});

const agregarAlCarrito = e => {
    if (e.target.classList.contains("agregar")) {
        actualizarCarrito(e.target.parentElement)

    }
    e.stopPropagation()
};

const actualizarCarrito = objeto => {
    let id = objeto.querySelector('.agregar').id;
    let preparacion = objeto.querySelector('.itemPreparacion').innerText;
    let precio = objeto.querySelector('.itemPrecio').innerText;
    let cantidad = 1;


    if (carrito.hasOwnProperty(id)) {
        cantidad = carrito[id].cantidad + 1
    }

    carrito[id] = { id, preparacion, precio, cantidad }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    armarCarrito()
};

function armarCarrito() {
    
    let arraycarrito = Object.values(carrito)
    let resumenCarrito = document.createElement('div')
    let contenido = ''
    arraycarrito.forEach(producto=> {
        
        contenido +=`
                <div class="resumenCarrito ms-2">
                <div class="detalles col-4"><h5 class="preparacion">${producto.preparacion}</h5></div>
                <div class="col-4"><h5 class="precioCarrito">$ ${producto.precio}</h5></div>
                <div class="inputsCarrito col-4"><input class="cantidadSolicitada" min="1" type="number" value="${producto.cantidad}">
                </div>
                </div>`
    })
    resumenCarrito.innerHTML = contenido
    $('#detalles').html(resumenCarrito.innerHTML)

    armarSubtotal()

}

function armarSubtotal() {
    subtotal.innerHTML = ''
    if (Object.keys(carrito) === 0) {
        subtotal.innerHTML = `
        <div id="subtotal">
      Carrito vacÃ­o !
    </div>
        `
        return;
    } else {


        let total = 0;
        let cargadoEnJson = JSON.parse(localStorage.getItem('carrito'))
        let arrayJson = Object.values(cargadoEnJson)

        arrayJson.forEach(elemento => {
            let itemPrecio = elemento.precio;
            let precio = parseInt(itemPrecio)
            let cantidadSolicitada = elemento.cantidad;
            total = total + precio * cantidadSolicitada;
        })
        $('#subtotal').text(`Subtotal: $${total}`)
        $('#subtotal').append('<button class="mb-1 mt-2 btn btn-danger quitarProductoBtn" id="quitar" type="button">Cancelar compra</button>')
        $('#subtotal').append('<button class="mb-1 mt-2 btn btn-success finalizarCompraBtn" id="quitar" type="button">Finalizar compra</button>')
        
        
        let borrar = document.querySelector('.btn-danger')
        borrar.addEventListener('click', eliminarItem)


        let URL = "https://jsonplaceholder.typicode.com/posts"
        let infoPost = carrito
        $('.finalizarCompraBtn').click(()=> { 
            $.post(URL, infoPost ,(respuesta, estado) => {
                if(estado === "success"){
                    alert('Gracias por su compra!')
                    $('#detalles').empty();
                    carrito = {}
                    localStorage.setItem('carrito', carrito)
                    armarSubtotal()
                }  else {
                    alert('error al enviar el pedido')
                }
            });
        })
        }
}

function eliminarItem(event) {
    $('#detalles').empty();
    carrito = {}
    localStorage.setItem('carrito', carrito)
    armarSubtotal()
}

function finalizarCompra(e) {
    
    const resumenPost = carrito
    console.log(resumenPost)
}