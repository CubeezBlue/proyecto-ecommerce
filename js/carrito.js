export function getCarrito() {
    try {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch {
        return [];
    }
}

export function saveCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function initCarrito(imgPrefix = '') {
    const carrito = getCarrito();
    const btnVerCarrito = document.querySelector("#carrito");
    const bgCarrito = document.querySelector(".bg-carrito-html");
    const carritoContenedor = document.querySelector("#contenedorCarrito");
    const totalCarrito = document.querySelector("#total-carrito");
    const btnCerrar = document.querySelector(".close");
    const badge = document.querySelector(".carrito-badge");

    function actualizarBadge() {
        const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        if (badge) {
            badge.textContent = total;
            badge.style.display = total > 0 ? 'flex' : 'none';
        }
    }

    function actualizarVista() {
        carritoContenedor.innerHTML = "";
        let totalPrecio = 0;

        if (carrito.length === 0) {
            carritoContenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
            totalCarrito.innerHTML = '';
            return;
        }

        carrito.forEach(p => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("producto-carrito");
            divProducto.innerHTML = `
                <img src="${imgPrefix}${p.img}" alt="${p.nombre}">
                <div class="desc-producto">
                    <p class="nombre-carrito">${p.nombre}</p>
                    <p class="precio-carrito">$${p.precioTotal.toFixed(2)}</p>
                    <div class="cantidad-controles">
                        <button class="btn-cantidad btn-menos">−</button>
                        <span class="cantidad-num">${p.cantidad}</span>
                        <button class="btn-cantidad btn-mas">+</button>
                    </div>
                </div>
                <a class="btn-eliminar" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="22" height="22">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </a>
            `;

            divProducto.querySelector(".btn-eliminar").addEventListener("click", () => {
                const index = carrito.findIndex(item => item.id === p.id);
                if (index !== -1) {
                    carrito.splice(index, 1);
                    saveCarrito(carrito);
                    actualizarVista();
                    actualizarBadge();
                }
            });

            divProducto.querySelector(".btn-menos").addEventListener("click", () => {
                const item = carrito.find(item => item.id === p.id);
                if (item) {
                    if (item.cantidad <= 1) {
                        carrito.splice(carrito.indexOf(item), 1);
                    } else {
                        item.cantidad--;
                        item.precioTotal = item.precio * item.cantidad;
                    }
                    saveCarrito(carrito);
                    actualizarVista();
                    actualizarBadge();
                }
            });

            divProducto.querySelector(".btn-mas").addEventListener("click", () => {
                const item = carrito.find(item => item.id === p.id);
                if (item) {
                    item.cantidad++;
                    item.precioTotal = item.precio * item.cantidad;
                    saveCarrito(carrito);
                    actualizarVista();
                    actualizarBadge();
                }
            });

            totalPrecio += p.precioTotal;
            carritoContenedor.appendChild(divProducto);
        });

        totalCarrito.innerHTML = `<strong>Total: $${totalPrecio.toFixed(2)}</strong>`;
    }

    btnVerCarrito.addEventListener("click", () => {
        bgCarrito.classList.remove("d-none");
        actualizarVista();
    });

    const cerrarCarrito = () => bgCarrito.classList.add("d-none");

    btnCerrar.addEventListener("click", cerrarCarrito);

    bgCarrito.addEventListener("click", (e) => {
        if (!e.target.closest(".bg-carrito")) cerrarCarrito();
    });

    const btnComprar = document.querySelector("#btn-comprar");
    if (btnComprar) {
        btnComprar.addEventListener("click", async () => {
            const carritoActual = getCarrito();
            if (carritoActual.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            btnComprar.textContent = "Procesando...";
            btnComprar.disabled = true;

            const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
            const endpoint = isLocal
                ? 'http://localhost:3000/create_preference'
                : '/.netlify/functions/create_preference';

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items: carritoActual })
                });

                if (!response.ok) throw new Error("Error del servidor");

                const data = await response.json();
                if (data.init_point) {
                    window.location.href = data.init_point;
                } else {
                    throw new Error("No se recibió el link de pago");
                }
            } catch (err) {
                alert("Error al conectar con el servidor de pagos. Asegúrese de que el servidor esté corriendo (npm start).");
                btnComprar.textContent = "COMPRAR";
                btnComprar.disabled = false;
            }
        });
    }

    actualizarBadge();

    return {
        carrito,
        actualizarVista,
        actualizarBadge,
        agregarProducto(producto) {
            const existente = carrito.find(p => p.id === producto.id);
            if (existente) {
                existente.cantidad++;
                existente.precioTotal = existente.precio * existente.cantidad;
            } else {
                carrito.push({ ...producto, cantidad: 1, precioTotal: producto.precio });
            }
            saveCarrito(carrito);
            actualizarBadge();
        }
    };
}
