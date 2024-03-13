import { EstadoPartida } from "./modelo";
import {
  sePuedeVoltearLaCarta,
  sonPareja,
  tableroBarajado,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta,
  cambioEstadoPartida,
  cambiarEstaVuelta,
  cambioEstaVueltaFalse,
} from "./motor";

/* 

- Hay un error al pulsar el boton empezar partida, si haces click dos veces en la misma carta no sale el mensaje de que la carta ya esta levantada. Esto no ocurre si no se pulsa.

*/

export const divsCarta = document.querySelectorAll(".carta");
const imagenCarta = document.querySelectorAll("img");
export const botonIniciarPartida = document.getElementById(
  "boton-inicio-partida"
);
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

export const manejarClickCarta = (indiceIdNumero: number) => {
  const { estadoPartida } = tableroBarajado;

  // Comprobamos el estado y si es volteable ejecutamos el volteo
  if (
    estadoPartida === "PartidaNoIniciada" ||
    estadoPartida === "CeroCartasLevantadas"
  ) {
    if (sePuedeVoltearLaCarta(tableroBarajado, indiceIdNumero)) {
      prepararCartaParaVoltear(indiceIdNumero, "UnaCartaLevantada");
    }
  } else if (estadoPartida === "UnaCartaLevantada") {
    if (tableroBarajado.indiceCartaVolteadaA !== indiceIdNumero) {
      prepararCartaParaVoltear(indiceIdNumero, "DosCartasLevantadas");
      verificarPareja();
    }
  }
};

export const pintarMensaje = (texto: string): void => {
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

const prepararCartaParaVoltear = (
  indiceIdNumero: number,
  nuevoEstado: EstadoPartida
) => {
  //Guardamos el indice en una nueva variable
  cambiarImagen(indiceIdNumero);
  cambiarClaseLevantada(indiceIdNumero);

  //Actualizamos la propiedad estaVuelta de la cartaA
  cambiarEstaVuelta(indiceIdNumero);

  //Guardamos el indice en carta A o B
  if (nuevoEstado === "UnaCartaLevantada") {
    tableroBarajado.indiceCartaVolteadaA = indiceIdNumero;
  } else {
    tableroBarajado.indiceCartaVolteadaB = indiceIdNumero;
  }

  cambioEstadoPartida(tableroBarajado, nuevoEstado);
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

export const sumaIntentos = (intentos: number) => {
  const mensajeIntentos = document.getElementById("intentos");
  contadorIntentos = intentos + 1;

  if (mensajeIntentos && mensajeIntentos instanceof HTMLParagraphElement) {
    mensajeIntentos.textContent = `${contadorIntentos}`;
  }
};

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
    divConIndiceA instanceof HTMLDivElement &&
    divConIndiceB instanceof HTMLDivElement
  ) {
    divConIndiceA.classList.add("encontrada");
    divConIndiceB.classList.add("encontrada");
  }
};

const verificarPareja = () => {
  const { indiceCartaVolteadaA, indiceCartaVolteadaB } = tableroBarajado;

  if (indiceCartaVolteadaA !== undefined && indiceCartaVolteadaB) {
    const sonParejaResultado = sonPareja(
      indiceCartaVolteadaA,
      indiceCartaVolteadaB,
      tableroBarajado
    );
    if (sonParejaResultado) {
      parejaEncontrada(
        tableroBarajado,
        indiceCartaVolteadaA,
        indiceCartaVolteadaB
      );
      iluminarCartasEncontrada(indiceCartaVolteadaA, indiceCartaVolteadaB);
      sumaIntentos(contadorIntentos);

      // Comprobamos la partida
      if (esPartidaCompleta(tableroBarajado))
        pintarMensaje("¡HAS GANADO LA PARTIDA!");
    } else {
      parejaNoEncontrada(
        tableroBarajado,
        indiceCartaVolteadaA,
        indiceCartaVolteadaB
      );
      sumaIntentos(contadorIntentos);
      setTimeout(() => {
        revertirCartas(indiceCartaVolteadaA, indiceCartaVolteadaB);
      }, 1000);
    }

    //Reseteamos los indices y estado de partida, timeOut para el tercer click
    tableroBarajado.indiceCartaVolteadaA = undefined;
    tableroBarajado.indiceCartaVolteadaB = undefined;
    setTimeout(() => {
      cambioEstadoPartida(tableroBarajado, "CeroCartasLevantadas");
    }, 1100);
  }
};

const revertirCartas = (
  indiceCartaVolteadaA: number,
  indiceCartaVolteadaB: number
) => {
  //No son pareja, por lo que cambiamos su clase a volteada y reseteamos url
  cambiarClaseVolteada(indiceCartaVolteadaA);
  cambiarClaseVolteada(indiceCartaVolteadaB);
  cambiarImagenVuelta(indiceCartaVolteadaA, indiceCartaVolteadaB);

  // Y cambiamos la propiedad esta vuelta de cada carta a false
  cambioEstaVueltaFalse(indiceCartaVolteadaA, indiceCartaVolteadaB);
};
