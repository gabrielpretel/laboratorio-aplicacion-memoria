import { resetearDivsCartas } from "./ui";
import { iniciaPartida } from "./motor";
import { tableroBarajado } from "./motor";

const botonIniciarPartida = document.getElementById("boton-inicio-partida");

botonIniciarPartida?.addEventListener("click", () => {
  iniciaPartida(tableroBarajado);
  resetearDivsCartas();
});
