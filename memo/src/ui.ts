import {
  sePuedeVoltearLaCarta,
  sonPareja,
  tableroBarajado,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta,
  cambioEstadoPartida,
  convertirIndiceEnNumero,
  cambiarEstaVuelta,
  resetearIndices,
  cambioEstaVueltaFalse,
} from "./motor";

const divsCarta = document.querySelectorAll(".carta");
const imagenCarta = document.querySelectorAll("img");
export const botonIniciarPartida = document.getElementById("boton-inicio-partida");
let contadorIntentos: number = 0;

export const resetearDivsCartas = () => {
  divsCarta.forEach((div) => {
    div.classList.remove("carta-volteada", "encontrada");
    div.classList.add("carta-no-volteada");
  });

  imagenCarta.forEach((img) => {
    img.src = "";
  });
};

const cambiarClaseLevantada = (carta: number): void => {
  setTimeout(() => {
    const indiceDiv = `div[data-indice-id="${carta}"]`;
    const divConIndice = document.querySelector(indiceDiv);

    if (divConIndice && divConIndice instanceof HTMLDivElement) {
      divConIndice.classList.add("carta-volteada");
      divConIndice.classList.remove("carta-no-volteada");
    }
  }, 100);
};

const cambiarClaseVolteada = (carta: number): void => {
  setTimeout(() => {
    const indiceDiv = `div[data-indice-id="${carta}"]`;
    const divConIndice = document.querySelector(indiceDiv);

    if (divConIndice && divConIndice instanceof HTMLDivElement) {
      divConIndice.classList.add("carta-no-volteada");
      divConIndice.classList.remove("carta-volteada");
    }
  }, 10);
};

const pintarMensaje = (texto: string): void => {
  const mensaje = document.getElementById("mensaje");
  if (mensaje && mensaje instanceof HTMLParagraphElement) {
    mensaje.classList.add("mensaje");
    mensaje.textContent = texto;

    if (texto !== "¡HAS GANADO!") {
      setTimeout(() => {
        mensaje.textContent = "";
        mensaje.classList.remove("mensaje");
      }, 2000);
    }
  }
};

export const sumaIntentos = (intentos: number) => {
  contadorIntentos = intentos + 1;
  const mensajeIntentos = document.getElementById("intentos");

  if (mensajeIntentos && mensajeIntentos instanceof HTMLParagraphElement) {
    mensajeIntentos.textContent = `${contadorIntentos}`;
  }
};

