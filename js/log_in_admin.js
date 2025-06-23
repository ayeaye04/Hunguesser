class SuperUsuario {
    constructor(email, password, nombre, apellido) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    static fromObject(obj) {
        return new SuperUsuario(obj.email, obj.password, obj.nombre, obj.apellido);
    }
}


class GestorUsuarios {
    constructor() {
        this.usuarios = this.cargarUsuarios();
    }

    cargarUsuarios() {
        const guardados = localStorage.getItem('usuarios');
        if (guardados) {
            return JSON.parse(guardados).map(SuperUsuario.fromObject);
        }
        // Usuarios de ejemplo
        return [
            new SuperUsuario("fasevilla@udc.edu.ar", "12345", "Florencia", "Sevilla"),
            new SuperUsuario("bnwilliams@udc.edu.ar", "12345", "Brandon", "Williams")
        ];
    }

    guardarUsuarios() {
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    buscarUsuario(email, password) {
        return this.usuarios.find(u => u.email === email && u.password === password);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const gestor = new GestorUsuarios();
    const form = document.getElementById('form_admin');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.usuario_admin.value.trim();
            const password = form.contrasenia_admin.value.trim();

            const user = gestor.buscarUsuario(email, password);

            if (user) {
                localStorage.setItem('usuario', JSON.stringify(user));
                window.location.href = "../Intranet/admin.html";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });
    }
});