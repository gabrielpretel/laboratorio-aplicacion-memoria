import { tablero, crearTableroInicial } from "./modelo";
import { iniciaPartida, cartasBarajadas, sePuedeVoltearLaCarta } from "./motor";

const divsCarta = document.querySelectorAll(".carta");
const imagenCarta = document.querySelectorAll("img");
const botonIniciarPartida = document.getElementById("boton-inicio-partida");

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
    let volteable;

    if (indiceId) {
      const indiceIdNumber = parseInt(indiceId);
      volteable = sePuedeVoltearLaCarta(tablero, indiceIdNumber);
    }

    if (indiceId !== undefined && volteable) {
      cambiarImagen(indiceId);
    }else{
      console.error("La carta no es volteable");
    }

    target.classList.remove("carta-no-volteada");
    setTimeout(() => {
      target.classList.add("carta-volteada");
    }, 10);
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
