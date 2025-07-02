class Ahorcado {
    constructor() {
        this.palabras = ["ÑOQUIS", "GATO", "PERRO", "CASA", "LUNA", "SOL", "RATON", "ARBOL", "FLORES"];
        this.palabraSecreta = "";
        this.errores = 0;
        this.letrasIncorrectas = [];
        this.letrasCorrectas = [];
        // Detecta si está en index o en inicio_usuario
        this.esInicioUsuario = window.location.pathname.includes("inicio_usuario.html");
    }

    elegirPalabraAleatoria() {
        this.palabraSecreta = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    }

    reiniciarJuego() {
        this.letrasCorrectas = Array(this.palabraSecreta.length).fill("");
        this.errores = 0;
        this.letrasIncorrectas = [];
        this.inicializarTablero();
        this.actualizarImagenAhorcado();
        this.limpiarTeclado();
    }

    inicializarTablero() {
        const fila = document.getElementById("filaLetras");
        if (!fila) return;
        fila.innerHTML = "";
        for (let i = 0; i < this.palabraSecreta.length; i++) {
            const td = document.createElement("td");
            td.innerHTML = `<h1 class="casillero" id="letra-${i}">_</h1>`;
            fila.appendChild(td);
        }
    }

    actualizarImagenAhorcado() {
        const img = document.getElementById("imagenAhorcado");
        if (!img) return;
        // Ajusta la ruta según la página
        if (this.esInicioUsuario) {
            img.src = "../../fotos/ahorcado" + this.errores + ".jpg";
        } else {
            img.src = "./fotos/ahorcado" + this.errores + ".jpg";
        }
    }

    mostrarLetrasCorrectas(letra) {
        for (let i = 0; i < this.palabraSecreta.length; i++) {
            if (this.palabraSecreta[i] === letra) {
                let el = document.getElementById(`letra-${i}`);
                if (el) el.textContent = letra;
                else console.error(`No se encontró el elemento letra-${i} para mostrar la letra correcta.`);
                this.letrasCorrectas[i] = letra;
            }
        }
    }

    verificarVictoria() {
        return this.letrasCorrectas.join("") === this.palabraSecreta;
    }

    marcarLetraUsada(letra, esCorrecta) {
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

    limpiarTeclado() {
        document.querySelectorAll(".tecla").forEach(td => {
            td.classList.remove("usada", "correcta", "incorrecta");
        });
    }

    manejarLetraIngresada(letra) {
        // Si ya la usó, no hacer nada
        if (this.letrasCorrectas.includes(letra) || this.letrasIncorrectas.includes(letra)) {
            return;
        }

        if (this.palabraSecreta.includes(letra)) {
            this.mostrarLetrasCorrectas(letra);
            this.marcarLetraUsada(letra, true);

            if (this.verificarVictoria()) {
                setTimeout(() => {
                    alert("¡Ganaste! 🎉");
                    this.elegirPalabraAleatoria();
                    this.reiniciarJuego();
                }, 100);
            }
        } else {
            this.letrasIncorrectas.push(letra);
            this.errores++;
            this.actualizarImagenAhorcado();
            this.marcarLetraUsada(letra, false);

            if (this.errores === 6) {
                setTimeout(() => {
                    alert("¡Perdiste!");
                    this.reiniciarJuego();
                }, 100);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Solo ejecuta si existen los elementos del juego
    const filaLetras = document.getElementById("filaLetras");
    const imagenAhorcado = document.getElementById("imagenAhorcado");
    const form = document.querySelector("form");
    if (filaLetras && imagenAhorcado && form) {
        const juego = new Ahorcado();
        juego.elegirPalabraAleatoria();
        juego.reiniciarJuego();

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const inputLetra = document.getElementById("letra");
            let letra = "";
            if (inputLetra) {
                letra = inputLetra.value.toUpperCase();
                inputLetra.value = "";
            } else {
                console.error('No se pudo encontrar el input con id "letra" para obtener el valor.');
            }

            if (letra.match(/^[A-ZÑ]$/)) {
                juego.manejarLetraIngresada(letra);
            }
        });
    }
});
