/*Este js maneja la logica al crear un nuevo usuario. 
Utiliza la clase "Usuario" que esta en usuarios.js*/

function manejarRegistroSubmit(e) {     //funcion que se ejecuta cuando se envie el fomrulario
    e.preventDefault(); //previene el envio del formulario

    const registroForm = document.getElementById('form_registro');  //busca el formulario
    const gestor = new GestorUsuarios();    //crea un nuevo objeto

    const nombre = registroForm.nombre.value.trim();    //obtiene los datos del formulario
    const apellido = registroForm.apellido.value.trim();
    const fechaNacimiento = registroForm.fecha_nacimiento.value;
    const genero = registroForm.genero.value;
    const alias = registroForm.usuario_nuevo.value.trim();
    const email = registroForm.correo_electronico.value.trim();
    const password = registroForm.contrasenia_nueva.value;
    const confirmar = registroForm.confirmar_contrasenia.value;

    if (password !== confirmar) {   //si las contraseñas no coinciden
        alert("Las contraseñas no coinciden.");
        return;
    }

    const hoy = new Date();    //fecha de hoy
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();  //calcula la edad  
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    if (edad < 12) {    //calcula un minimo de edad
        alert("Debes tener al menos 12 años para registrarte.");
        return;
    }

    if (gestor.buscarPorEmail(email)) {     //se fija si el correo esta repetido
        alert("Ya existe un usuario con ese correo.");
        return;
    }

    if (gestor.buscarPorAlias(alias)) {     //se fija si el usuario se repite
        alert("Ese alias ya está en uso.");
        return;
    }

    const nuevoUsuario = new Usuario(email, password, nombre, apellido, alias, fechaNacimiento, genero);    //crea el objeto usuario
    gestor.usuarios.push(nuevoUsuario); //agrega un nuevo usuario a la lista de usuarios
    gestor.guardarUsuarios();       //guarda usuario en localStorage

    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    window.location.href = "../extranet/inicio_usuario.html";
}

function iniciarRegistroUsuario() {
    const registroForm = document.getElementById('form_registro');
    if (registroForm) {
        registroForm.addEventListener('submit', manejarRegistroSubmit);
    }
}

document.addEventListener('DOMContentLoaded', iniciarRegistroUsuario);