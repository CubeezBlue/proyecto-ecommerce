import { registrarUsuario } from './../auth.js';

const btnRegistrar = document.getElementById("btn-registrar");
const errorMsg = document.getElementById("registro-error");
const successMsg = document.getElementById("registro-success");

btnRegistrar.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("contraseña").value;
    const confirmar = document.getElementById("confirmar").value;

    ocultarMensajes();

    if (!nombre || !usuario || !email || !contraseña || !confirmar) {
        mostrarError("Completá todos los campos.");
        return;
    }

    if (contraseña.length < 4) {
        mostrarError("La contraseña debe tener al menos 4 caracteres.");
        return;
    }

    if (contraseña !== confirmar) {
        mostrarError("Las contraseñas no coinciden.");
        return;
    }

    const resultado = registrarUsuario({ nombre, usuario, email, contraseña });

    if (!resultado.ok) {
        mostrarError(resultado.mensaje);
        return;
    }

    localStorage.setItem("usuario", JSON.stringify({ nombre, usuario, email, contraseña }));
    mostrarExito("¡Cuenta creada correctamente! Redirigiendo...");
    setTimeout(() => { window.location.href = "../index.html"; }, 1500);
});

function mostrarError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = "block";
}

function mostrarExito(msg) {
    successMsg.textContent = msg;
    successMsg.style.display = "block";
}

function ocultarMensajes() {
    errorMsg.style.display = "none";
    successMsg.style.display = "none";
}