divsCarta.forEach((div) => {
  div.addEventListener("click", (event): void => {
    const targetCarta = event.target as HTMLElement;
    const indiceId = targetCarta.dataset.indiceId;
    let indiceIdNumero: number | undefined;
    let volteable: boolean = false;

    if (indiceId && indiceId !== undefined) {
      indiceIdNumero = convertirIndiceEnNumero(indiceId);
      volteable = sePuedeVoltearLaCarta(tableroBarajado, indiceIdNumero);
    }

    // Segundo click. Comprobamos el estado de la partida
    if (
      volteable &&
      indiceIdNumero !== undefined &&
      tableroBarajado.estadoPartida === "UnaCartaLevantada"
    ) {
      const cartaB = indiceIdNumero;

      cambiarImagen(cartaB);
      cambiarClaseLevantada(cartaB);

      //Actualizamos la propiedad estaVuelta de la cartaB
      cambiarEstaVuelta(cartaB);

      // Añadimos la cartaB al tablero
      tableroBarajado.indiceCartaVolteadaB = cartaB;

      // Comprobamos si las cartas levantadas son pareja o no
      if (tableroBarajado.indiceCartaVolteadaA !== undefined) {
        const siSonPareja = sonPareja(
          tableroBarajado.indiceCartaVolteadaA,
          tableroBarajado.indiceCartaVolteadaB,
          tableroBarajado
        );
        //Actualizar la propiedad encontrada de ambas cartas
        if (siSonPareja) {
          parejaEncontrada(
            tableroBarajado,
            tableroBarajado.indiceCartaVolteadaA,
            tableroBarajado.indiceCartaVolteadaB
          );
          iluminarCartasEncontrada(
            tableroBarajado.indiceCartaVolteadaA,
            tableroBarajado.indiceCartaVolteadaB
          );
          sumaIntentos(contadorIntentos);

          //Comprobamos si se ha ganado la partida
          const partidaCompleta = esPartidaCompleta(tableroBarajado);
          if (partidaCompleta) {
            pintarMensaje("¡HAS GANADO!");
          }
          // Cambiamos el estado de la partida para poder continuar
          cambioEstadoPartida(tableroBarajado, "CeroCartasLevantadas");

          //Reseteamos los indices
          resetearIndices();
          indiceIdNumero = undefined;
        } else {
          parejaNoEncontrada(
            tableroBarajado,
            tableroBarajado.indiceCartaVolteadaA,
            tableroBarajado.indiceCartaVolteadaB
          );
          sumaIntentos(contadorIntentos);

          setTimeout(() => {
            if (
              tableroBarajado.indiceCartaVolteadaA !== undefined &&
              tableroBarajado.indiceCartaVolteadaB !== undefined
            ) {
              //No son pareja, por lo que cambiamos su clase a volteada
              cambiarClaseVolteada(tableroBarajado.indiceCartaVolteadaA);
              cambiarClaseVolteada(tableroBarajado.indiceCartaVolteadaB);
              //Cambiamos la ULR de las imagenes a carta volteada
              cambiarImagenVuelta(
                tableroBarajado.indiceCartaVolteadaA,
                tableroBarajado.indiceCartaVolteadaB
              );
              //Cambiamos el estado de la partida a CeroCartasLevantadas
              cambioEstadoPartida(tableroBarajado, "CeroCartasLevantadas");

              // Y cambiamos la propiedad esta vuelta de cada carta a false
              cambioEstaVueltaFalse(
                tableroBarajado.indiceCartaVolteadaA,
                tableroBarajado.indiceCartaVolteadaB
              );

              //Reseteamos los indices
              resetearIndices();
              indiceIdNumero = undefined;
            }
          }, 1000);
        }
      }
    } else {
      if (!volteable) {
        pintarMensaje("¡Esa carta ya está levantada!");
      }
    }

    // Si es volteable, volteamos la carta, y el estado de la partida es cero cartas levantadas o partida sin iniciar
    if (
      volteable &&
      indiceIdNumero !== undefined &&
      (tableroBarajado.estadoPartida === "CeroCartasLevantadas" ||
        tableroBarajado.estadoPartida === "PartidaNoIniciada")
    ) {
      //Guardamos el indice en una nueva variable
      const cartaA = indiceIdNumero;

      cambiarImagen(cartaA);
      cambiarClaseLevantada(cartaA);

      //Actualizamos la propiedad estaVuelta de la cartaA
      cambiarEstaVuelta(cartaA);

      //Actualizamos el estado de la partida y añadimos la cartaA al tablero
      tableroBarajado.indiceCartaVolteadaA = cartaA;
      cambioEstadoPartida(tableroBarajado, "UnaCartaLevantada");
    }

    // Tercer click con dos cartas ya levantadas

    if (
      tableroBarajado.estadoPartida === "UnaCartaLevantada" &&
      tableroBarajado.indiceCartaVolteadaB &&
      tableroBarajado.indiceCartaVolteadaA !== undefined &&
      tableroBarajado.indiceCartaVolteadaB !== undefined
    ) {
      cambioEstadoPartida(tableroBarajado, "DosCartasLevantadas");
    }
  });
});

const cambiarImagen = (indice: number): void => {
  setTimeout(() => {
    const indiceCapturado = `img[data-indice-id="${indice}"]`;
    const divConIndice = document.querySelector(indiceCapturado);

    if (divConIndice && divConIndice instanceof HTMLImageElement) {
      divConIndice.src = tableroBarajado.cartas[indice].imagen;
    }
  }, 200);
};

const cambiarImagenVuelta = (indiceA: number, indiceB: number): void => {
  const indiceCapturadoA = `img[data-indice-id="${indiceA}"]`;
  const divConIndiceA = document.querySelector(indiceCapturadoA);
  const indiceCapturadoB = `img[data-indice-id="${indiceB}"]`;
  const divConIndiceB = document.querySelector(indiceCapturadoB);
  if (
    divConIndiceA &&
    divConIndiceB &&
    divConIndiceA instanceof HTMLImageElement &&
    divConIndiceB instanceof HTMLImageElement
  ) {
    divConIndiceA.src = "";
    divConIndiceB.src = "";
  }
};

const iluminarCartasEncontrada = (indiceA: number, indiceB: number): void => {
  const indiceCapturadoA = `div[data-indice-id="${indiceA}"]`;
  const divConIndiceA = document.querySelector(indiceCapturadoA);
  const indiceCapturadoB = `div[data-indice-id="${indiceB}"]`;
  const divConIndiceB = document.querySelector(indiceCapturadoB);

  if (
    divConIndiceA &&
    divConIndiceB &&
    divConIndiceA instanceof HTMLImageElement &&
    divConIndiceB instanceof HTMLImageElement
  ) {
    divConIndiceA.classList.add("encontrada");
    divConIndiceB.classList.add("encontrada");
  }
};
