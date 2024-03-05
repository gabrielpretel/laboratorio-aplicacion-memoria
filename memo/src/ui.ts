import { tablero } from "./modelo";
import { iniciaPartida } from "./motor";

const botonIniciarPartida = document.getElementById("boton-inicio-partida");

botonIniciarPartida?.addEventListener("click", () => {
  iniciaPartida(tablero);
});
