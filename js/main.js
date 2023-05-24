function ValidarFormulario(e) {
    e.preventDefault();
    let fecha = new Date();
    alert("Consulta enviada el día " + fecha);
}

let boton = document.getElementById("miBoton");
boton.addEventListener("click", ValidarFormulario);


function capturarEnter(e) {
    if (e.keyCode == 13 || e.which == 13) {
        console.log("Enter detectado!");
    }
}

/* Selectores */
const listaProductos = document.querySelector('#lista-productos');
const tableCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito = [];

/* Listeners */
listaProductos.addEventListener('click', agregarProducto);
tableCarrito.addEventListener('click', borrarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
document.addEventListener('DOMContentLoaded', () => {

    if (JSON.parse(localStorage.getItem('carrito'))) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        insertarCarritoHTML();
    }
});

function vaciarCarrito() {
    carrito = [];
    insertarCarritoHTML();
}


function borrarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar-producto")) {
        
        const productoId = e.target.getAttribute('data-id');
        carrito = carrito.filter(producto => producto.id !== productoId);
        insertarCarritoHTML();
    }
}

function agregarProducto(e) {
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){ 
        const cardProducto = e.target.parentElement.parentElement;
        
        obtenerDatosProducto(cardProducto);
    }
}

function obtenerDatosProducto(cardProducto) {

    const productoAgregado = {
        imagen: cardProducto.querySelector('img').src,
        nombre: cardProducto.querySelector('h5').textContent,
        precio: cardProducto.querySelector('.precio').textContent,
        cantidad: 1,
        id: cardProducto.querySelector('a').getAttribute('data-id')
    }
   
    const existe = carrito.some(producto => producto.id === productoAgregado.id);

    if (existe) {
        const productos = carrito.map(producto => {
            if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                producto.precio = `$${Number(productoAgregado.precio.slice(1)) * producto.cantidad}`
            } else {
            }
            return producto;
        });
        carrito = [...productos];
    } else {
        carrito = [...carrito, productoAgregado];
    }

   insertarCarritoHTML();
}

function insertarCarritoHTML() {

    borrarCarritoHTML();

    carrito.forEach(producto => {
        /* Destructuring de objetos */
        const { imagen, nombre, precio, cantidad, id } = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width='100%'>
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${id}">X</a>
        </td>
        `
        tableCarrito.appendChild(row);
    });
    guardarCarritoStorage();
}

function borrarCarritoHTML() {

    while (tableCarrito.firstChild) {
        tableCarrito.removeChild(tableCarrito.firstChild);
    }
}

function guardarCarritoStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}







/* function saludar(){
	respuesta = prompt ("Enter your age: ");
	if (respuesta >= 18){
		alert ("Welcome to G.O.A.T! The best online shoe store.");
	} else {
		alert("Adult supervision is recommended!")
	}
}

saludar () */

function saludar(){
	respuesta = prompt ("Enter your age: ");
	if (respuesta >= 18){
		Swal.fire({
            title: 'Welcome to G.O.A.T.! The best online shoe store.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
	} else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Must be over 18 years old.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Welcome to G.O.A.T! The best online shoe store.',
                'Adult supervision is recommended!',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Thank you for understanding our policy.',
                'G.O.A.T.',
                'error'
              )
            }
          })
	}
}

saludar ()

/* Finalizar proceso de compra*/
let a = document.getElementById("continuar");
a.onclick = finalizarCompra

function finalizarCompra(evento){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: "You are about to make a purchase.",
        text: "Please confirm",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Thank you for buying with us!',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'You have canceled the purchase',
            'We have keeped the products in the chart for you.',
            'error'
          )
        }
      })
}
   