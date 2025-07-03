/*Clase que representa a un usuario del sistema*/
class Usuario {
    constructor(email, password, nombre, apellido, alias, fechaNacimiento = "", genero = "") {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.alias = alias;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero; 
    }
    /*Metodo para crear usuarios*/
    static fromObject(obj) {
        return new Usuario(
            obj.email,
            obj.password,
            obj.nombre,
            obj.apellido,
            obj.alias,
            obj.fechaNacimiento || "",
            obj.genero || ""
        );
    }
}

/*Clase que administra los usuarios del sistema: carga, guarda y busca usuarios*/
class GestorUsuarios {
    constructor() {
        //Carga los usuarios existentes
        this.usuarios = this.cargarUsuarios();
    }

    /*Metodo que carga los usuarios guardados en el localStorage.
    Si no hay usuarios guardados, retorna una lista de ejemplo por defecto.*/
    cargarUsuarios() {
        const guardados = localStorage.getItem('usuarios');
        if (guardados) {
            //Convierte el JSON a objetos Usuario usando el método estático fromObject
            return JSON.parse(guardados).map(Usuario.fromObject);
        }
        return [
            new Usuario("pepemuleio@correo.com", "12345", "Pepe", "Muleio", "pepegamer"),
            new Usuario("martinzapa@gmail.com", "12345", "Martin", "Zapa", "martincito"),
            new Usuario("fasevilla@udc.edu.ar", "12345", "Florencia", "Sevilla", "colofalsa"),
            new Usuario("bnwilliams@udc.edu.ar", "12345", "Brandon", "Williams", "brandonico")
        ];
    }

    guardarUsuarios() {
        /*Metodo que guarda la lista de usuarios en localStorage*/
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    buscarUsuario(email, password) {
        /*Metodo que busca un usuario por email y contraseña (para el inicio de sesión)*/
        return this.usuarios.find(u => u.email === email && u.password === password);
    }

    buscarPorEmail(email) {
        /*Metodo que busca un usuario por su email (para evitar que se registre con uno ya existente)*/
        return this.usuarios.find(u => u.email === email);
    }

    buscarPorAlias(alias) {
        /*Metodo que busca un usuario por su alias (para verificar que sea único)*/
        return this.usuarios.find(u => u.alias === alias);
    }
}