import { cartas, Carta, Tablero } from "./modelo";

// Método para barajar las cartas

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  return cartas
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export let cartasBarajadas = barajarCartas([...cartas]);

// Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  if (indice !== undefined && tablero.cartas[indice]) {
    return !tablero.cartas[indice].estaVuelta &&
      !tablero.cartas[indice].encontrada
      ? true
      : false;
  }
  return false; // Devuelve false si el índice no es válido o tablero.cartas[indice] no está definido
};

// Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  // No esta funcionando bien, repasar
  console.log("idFoto A:", tablero.cartas[indiceA].idFoto);
  console.log("idFoto B:", tablero.cartas[indiceB].idFoto);
  if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto) {
    return true;
  } else {
    return false;
  }
};

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  // esPartidaCompletada();
};

console.log(parejaEncontrada);

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].encontrada = false;
};
console.log(parejaNoEncontrada);

//Comprobar partida

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

// Iniciar partida

export const iniciaPartida = (tablero: Tablero): void => {
  // poner las cartas barajadas

  cartasBarajadas = barajarCartas([...cartas]);
  tablero.estadoPartida === "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA === undefined;
  tablero.indiceCartaVolteadaB === undefined;

  cartasBarajadas.forEach((carta) => {
    carta.estaVuelta = false;
  });
};
