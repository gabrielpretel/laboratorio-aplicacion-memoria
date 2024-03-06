import { cartas, tablero } from "./modelo";
import { cartasBarajadas, sePuedeVoltearLaCarta } from "./motor";
import './ui';


console.log(cartas);

console.log("Array original:", cartas);
console.log("Array barajado:", cartasBarajadas);

console.log(tablero);
console.log(sePuedeVoltearLaCarta(tablero, 12));

