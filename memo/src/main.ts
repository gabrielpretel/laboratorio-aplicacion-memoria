import { cartas, tablero } from "./modelo";
import { cartasBarajadas, sePuedeVoltearLaCarta } from "./motor";

console.log(cartas);

console.log("Array original:", cartas);
console.log("Array barajado:", cartasBarajadas);

console.log(tablero);
console.log(sePuedeVoltearLaCarta(tablero, 12))

const divsCarta = document.querySelectorAll(".carta");
  
  divsCarta.forEach((div) => {
    div.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;
  
      const indiceId = target.dataset.indiceId;
      if (indiceId !== undefined) {
        cambiarImagen(indiceId);
      }
    });
  });
  
  const cambiarImagen = (indice: string) => {
    const indiceArrayNumber = parseInt(indice, 10);
    const indiceCapturado = `img[data-indice-id="${indice}"]`;
    const divConIndice = document.querySelector(indiceCapturado);
    if (divConIndice && divConIndice instanceof HTMLImageElement) {
      divConIndice.src = cartasBarajadas[indiceArrayNumber].imagen;
    }
  };


  
