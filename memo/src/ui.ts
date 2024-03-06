import { tablero, crearTableroInicial } from "./modelo";
import {
  iniciaPartida,
  cartasBarajadas,
  sePuedeVoltearLaCarta,
  sonPareja,
} from "./motor";

const divsCarta = document.querySelectorAll(".carta");
const imagenCarta = document.querySelectorAll("img");
const botonIniciarPartida = document.getElementById("boton-inicio-partida");
let { cartas, estadoPartida, indiceCartaVolteadaA, indiceCartaVolteadaB } =
  tablero;

botonIniciarPartida?.addEventListener("click", () => {
  crearTableroInicial();
  iniciaPartida(tablero);
  resetearDivsCartas();
});

const resetearDivsCartas = () => {
  divsCarta.forEach((div) => {
    div.classList.remove("carta-volteada");
    div.classList.add("carta-no-volteada");
  });

  imagenCarta.forEach((img) => {
    img.src = "";
  });
};

divsCarta.forEach((div) => {
  div.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
    const indiceId = target.dataset.indiceId;
    let indiceIdNumber;
    let volteable;

    if (indiceId) {
      indiceIdNumber = parseInt(indiceId);
      volteable = sePuedeVoltearLaCarta(tablero, indiceIdNumber);
    }
    // console.log({ indiceId, indiceIdNumber, volteable });
    if (
      indiceId !== undefined &&
      indiceId !== null &&
      volteable &&
      indiceIdNumber !== undefined
    ) {
      cambiarImagen(indiceId);
      // Actualiza la propiedad estaVuelta de la carta a true
      cartas[indiceIdNumber] = {
        ...cartas[indiceIdNumber],
        estaVuelta: true,
      };

      // Actualiza el estado a una carta levantada
      if (estadoPartida === "UnaCartaLevantada") {
        estadoPartida = "DosCartasLevantadas";
        indiceCartaVolteadaB = indiceIdNumber;

        // TODO: Comprobar si las dos cartas son iguales
        if (indiceCartaVolteadaA && indiceCartaVolteadaB) {
          const parejas = sonPareja(
            indiceCartaVolteadaA,
            indiceCartaVolteadaB,
            tablero
          );

          if (parejas === true){
            console.log("son pareja");
          }else{
            // Voltear las cartas al origen y reestablecer valores
            console.log ("no son pareja");
            estadoPartida = "CeroCartasLevantadas";
            indiceCartaVolteadaA = undefined;
            indiceCartaVolteadaB = undefined;
          }
        }
      }

      if (
        estadoPartida === "CeroCartasLevantadas" ||
        estadoPartida === "PartidaNoIniciada"
      ) {
        estadoPartida = "UnaCartaLevantada";
        indiceCartaVolteadaA = indiceIdNumber;
      }

      console.log(estadoPartida);
      console.log(indiceCartaVolteadaA);
      console.log(indiceCartaVolteadaB);

      // cambia la clase de la carta volteada
      target.classList.remove("carta-no-volteada");
      setTimeout(() => {
        target.classList.add("carta-volteada");
      }, 10);
    } else {
      console.error("La carta no es volteable");
    }
  });
});

const cambiarImagen = (indice: string) => {
  setTimeout(() => {
    const indiceArrayNumber = parseInt(indice, 10);
    const indiceCapturado = `img[data-indice-id="${indice}"]`;
    const divConIndice = document.querySelector(indiceCapturado);
    if (divConIndice && divConIndice instanceof HTMLImageElement) {
      divConIndice.src = cartasBarajadas[indiceArrayNumber].imagen;
    }
  }, 200);
};
