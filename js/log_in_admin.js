/*Clase SuperUsuario representa a un administrador del sistema*/
class SuperUsuario {
    constructor(email, password, nombre, apellido) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

/*Clase GestorUsuarios administra a los SuperUsuarios*/
class GestorUsuarios {
    /*Metodo que carga manualmente una lista de administradores autorizados*/
    constructor() {
        this.usuarios = [
            new SuperUsuario("fasevilla@udc.edu.ar", "12345", "Florencia", "Sevilla"),
            new SuperUsuario("bnwilliams@udc.edu.ar", "12345", "Brandon", "Williams")
        ];
    }

    buscarUsuario(email, password) {
        /*Método que busca un administrador por email y contraseña*/
        return this.usuarios.find(u => u.email === email && u.password === password);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const gestor = new GestorUsuarios();
    const form = document.getElementById('form_admin');
    // Si el formulario existe, configura el evento de envío
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.usuario_admin.value.trim();
            const password = form.contrasenia_admin.value.trim();
            //Busca un administrador con esos datos
            const user = gestor.buscarUsuario(email, password);

            if (user) {
                //Si existe, guarda los datos del usuario en localStorage
                localStorage.setItem('usuario', JSON.stringify(user));
                //Redirige al panel de administración
                window.location.href = "../Intranet/admin.html";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });
    }
});