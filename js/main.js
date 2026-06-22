import { productos } from './bbdd.js';
import { initCarrito } from './carrito.js';

// Mostrar primeros 4 productos en el index con botón agregar
const allProductsIndex = document.querySelector("#productos-index");
const { agregarProducto } = initCarrito('');

productos.slice(0, 4).forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img src="${p.img}" alt="${p.nombre}">
        <div class="desc-producto">
            <p>${p.nombre}</p>
            <p class="cuotas">3 cuotas sin interés</p>
            <p>$${p.precio.toFixed(2)}</p>
        </div>
        <div class="btn-productos" id="contenedor-${p.id}">
            <a href="pages/producto-detalle.html?id=${p.id}" class="btn-detalle">Ver detalle</a>
            <a class="btn-agregar-index">Agregar</a>
        </div>`;
    allProductsIndex.appendChild(div);

    div.querySelector(".btn-agregar-index").addEventListener("click", () => {
        agregarProducto(p);
        const btn = div.querySelector(".btn-agregar-index");
        btn.textContent = "✓ Agregado";
        setTimeout(() => { btn.textContent = "Agregar"; }, 1200);
    });
});
