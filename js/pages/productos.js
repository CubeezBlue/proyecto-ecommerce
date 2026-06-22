import { productos } from './../bbdd.js';
import { initCarrito } from './../carrito.js';

const allProducts = document.querySelector("#todos-productos");
const { agregarProducto } = initCarrito('../');

productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img src="../${p.img}" alt="${p.nombre}">
        <div class="desc-producto">
            <p>${p.nombre}</p>
            <p class="cuotas">3 cuotas sin interés</p>
            <p>$${p.precio.toFixed(2)}</p>
        </div>
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
