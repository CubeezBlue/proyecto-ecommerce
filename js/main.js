import { productos } from './bbdd.js';
import { initCarrito } from './carrito.js';
import { initHeader } from './auth.js';
import { initSearchRedirect } from './search.js';

initHeader('');
initSearchRedirect('');

// Mostrar primeros 4 productos en el index con botón agregar
const allProductsIndex = document.querySelector("#productos-index");
const { agregarProducto } = initCarrito('');

productos.slice(0, 4).forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <a href="pages/producto-detalle.html?id=${p.id}" class="producto-link">
            <img src="${p.img}" alt="${p.nombre}">
            <div class="desc-producto">
                <p>${p.nombre}</p>
                <p class="cuotas">3 cuotas sin interés</p>
                <p class="precio-producto">$${p.precio.toLocaleString('es-AR')}</p>
            </div>
        </a>
        <div class="btn-productos" id="contenedor-${p.id}">
            <a class="btn-agregar-index">Agregar al carrito</a>
        </div>`;
    allProductsIndex.appendChild(div);

    div.querySelector(".btn-agregar-index").addEventListener("click", () => {
        agregarProducto(p);
        const btn = div.querySelector(".btn-agregar-index");
        btn.textContent = "✓ Agregado";
        setTimeout(() => { btn.textContent = "Agregar"; }, 1200);
    });
});
