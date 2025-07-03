/*Clase que maneja toda la lógica de perfil de usuario (mostrar datos, cerrar sesión, cambiar contraseña, etc.)*/
class PerfilUsuario {
    constructor() {
        //Obtiene el usuario actual almacenado en localStorage
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        //Espera a que el documento esté completamente cargado para ejecutar el resto
        document.addEventListener('DOMContentLoaded', this.inicializar.bind(this));
    }

    inicializar() {
        /*Método principal que llama a todos los subprocesos de inicialización*/
        this.insertarEnMenu();
        this.mostrarDatosUsuario();
        this.configurarCerrarSesion();
        this.configurarCambioContrasenia();
    }

    manejarClickPerfil(event) {
        event.preventDefault();
        window.location.href = './perfil.html';
    }

    insertarEnMenu() {
        /*Metodo que inserta un botón "Perfil" en el menú desplegable de navegación*/
        const menu = document.querySelector('nav.menu ul.desplegable');
        if (!menu) return;

        const liPerfil = document.createElement('li');
        const aPerfil = document.createElement('a');
        aPerfil.textContent = 'Perfil';
        aPerfil.href = '#';

        //Agrega evento al enlace para redirigir a la página de perfil
        aPerfil.addEventListener('click', this.manejarClickPerfil);

        liPerfil.appendChild(aPerfil);
        menu.insertBefore(liPerfil, menu.firstChild);

        const perfilLink = document.querySelector('nav.menu a[href="./perfil.html"]');
        if (perfilLink) {
            perfilLink.addEventListener('click', this.manejarClickPerfil);
        }
    }

    mostrarDatosUsuario() {
        /*Metodo que muestra los datos del usuario (alias y email) en el HTML*/
        if (!this.usuario) return; // Si no hay usuario, no hace nada

        // Busca los elementos que deben mostrar la informacion del usuario
        const verticalDiv = document.querySelector('.vertical');
        if (verticalDiv) {
            const h2 = verticalDiv.querySelector('h2');
            const h3 = verticalDiv.querySelector('h3');
            if (h2) h2.innerHTML = `${this.usuario.alias}`;
            if (h3) h3.innerHTML = `${this.usuario.email}`;
        }

        const tdNombreUsuario = document.querySelector('td#NombreUsuario');
        if (tdNombreUsuario) tdNombreUsuario.textContent = this.usuario.alias;

        const aNombreUsuario = document.querySelector('a#NombreUsuario');
        if (aNombreUsuario) aNombreUsuario.textContent = this.usuario.alias;
    }

    manejarCerrarSesion() {
        localStorage.removeItem('usuario');
        window.location.href = '../../index.html';
    }

    configurarCerrarSesion() {
        /*Metodo que configura el botón de cerrar sesión (elimina los datos y redirige al inicio)*/
        const btnSalir = document.getElementById('salir');
        if (btnSalir) {
            btnSalir.addEventListener('click', this.manejarCerrarSesion);
        }
    }

    manejarCambioContrasenia(e) {
        e.preventDefault();

        const form = document.getElementById('cambio_contrasenia');
        if (!form || !this.usuario) return;

        const password = form.contrasenia_original.value;
        const nueva = form.contrasenia_nueva.value;
        const confirmar = form.confirmar_contrasenia.value;

        // Verifica si la contraseña actual es correcta
        if (password !== this.usuario.password) {
            alert("La contraseña actual es incorrecta.");
            return;
        }

        // Verifica si las nuevas contraseñas coinciden
        if (nueva !== confirmar) {
            alert("Las contraseñas nuevas no coinciden.");
            return;
        }

        // Guarda la nueva contraseña en el usuario actual y en localStorage
        this.usuario.password = nueva;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        alert("Contraseña cambiada exitosamente.");
        form.reset();
    }

    configurarCambioContrasenia() {
        /*Metodo que configura el formulario de cambio de contraseña*/
        const form = document.getElementById('cambio_contrasenia');
        if (!form || !this.usuario) return;

        form.addEventListener('submit', this.manejarCambioContrasenia.bind(this));
    }
}

// Inicializa la clase
new PerfilUsuario();