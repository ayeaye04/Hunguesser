/*Este js maneja la logica al crear un nuevo usuario. 
Utiliza la clase "Usuario" que esta en usuarios.js*/
document.addEventListener('DOMContentLoaded', function() {
    const gestor = new GestorUsuarios();
    const registroForm = document.getElementById('form_registro');

    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = registroForm.nombre.value.trim();
            const apellido = registroForm.apellido.value.trim();
            const fechaNacimiento = registroForm.fecha_nacimiento.value;
            const genero = registroForm.genero.value;
            const alias = registroForm.usuario_nuevo.value.trim();
            const email = registroForm.correo_electronico.value.trim();
            const password = registroForm.contrasenia_nueva.value;
            const confirmar = registroForm.confirmar_contrasenia.value;

            if (password !== confirmar) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }

            if (edad < 12) {
                alert("Debes tener al menos 12 años para registrarte.");
                return;
            }

            if (gestor.buscarPorEmail(email)) {
                alert("Ya existe un usuario con ese correo.");
                return;
            }

            if (gestor.buscarPorAlias(alias)) {
                alert("Ese alias ya está en uso.");
                return;
            }

            const nuevoUsuario = new Usuario(email, password, nombre, apellido, alias, fechaNacimiento, genero);
            gestor.usuarios.push(nuevoUsuario);
            gestor.guardarUsuarios();

            localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
            window.location.href = "../extranet/inicio_usuario.html";
        });
    }
});