document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[action="../extranet/inicio_usuario.html"]');
    if (forms.length > 1) {
        const registroForm = forms[1];
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
            } else {
                window.location.href = "../extranet/inicio_usuario.html";
            }

            const usuarioSesion = {nombre, apellido, fechaNacimiento, genero, alias, email};
            sessionStorage.setItem('usuarioSesion', JSON.stringify(usuarioSesion));
            sessionStorage.setItem('aliasSesion', alias);

            // Redirige al usuario
            window.location.href = "../extranet/inicio_usuario.html";
        });
    }
});