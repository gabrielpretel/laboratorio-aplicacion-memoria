import {
  botonIniciarPartida,
  resetearDivsCartas,
  sumaIntentos,
  divsCarta,
  pintarMensaje,
  manejarClickCarta,
} from "./ui";
import {
  iniciaPartida,
  tableroBarajado,
  convertirIndiceEnNumero,
  sePuedeVoltearLaCarta,
} from "./motor";

if (botonIniciarPartida && botonIniciarPartida instanceof HTMLButtonElement) {
  botonIniciarPartida?.addEventListener("click", () => {
    iniciaPartida(tableroBarajado);
    resetearDivsCartas();
    sumaIntentos(-1);
  });
}

const mapDivsCartas = () => {
  // Captura de la carta clickada y comprobación de partida
  divsCarta.forEach((div) => {
    div.addEventListener("click", (event): void => {
      if (tableroBarajado.estadoPartida !== "PartidaNoIniciada") {
        const targetCarta = event.target as HTMLElement;
        const indiceId = targetCarta.dataset.indiceId;
        let indiceIdNumero: number = 0;

        if (indiceId) {
          indiceIdNumero = convertirIndiceEnNumero(indiceId);
        }
        const volteable = sePuedeVoltearLaCarta(
          tableroBarajado,
          indiceIdNumero
        );
        if (
          !volteable &&
          tableroBarajado.estadoPartida === "UnaCartaLevantada"
        ) {
          pintarMensaje("Esa carta ya está levantada");
        }

        manejarClickCarta(indiceIdNumero);
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", mapDivsCartas);
