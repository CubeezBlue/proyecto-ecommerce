import { productos } from './../bbdd.js';
import { initCarrito } from './../carrito.js';
import { initHeader } from './../auth.js';

initHeader('../');

const allProducts = document.querySelector("#todos-productos");
const { agregarProducto } = initCarrito('../');

productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <a href="producto-detalle.html?id=${p.id}" class="producto-link">
            <img src="../${p.img}" alt="${p.nombre}">
            <div class="desc-producto">
                <p>${p.nombre}</p>
                <p class="cuotas">3 cuotas sin interés</p>
                <p class="precio-producto">$${p.precio.toLocaleString('es-AR')}</p>
            </div>
        </a>
        <div class="btn-productos" id="contenedor-${p.id}">
            <a class="btn-agregar">Agregar al carrito</a>
        </div>`;
    allProducts.appendChild(div);

    div.querySelector(".btn-agregar").addEventListener("click", () => {
        agregarProducto(p);
        const btn = div.querySelector(".btn-agregar");
        btn.textContent = "✓ Agregado";
        setTimeout(() => { btn.textContent = "Agregar al carrito"; }, 1200);
    });
});
