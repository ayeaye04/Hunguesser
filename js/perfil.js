document.addEventListener('DOMContentLoaded', function() {
    // Busca el menú desplegable
    const menu = document.querySelector('nav.menu ul.desplegable');
    if (menu) {
        // Crea el elemento <li> y <a>
        const liPerfil = document.createElement('li');
        const aPerfil = document.createElement('a');
        aPerfil.textContent = 'Perfil';
        aPerfil.href = '#'; // No navega por defecto

        //evento para redireccionar dinamicamente
        aPerfil.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = './perfil.html';
        });

        liPerfil.appendChild(aPerfil);

        //inserta perfil como primer elemento del menu
        menu.insertBefore(liPerfil, menu.firstChild);

    }

    //redireccion dinamica
    const perfilLink = document.querySelector('nav.menu a[href="./perfil.html"]');
    if (perfilLink) {
        perfilLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = './perfil.html';
        });
    }

    //codigo para mostrar alias y correo en perfil
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) return;

    const verticalDiv = document.querySelector('.vertical');
    if (!verticalDiv) return;

    const h2 = verticalDiv.querySelector('h2');
    const h3 = verticalDiv.querySelector('h3');

    if (h2) {
        h2.innerHTML = `
            ${usuario.alias}
        `;
    }

    if (h3) {
        h3.innerHTML = `
            ${usuario.email}
        `;
    }

    const tdNombreUsuario = document.querySelector('td#NombreUsuario');
    if (tdNombreUsuario) {
        tdNombreUsuario.textContent = usuario.alias;
    }

    const aNombreUsuario = document.querySelector('a#NombreUsuario');
    if (aNombreUsuario) {
        aNombreUsuario.textContent = usuario.alias;
    }

    //codigo para cerrar sesion
    const Salir = document.getElementById('salir');    //usa id salr
    if (Salir) {    //si se preciona o se usa
        Salir.addEventListener('click', function() {
            localStorage.removeItem('usuario');
            sessionStorage.clear();
            window.location.href = '../../index.html';
        });
    }
});

//cambiar contraseñas
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cambio_contrasenia');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!form || !usuario) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const password = form.contrasenia_original.value;
        const nueva = form.contrasenia_nueva.value;
        const confirmar = form.confirmar_contrasenia.value;

        if (password !== usuario.password) {
            alert("La contraseña actual es incorrecta.");
            return;
        }

        if (nueva !== confirmar) {
            alert("Las contraseñas nuevas no coinciden.");
            return;
        }

        // Simula el cambio de contraseña en localStorage
        usuario.password = nueva;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert("Contraseña cambiada exitosamente.");
        form.reset();
    });
});