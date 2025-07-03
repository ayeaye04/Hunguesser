/*Clase SuperUsuario representa a un administrador del sistema*/
class SuperUsuario {    //crea la clase
    constructor(email, password, nombre, apellido) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

/*Clase GestorUsuarios administra a los SuperUsuarios*/
class GestorUsuarios {  //crea la clase
    /*Metodo que carga manualmente una lista de administradores autorizados*/
    constructor() {
        this.usuarios = [   //inicializa la lista de usuarios
            new SuperUsuario("fasevilla@udc.edu.ar", "12345", "Florencia", "Sevilla"),
            new SuperUsuario("bnwilliams@udc.edu.ar", "12345", "Brandon", "Williams")
        ];
    }

    buscarUsuario(email, password) {    //Busca un usuario por email y contraseña
        /*Método que busca un administrador por email y contraseña*/
        return this.usuarios.find(u => u.email === email && u.password === password);
    }
}

function manejarSubmitAdmin(e) {   
    e.preventDefault();
    const form = document.getElementById('form_admin');
    const gestor = new GestorUsuarios();
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
}

function iniciarLoginAdmin() {
    const form = document.getElementById('form_admin');
    if (form) {
        form.addEventListener('submit', manejarSubmitAdmin);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarLoginAdmin();
});