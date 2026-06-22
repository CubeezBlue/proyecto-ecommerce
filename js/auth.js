import { usuarios as usuariosBBDD } from './bbdd.js';

export function getUsuarioLogueado() {
    try {
        return JSON.parse(localStorage.getItem("usuario")) || null;
    } catch {
        return null;
    }
}

export function logout() {
    localStorage.removeItem("usuario");
}

export function getUsuariosRegistrados() {
    try {
        return JSON.parse(localStorage.getItem("usuarios_registrados")) || [];
    } catch {
        return [];
    }
}

export function registrarUsuario({ nombre, usuario, email, contraseña }) {
    const registrados = getUsuariosRegistrados();
    const existe = [...usuariosBBDD, ...registrados].find(u => u.usuario === usuario || u.email === email);
    if (existe) return { ok: false, mensaje: 'El usuario o email ya existe.' };
    registrados.push({ nombre, usuario, email, contraseña });
    localStorage.setItem("usuarios_registrados", JSON.stringify(registrados));
    return { ok: true };
}

export function verificarLogin(usuario, contraseña) {
    const registrados = getUsuariosRegistrados();
    return [...usuariosBBDD, ...registrados].find(
        u => u.usuario === usuario && u.contraseña === contraseña
    ) || null;
}

export function initHeader(pathPrefix = '') {
    const usuario = getUsuarioLogueado();
    const authLinks = document.querySelector('.auth-links');
    if (!authLinks) return;

    if (usuario) {
        authLinks.innerHTML = `
            <span class="usuario-nombre">Hola, ${usuario.nombre || usuario.usuario}</span>
            <a href="#" class="btn-logout">Cerrar sesión</a>
        `;
        authLinks.querySelector('.btn-logout').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
            window.location.reload();
        });
    } else {
        authLinks.innerHTML = `
            <a href="${pathPrefix}pages/login.html">Iniciar sesión</a>
            <a href="${pathPrefix}pages/registro.html">Registrarse</a>
        `;
    }
}
