import {
  iniciaPartida,
  sePuedeVoltearLaCarta,
  sonPareja,
  tableroBarajado,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta,
} from "./motor";

const divsCarta = document.querySelectorAll(".carta");
const imagenCarta = document.querySelectorAll("img");
const botonIniciarPartida = document.getElementById("boton-inicio-partida");
const { cartas } = tableroBarajado;

botonIniciarPartida?.addEventListener("click", () => {
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

// Hasta aqui esta todo correcto

const convertirIndiceEnNumero = (indice: string): number => {
  return parseInt(indice);
};

const cambiarClaseLevantada = (carta: number): void => {
  setTimeout(() => {
    const indiceDivA = `div[data-indice-id="${carta}"]`;
    const divConIndiceA = document.querySelector(indiceDivA);
    divConIndiceA?.classList.add("carta-volteada");
    divConIndiceA?.classList.remove("carta-no-volteada");
  }, 10);
};

const cambiarClaseVolteada = (carta: number): void => {
  setTimeout(() => {
    const indiceDivA = `div[data-indice-id="${carta}"]`;
    const divConIndiceA = document.querySelector(indiceDivA);
    divConIndiceA?.classList.add("carta-no-volteada");
    divConIndiceA?.classList.remove("carta-volteada");
  }, 10);
};

divsCarta.forEach((div) => {
  div.addEventListener("click", (event) => {
    const targetCarta = event.target as HTMLElement;
    const indiceId = targetCarta.dataset.indiceId;
    let indiceIdNumero;
    let volteable = false;

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
      //Guardamos el indice en una nueva variable
      const cartaB = indiceIdNumero;

      //Cambiamos la imagen a la de la carta
      cambiarImagen(cartaB);

      //añadimos clase volteada y quitamos la no volteada, el timeOut es para que la transicion y la animacion del hover no entren en conflicto
      cambiarClaseLevantada(cartaB);

      //Actualizamos la propiedad estaVuelta de la cartaB
      cartas[cartaB] = {
        ...cartas[cartaB],
        estaVuelta: true,
      };

      //Actualizamos el estado de la partida y añadimos la cartaB al tablero
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
          console.log("Sí son pareja, has acertado");
          parejaEncontrada(
            tableroBarajado,
            tableroBarajado.indiceCartaVolteadaA,
            tableroBarajado.indiceCartaVolteadaB
          );

          //Comprobamos si se ha ganado la partida
          const partidaCompleta = esPartidaCompleta(tableroBarajado);
          if (partidaCompleta) {
            console.log("HAS GANADO!");
          }
          // Cambiamos el estado de la partida para poder continuar
          tableroBarajado.estadoPartida = "CeroCartasLevantadas";

          //Reseteamos los indices
          tableroBarajado.indiceCartaVolteadaA = undefined;
          tableroBarajado.indiceCartaVolteadaB = undefined;
          indiceIdNumero = undefined;
        } else {
          console.log("No son pareja");
          parejaNoEncontrada(
            tableroBarajado,
            tableroBarajado.indiceCartaVolteadaA,
            tableroBarajado.indiceCartaVolteadaB
          );

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
              tableroBarajado.estadoPartida = "CeroCartasLevantadas";

              // Y cambiamos la propiedad esta vuelta de cada carta a false
              cartas[tableroBarajado.indiceCartaVolteadaA].estaVuelta = false;
              cartas[tableroBarajado.indiceCartaVolteadaB].estaVuelta = false;

              //Reseteamos los indices
              tableroBarajado.indiceCartaVolteadaA = undefined;
              tableroBarajado.indiceCartaVolteadaB = undefined;
              indiceIdNumero = undefined;
            }
          }, 1000);
        }
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

      //Cambiamos la imagen a la de la carta
      cambiarImagen(cartaA);

      //añadimos clase volteada y quitamos la no volteada, el timeOut es para que la transicion y la animacion del hover no entren en conflicto
      cambiarClaseLevantada(cartaA);

      //Actualizamos la propiedad estaVuelta de la cartaA
      cartas[cartaA] = {
        ...cartas[cartaA],
        estaVuelta: true,
      };

      //Actualizamos el estado de la partida y añadimos la cartaA al tablero
      tableroBarajado.indiceCartaVolteadaA = cartaA;
      tableroBarajado.estadoPartida = "UnaCartaLevantada";
      console.log(tableroBarajado.estadoPartida);
    }

    // Tercer click con dos cartas ya levantadas

    if (
      tableroBarajado.estadoPartida === "UnaCartaLevantada" &&
      tableroBarajado.indiceCartaVolteadaB &&
      tableroBarajado.indiceCartaVolteadaA !== undefined &&
      tableroBarajado.indiceCartaVolteadaB !== undefined
    ) {
      tableroBarajado.estadoPartida = "DosCartasLevantadas";
    }
  });
});

const cambiarImagen = (indice: number): void => {
  setTimeout(() => {
    const indiceCapturado = `img[data-indice-id="${indice}"]`;
    const divConIndice = document.querySelector(indiceCapturado);
    if (divConIndice && divConIndice instanceof HTMLImageElement) {
      divConIndice.src = cartas[indice].imagen;
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
