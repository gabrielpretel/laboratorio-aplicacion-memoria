import { crearTableroInicial } from "./modelo";
import {
  iniciaPartida,
  cartasBarajadas,
  sePuedeVoltearLaCarta,
  sonPareja,
  tableroBarajado,
} from "./motor";

const divsCarta = document.querySelectorAll(".carta");
const imagenCarta = document.querySelectorAll("img");
const botonIniciarPartida = document.getElementById("boton-inicio-partida");
let { cartas, estadoPartida, indiceCartaVolteadaA, indiceCartaVolteadaB } =
  tableroBarajado;

botonIniciarPartida?.addEventListener("click", () => {
  crearTableroInicial();
  iniciaPartida(tableroBarajado);
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
  div.addEventListener("click", (event) => {
    
    const target = event.target as HTMLElement;
    const indiceId = target.dataset.indiceId;
    let indiceIdNumber;
    let volteable = true;
    
    if (indiceId) {
      indiceIdNumber = parseInt(indiceId);
      volteable = sePuedeVoltearLaCarta(tableroBarajado, indiceIdNumber);
    }
    console.log(estadoPartida);
    if (
      indiceId !== undefined &&
      indiceId !== null &&
      volteable &&
      indiceIdNumber !== undefined
    ) {
      cambiarImagen(indiceId);
      cartas[indiceIdNumber] = {
        ...cartas[indiceIdNumber],
        estaVuelta: true,
      };

      if (estadoPartida === "UnaCartaLevantada") {
        estadoPartida = "DosCartasLevantadas";
        indiceCartaVolteadaB = indiceIdNumber;
        console.log(indiceCartaVolteadaB);
        console.log("Aqui deberia haber cambiado a Dos Cartas", estadoPartida);

        let parejas = false;

        if (
          indiceCartaVolteadaA &&
          indiceCartaVolteadaB &&
          parejas !== undefined
        ) {
          parejas = sonPareja(
            indiceCartaVolteadaA,
            indiceCartaVolteadaB,
            tableroBarajado
          );
        }

        if (parejas === true && indiceCartaVolteadaA) {
          console.log("son pareja");
          cartas[indiceCartaVolteadaA].encontrada = true;
          cartas[indiceCartaVolteadaB].encontrada = true;
        } else {
          console.log("no son pareja");

          const indiceA = indiceCartaVolteadaA;
          const indiceB = indiceCartaVolteadaB;

          estadoPartida = "CeroCartasLevantadas";
          indiceCartaVolteadaA = undefined;
          indiceCartaVolteadaB = undefined;
          if (indiceA && indiceB) {
            cartas[indiceA] = {
              ...cartas[indiceA],
              estaVuelta: false,
            };
            cartas[indiceB] = {
              ...cartas[indiceB],
              estaVuelta: false,
            };
          }

          const indiceDivA = `div[data-indice-id="${indiceA}"]`;
          const divConIndiceA = document.querySelector(indiceDivA);

          //Devolver las clases iniciales a las cartas con indiceA y B

          if (divConIndiceA) {
            setTimeout(() => {
              const indiceCapturadoA = `img[data-indice-id="${indiceA}"]`;
              const indiceCapturadoB = `img[data-indice-id="${indiceB}"]`;
              const imgConIndiceA = document.querySelector(indiceCapturadoA);
              const imgConIndiceB = document.querySelector(indiceCapturadoB);

              if (divConIndiceA) {
                target.classList.remove("carta-volteada");
                target.classList.add("carta-no-volteada");
                divConIndiceA.classList.remove("carta-volteada");
                divConIndiceA.classList.add("carta-no-volteada");
              }
              if (
                imgConIndiceA &&
                imgConIndiceB &&
                imgConIndiceA instanceof HTMLImageElement &&
                imgConIndiceB instanceof HTMLImageElement
              ) {
                imgConIndiceA.src = "";
                imgConIndiceB.src = "";
              }
            }, 1000);
          }

          // Reestablecer indices
        }
      } // Esta llave cierra el if (estadoPartida === "UnaCartaLevantada")

      if (
        estadoPartida === "CeroCartasLevantadas" ||
        estadoPartida === "PartidaNoIniciada"
      ) {
        estadoPartida = "UnaCartaLevantada";
        indiceCartaVolteadaA = indiceIdNumber;
        console.log(indiceCartaVolteadaA);
      }

      

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
