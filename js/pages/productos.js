import { productos } from './../bbdd.js';

//Agregando productos al HTML
const allProducts = document.querySelector("#todos-productos");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto")
    div.innerHTML = `<img src="../${p.img}" alt="">
    <div class="desc-producto">
        <p>${p.nombre}</p>
        <P>3 cuotas sin interes</P>
        <p>$${p.precio}</p>
    </div>
    <div class="btn-productos" id="contenedor-${p.id}">
        
    </div>`

    allProducts.append(div);

    const contendorBtn = document.querySelector("#contenedor-" + p.id);

    const btnCarrito = document.createElement("a");

    btnCarrito.innerText = "Agregar";

    contendorBtn.appendChild(btnCarrito);

    btnCarrito.addEventListener("click", () => {
        const existingProduct = carrito.find(producto => producto.id === p.id);

        if (existingProduct) {
            existingProduct.cantidad += 1;
            existingProduct.precioTotal = existingProduct.precio * existingProduct.cantidad;

        } else {
            carrito.push({...p, cantidad: 1, precioTotal: p.precio });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));


    });


});


//Viendo los productos agregados al carrito
const btnVerCarrito = document.querySelector("#carrito");
const bgCarrito = document.querySelector(".bg-carrito-html");
const carritoContenedor = document.querySelector("#contenedorCarrito");
const totalCarrito = document.querySelector("#total-carrito");
const btnCerrar = document.querySelector(".close");
//Viendo los productos agregados al carrito

// Creando y Agregando Productos al Carrito
btnVerCarrito.addEventListener("click", () => {
        bgCarrito.classList.remove("d-none");
        carritoContenedor.innerHTML = "";
        carrito.forEach(p => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("producto-carrito");
            divProducto.innerHTML = `
        <img src="../${p.img}" alt="">
        <div class="desc-producto">
            <p>${p.nombre}</p>
            <P>3 cuotas sin interes</P>
            <p>$${p.precioTotal}</p>
            <p>Cantidad: ${p.cantidad}</p>
        </div>
        <div class="btn-productos" id="contenedor-${p.id}">
            <a class="btn-eliminar"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> 
            </svg>
            </a>
        </div>
        `



            //Sumar Total de los productos
            let totalCarritoPrecio = 0;
            carrito.forEach(p => {
                totalCarritoPrecio += p.precioTotal;
                totalCarrito.innerHTML = `EL TOTAL DE SU COMPRA ES DE $${totalCarritoPrecio}`
            })

            // Boton Eliminar Producto del Carrito
            const btnEliminar = divProducto.querySelector(".btn-eliminar");
            btnEliminar.addEventListener("click", () => {
                const index = carrito.indexOf(p);
                if (index !== -1) {
                    carrito.splice(index, 1);
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    carritoContenedor.removeChild(divProducto);
                    let totalCarritoPrecio = 0;
                    carrito.forEach(p => {
                        totalCarritoPrecio += p.precioTotal;
                        totalCarrito.innerHTML = `EL TOTAL DE SU COMPRA ES DE $${totalCarritoPrecio}`
                    })
                }
            });



            carritoContenedor.appendChild(divProducto);

        })


    })
    // Boton Cerrar Carrito

btnCerrar.addEventListener("click", () => {
    bgCarrito.classList.add("d-none");
})