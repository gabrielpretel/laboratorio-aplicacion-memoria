import { cartas, Carta, Tablero, tablero } from "./modelo";

// Método para barajar las cartas

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  return cartas
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export let cartasBarajadas = barajarCartas([...cartas]);

export let tableroBarajado = {
  ...tablero,
  cartas: cartasBarajadas,
};

// Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas

export const sePuedeVoltearLaCarta = (
  tableroBarajado: Tablero,
  indice: number
): boolean => {
  if (indice !== undefined && tableroBarajado.cartas[indice]) {
    if (
      (tableroBarajado.cartas[indice].estaVuelta === false &&
        tableroBarajado.cartas[indice].encontrada === false) ||
      tableroBarajado.estadoPartida === "DosCartasLevantadas"
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false; // Devuelve false si el índice no es válido o tablero.cartas[indice] no está definido
};

// Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tableroBarajado: Tablero
): boolean => {
  if (
    tableroBarajado.cartas[indiceA].idFoto ===
    tableroBarajado.cartas[indiceB].idFoto
  ) {
    return true;
  } else {
    return false;
  }
};

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
};

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (
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

export const iniciaPartida = (tableroAResetear: Tablero): void => {
  cartasBarajadas = barajarCartas([...cartas]);
  tableroBarajado = {
    ...tableroAResetear,
    cartas: cartasBarajadas,
    estadoPartida: "CeroCartasLevantadas",
    indiceCartaVolteadaA: undefined,
    indiceCartaVolteadaB: undefined,
  };
  console.log(tableroBarajado);
};
