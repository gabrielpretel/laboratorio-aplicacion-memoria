import { iniciaPartida, sePuedeVoltearLaCarta, tableroBarajado } from "./motor";

const divsCarta = document.querySelectorAll(".carta");
const imagenCarta = document.querySelectorAll("img");
const botonIniciarPartida = document.getElementById("boton-inicio-partida");

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

      //Actualizamos la propiedad estaVuelta de la carta
      tableroBarajado.cartas[cartaA] = {
        ...tableroBarajado.cartas[cartaA],
        estaVuelta: true,
      };

      //Actualizamos el estado de la partida y añadimos la cartaA al tablero
      tableroBarajado.estadoPartida = "UnaCartaLevantada";
      tableroBarajado.indiceCartaVolteadaA = cartaA;
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

      //Actualizamos la propiedad estaVuelta de la carta
      tableroBarajado.cartas[cartaB] = {
        ...tableroBarajado.cartas[cartaB],
        estaVuelta: true,
      };

      //Actualizamos el estado de la partida y añadimos la cartaA al tablero

      setTimeout(() => {
        tableroBarajado.estadoPartida = "DosCartasLevantadas";
      }, 500);
      tableroBarajado.indiceCartaVolteadaB = cartaB;
    }
  });
});

const cambiarImagen = (indice: number) => {
  setTimeout(() => {
    const indiceCapturado = `img[data-indice-id="${indice}"]`;
    const divConIndice = document.querySelector(indiceCapturado);
    if (divConIndice && divConIndice instanceof HTMLImageElement) {
      divConIndice.src = tableroBarajado.cartas[indice].imagen;
    }
  }, 200);
};
