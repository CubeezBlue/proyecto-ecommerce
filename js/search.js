// En páginas que NO son productos.html: redirige al buscador
export function initSearchRedirect(redirectBase = '') {
    const input = document.querySelector('.search input');
    const btn = document.querySelector('.search button');
    if (!input || !btn) return;

    const ejecutar = () => {
        const q = input.value.trim();
        if (q) window.location.href = `${redirectBase}pages/productos.html?q=${encodeURIComponent(q)}`;
    };

    btn.addEventListener('click', ejecutar);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') ejecutar(); });
}

// En productos.html: filtra en tiempo real + lee param ?q= de la URL
export function initProductSearch(productos, renderFn) {
    const input = document.querySelector('.search input');
    const btn = document.querySelector('.search button');
    const noResultados = document.getElementById('sin-resultados');
    if (!input) return;

    const params = new URLSearchParams(window.location.search);
    const qInicial = params.get('q') || '';
    if (qInicial) input.value = qInicial;

    function filtrar(query) {
        const lower = query.toLowerCase().trim();
        if (!lower) return productos;
        return productos.filter(p =>
            p.nombre.toLowerCase().includes(lower) ||
            p.descripcion.toLowerCase().includes(lower)
        );
    }

    function actualizar() {
        const resultado = filtrar(input.value);
        renderFn(resultado);
        if (noResultados) {
            noResultados.style.display = resultado.length === 0 ? 'block' : 'none';
        }
    }

    btn?.addEventListener('click', actualizar);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') actualizar(); });
    input.addEventListener('input', actualizar);

    actualizar(); // renderizado inicial
}
