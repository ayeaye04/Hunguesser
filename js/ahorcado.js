const palabras = ["GATO", "PERRO", "CASA", "LUNA", "SOL", "RATÓN", "ARBOL", "FLORES"];
let palabraSecreta = "";
let errores = 0;
let letrasIncorrectas = [];
let letrasCorrectas = [];

function elegirPalabraAleatoria() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
}

function reiniciarJuego() {
    letrasCorrectas = Array(palabraSecreta.length).fill("");
    errores = 0;
    letrasIncorrectas = [];

    inicializarTablero();
    actualizarImagenAhorcado();
    limpiarTeclado();
}

function inicializarTablero() {
    const fila = document.getElementById("filaLetras");
    fila.innerHTML = "";
    for (let i = 0; i < palabraSecreta.length; i++) {
        const td = document.createElement("td");
        td.innerHTML = `<h1 class="casillero" id="letra-${i}">_</h1>`;
        fila.appendChild(td);
    }
}

function actualizarImagenAhorcado() {
    const img = document.getElementById("imagenAhorcado");
    const paginaActual = window.location.pathname.split('/').pop();
    if (paginaActual === "inicio_usuario.html") {
        img.src = "../../fotos/ahorcado" + errores + ".jpg";
    } else {
        img.src = "fotos/ahorcado" + errores + ".jpg";
    }
}

function mostrarLetrasCorrectas(letra) {
    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
            document.getElementById(`letra-${i}`).textContent = letra;
            letrasCorrectas[i] = letra;
        }
    }
}

function verificarVictoria() {
    return letrasCorrectas.join("") === palabraSecreta;
}

function marcarLetraUsada(letra, esCorrecta) {
    const teclas = document.querySelectorAll(".tecla");
    teclas.forEach(td => {
        if (td.textContent.toUpperCase() === letra) {
            td.classList.add("usada");
            if (esCorrecta) {
                td.classList.add("correcta");
            } else {
                td.classList.add("incorrecta");
            }
        }
    });
}

function limpiarTeclado() {
    document.querySelectorAll(".tecla").forEach(td => {
        td.classList.remove("usada", "correcta", "incorrecta");
    });
}

function manejarLetraIngresada(letra) {
    // Si ya la usó, no hacer nada
    if (letrasCorrectas.includes(letra) || letrasIncorrectas.includes(letra)) {
        return;
    }

    if (palabraSecreta.includes(letra)) {
        mostrarLetrasCorrectas(letra);
        marcarLetraUsada(letra, true);

        if (verificarVictoria()) {
            setTimeout(() => {
                alert("¡Ganaste! 🎉");
                elegirPalabraAleatoria();
                reiniciarJuego();
            }, 100);
        }
    } else {
        letrasIncorrectas.push(letra);
        errores++;
        actualizarImagenAhorcado();
        marcarLetraUsada(letra, false);

        if (errores === 6) {
            setTimeout(() => {
                alert("¡Perdiste!");
                reiniciarJuego();
            }, 100);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    elegirPalabraAleatoria();
    reiniciarJuego();

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        const letra = document.getElementById("letra").value.toUpperCase();
        document.getElementById("letra").value = "";

        if (letra.match(/^[A-ZÑ]$/)) {
            manejarLetraIngresada(letra);
        }
    });
});
