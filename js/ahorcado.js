class Ahorcado {
    /*Clase que maneja la logica del juego*/ 
    constructor() {
        this.palabras = ["ÑOQUIS", "GATO", "PERRO", "CASA", "LUNA", "SOL", "RATON", "ARBOL", "FLORES"];
        this.palabraSecreta = "";
        this.errores = 0;
        this.letrasIncorrectas = [];
        this.letrasCorrectas = [];
        //Detecta si está en index o en inicio_usuario
        this.esInicioUsuario = window.location.pathname.includes("inicio_usuario.html");
    }

    elegirPalabraAleatoria() {
        /*Metodo que elige una palabra de la lista "palabras" y lo guarda en "palabraSecreta"*/
        this.palabraSecreta = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    }

    reiniciarJuego() {
        /*Metodo que repara todo para una nueva partida*/
        this.letrasCorrectas = Array(this.palabraSecreta.length).fill("");
        this.errores = 0;
        this.letrasIncorrectas = [];
        this.inicializarTablero();
        this.actualizarImagenAhorcado();
        this.limpiarTeclado();
    }

    inicializarTablero() {
        /*Metodo que vacia el tablero de la palabra secreta anterior y por cada letra de la nueva palabra secreta, 
        agrega una celda <td> con un guión bajo para mostrar las letras ocultas. Le da un id a cada letra*/
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
        /*Metodo que actualiza la imagen del ahorcado en base a los errores*/
        const img = document.getElementById("imagenAhorcado");
        if (!img) return;
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
        /*Metodo que une todas las letras correctas y compara si forman la palabra secreta*/
        return this.letrasCorrectas.join("") === this.palabraSecreta;
    }

    marcarLetraUsada(letra, esCorrecta) {
        /*Metodo que estiliza las letras del tablero*/
        const teclas = document.querySelectorAll(".tecla");
        teclas.forEach(td => {
            if (td.textContent.toUpperCase() === letra) {
                if (esCorrecta) {
                    td.classList.add("correcta");
                    td.classList.remove("incorrecta");
                } else {
                    td.classList.add("incorrecta");
                    td.classList.remove("correcta");
                }
            }
        });
    }

    limpiarTeclado() {
        /*Metodo que selecciona todos los elementos HTML de clase "tecla"
        los recorre y les remueve las clases CSS */
        document.querySelectorAll(".tecla").forEach(td => {
            td.classList.remove("correcta", "incorrecta");
        });
    }

    manejarLetraIngresada(letra) {
        /*Metodo que maneja la letra ingresada. Si la letra ya fue usada no hace nada
        Si la letra es parte de la palabra secreta muestra la letra y la marca en el tablero y verifica victoria.
        Sino la agrega a la lista de eltras incorrectas, suma un error, actualiza imagen y marca letra en el tablero. 
        Despues detecta si perdio */
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
