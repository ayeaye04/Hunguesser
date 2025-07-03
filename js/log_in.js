/*Este js maneja la logica al iniciar sesion. 
Utiliza la clase "Usuario" que esta en usuarios.js*/
document.addEventListener('DOMContentLoaded', function() {  //espera que cargue la pagina
    const gestor = new GestorUsuarios();    //nuevo objeto
    const form = document.getElementById('form_login'); //busca el formulario por id

    function manejarSubmit(e) { //se ejecuta cuando se envie el formulario
        e.preventDefault(); //previene el envio

        const email = form.usuario.value.trim();    //obtienes datos del form
        const password = form.contrasenia.value.trim();
        const user = gestor.buscarUsuario(email, password); //busca el usuario con los mismos datos

        if (user) { //si coinciden los datos
            localStorage.setItem('usuario', JSON.stringify(user));  //lo guarda en localStorage
            window.location.href = "../extranet/inicio_usuario.html";   //lo redirige
        } else {
            alert("Usuario o contraseña incorrectos."); //da un mensaje de error
            form.reset(); //resetea el formulario
        }
    }

    if (form) { //si hay un formulario
        form.addEventListener('submit', manejarSubmit);    //agrega el submit al formulario
    }
});