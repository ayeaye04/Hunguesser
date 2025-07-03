/*Este js maneja la logica al iniciar sesion. 
Utiliza la clase "Usuario" que esta en usuarios.js*/
document.addEventListener('DOMContentLoaded', function() {
    const gestor = new GestorUsuarios();
    const form = document.getElementById('form_login');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = form.usuario.value.trim();
            const password = form.contrasenia.value.trim();
            const user = gestor.buscarUsuario(email, password);

            if (user) {
                localStorage.setItem('usuario', JSON.stringify(user));
                window.location.href = "../extranet/inicio_usuario.html";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });
    }
});