class Usuario {
    constructor(email, password, nombre, apellido, alias) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.alias = alias;
    }

    static fromObject(obj) {
        return new Usuario(obj.email, obj.password, obj.nombre, obj.apellido, obj.alias);
    }
}

class GestorUsuarios {
    constructor() {
        this.usuarios = this.cargarUsuarios();
    }

    cargarUsuarios() {
        const guardados = localStorage.getItem('usuarios');
        if (guardados) {
            return JSON.parse(guardados).map(Usuario.fromObject);
        }
        // Usuarios de ejemplo
        return [
            new Usuario("pepemuleio@correo.com", "12345", "Pepe", "Muleio", "pepegamer"),
            new Usuario("martinzapa@gmail.com", "12345", "Martin", "Zapa", "martincito"),
            new Usuario("fasevilla@udc.edu.ar", "12345", "Florencia", "Sevilla", "colofalsa"),
            new Usuario("bnwilliams@udc.edu.ar", "12345", "Brandon", "Williams", "brandonico")
        ];
    }

    guardarUsuarios() {
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    buscarUsuario(email, password) {
        return this.usuarios.find(u => u.email === email && u.password === password);
    }

    agregarUsuario(usuario) {
        this.usuarios.push(usuario);
        this.guardarUsuarios();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const gestor = new GestorUsuarios();
    const form = document.querySelector('form[action="../extranet/inicio_usuario.html"]');
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