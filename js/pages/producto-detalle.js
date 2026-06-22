import { productos } from './../bbdd.js';
import { initCarrito } from './../carrito.js';
import { initHeader } from './../auth.js';
import { initSearchRedirect } from './../search.js';

initHeader('../');
initSearchRedirect('../');

const { agregarProducto } = initCarrito('../');

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const producto = productos.find(p => p.id === id);
const contenedor = document.querySelector('#detalle-contenedor');

if (!producto) {
    contenedor.innerHTML = `
        <div style="grid-column:span 2; text-align:center; padding:4rem; color:rgba(255,255,255,0.5);">
            <p style="font-size:1.2rem;">Producto no encontrado.</p>
            <a href="productos.html" style="color:var(--accent); margin-top:1rem; display:inline-block;">← Ver todos los productos</a>
        </div>`;
} else {
    document.title = `${producto.nombre} - Retro Style`;

    let cantidad = 1;

    contenedor.innerHTML = `
        <div class="detalle-img">
            <img src="../${producto.img}" alt="${producto.nombre}">
        </div>
        <div class="detalle-info">
            <p class="detalle-categoria">Retro Style Originals</p>
            <h1>${producto.nombre}</h1>
            <p class="detalle-precio">$${producto.precio.toLocaleString('es-AR')}</p>
            <p class="detalle-cuotas">3 cuotas sin interés de $${(producto.precio / 3).toFixed(2)}</p>
            <p class="detalle-descripcion">${producto.descripcion}</p>
            <div class="detalle-cantidad">
                <label>Cantidad:</label>
                <div class="controles-detalle">
                    <button id="btn-restar">−</button>
                    <span id="cantidad-detalle">1</span>
                    <button id="btn-sumar">+</button>
                </div>
            </div>
            <div class="detalle-acciones">
                <button class="btn-agregar-detalle" id="btn-agregar-detalle">
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;

    const spanCantidad = contenedor.querySelector('#cantidad-detalle');

    contenedor.querySelector('#btn-restar').addEventListener('click', () => {
        if (cantidad > 1) {
            cantidad--;
            spanCantidad.textContent = cantidad;
        }
    });

    contenedor.querySelector('#btn-sumar').addEventListener('click', () => {
        cantidad++;
        spanCantidad.textContent = cantidad;
    });

    contenedor.querySelector('#btn-agregar-detalle').addEventListener('click', () => {
        for (let i = 0; i < cantidad; i++) {
            agregarProducto(producto);
        }
        const btn = contenedor.querySelector('#btn-agregar-detalle');
        btn.textContent = `✓ ${cantidad > 1 ? cantidad + ' unidades agregadas' : 'Agregado al carrito'}`;
        setTimeout(() => { btn.textContent = 'Agregar al carrito'; }, 1800);
    });
}
