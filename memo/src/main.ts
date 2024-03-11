import {botonIniciarPartida, resetearDivsCartas, sumaIntentos} from "./ui";
import { iniciaPartida, tableroBarajado } from "./motor";

if (botonIniciarPartida && botonIniciarPartida instanceof HTMLButtonElement) {
  botonIniciarPartida?.addEventListener("click", () => {
    iniciaPartida(tableroBarajado);
    resetearDivsCartas();
    sumaIntentos(-1);
  });
}