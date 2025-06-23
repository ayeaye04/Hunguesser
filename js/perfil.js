document.addEventListener('DOMContentLoaded', function() {
    // Busca el menú desplegable
    const menu = document.querySelector('nav.menu ul.desplegable');
    if (menu) {
        // Crea el elemento <li> y <a>
        const liPerfil = document.createElement('li');
        const aPerfil = document.createElement('a');
        aPerfil.textContent = 'Perfil';
        aPerfil.href = '#'; // No navega por defecto

        // Evento para redireccionar dinámicamente
        aPerfil.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = './perfil.html';
        });

        liPerfil.appendChild(aPerfil);

        // Inserta el enlace de perfil como primer elemento del menú
        menu.insertBefore(liPerfil, menu.firstChild);

    }

    // Redirección dinámica al hacer clic en "Perfil" desde el menú
    const perfilLink = document.querySelector('nav.menu a[href="./perfil.html"]');
    if (perfilLink) {
        perfilLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = './perfil.html';
        });
    }

    // --- El resto del código para mostrar alias y correo en perfil.html ---
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) return;

    const verticalDiv = document.querySelector('.vertical');
    if (!verticalDiv) return;

    const h2 = verticalDiv.querySelector('h2');
    const h3 = verticalDiv.querySelector('h3');

    if (h2) {
        h2.innerHTML = `
            ${usuario.alias}
            <button>✏️</button>
        `;
    }

    if (h3) {
        h3.innerHTML = `
            ${usuario.email}
            <button>✏️</button>
        `;
    }

    const tdNombreUsuario = document.querySelector('td#NombreUsuario');
    if (tdNombreUsuario) {
        tdNombreUsuario.textContent = usuario.alias;
    }
});

/*cambiar contraseñas*/
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