import { verificarLogin } from './../auth.js';

const buttonLogin = document.getElementById("boton-login");
const inputUsuario = document.getElementById("usuario");
const inputContraseña = document.getElementById("contraseña");
const errorMsg = document.getElementById("login-error");

buttonLogin.addEventListener("click", () => {
    const usuario = inputUsuario.value.trim();
    const contraseña = inputContraseña.value;

    if (!usuario || !contraseña) {
        mostrarError("Completá todos los campos.");
        return;
    }

    const encontrado = verificarLogin(usuario, contraseña);
    if (encontrado) {
        localStorage.setItem("usuario", JSON.stringify(encontrado));
        window.location.href = "../index.html";
    } else {
        mostrarError("Usuario o contraseña incorrectos.");
    }
});

[inputUsuario, inputContraseña].forEach(inp => {
    inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") buttonLogin.click();
    });
});

function mostrarError(msg) {
    if (errorMsg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = "block";
    }
}
