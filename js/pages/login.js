import { usuarios } from './../bbdd.js';


let user = {
    usuario: '',
    contraseña: ''
}

const buttonLogin = document.getElementById("boton-login");
const inputs = document.querySelectorAll("input");

inputs.forEach((elemento) => {
    elemento.addEventListener("input", ({ target }) => {

        const { value, name } = target;

        user = {
            ...user,
            [name]: value
        }

    })
})

buttonLogin.addEventListener("click", () => {
    const userFind = usuarios.find((registro) => user.usuario === registro.usuario && user.contraseña === registro.contraseña)
    if (userFind) {
        localStorage.setItem("usuario", JSON.stringify(userFind));
        window.location = "../index.html"
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los Datos Ingresados Son Incorrectos',
            footer: '<a href="">PORFAVOR VUELVA INTENTARLO</a>'
        })
    }
});