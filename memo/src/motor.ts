import { Carta, Tablero, tablero, EstadoPartida } from "./modelo";

// Método para barajar las cartas

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  return cartas
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export let cartasBarajadas = barajarCartas([...tablero.cartas]);

export let tableroBarajado = {
  ...tablero,
  cartas: cartasBarajadas,
};

const { cartas } = tableroBarajado;

export const cambioEstadoPartida = (
  tablero: Tablero,
  estado: EstadoPartida
) => {
  tablero.estadoPartida = estado;
};

export const convertirIndiceEnNumero = (indice: string): number => {
  return parseInt(indice);
};

export const cambiarEstaVuelta = (carta: number) => {
  tableroBarajado.cartas[carta] = {
    ...tableroBarajado.cartas[carta],
    estaVuelta: true,
  };
};

export const cambioEstaVueltaFalse = (
  indiceA: number,
  indiceB: number
): void => {
  if (cartas[indiceA] && cartas[indiceB]) {
    cartas[indiceA].estaVuelta = false;
    cartas[indiceB].estaVuelta = false;
  } else {
    console.error("Uno o ambos índices son inválidos.", { indiceA, indiceB });
  }
};

// Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas

export const sePuedeVoltearLaCarta = (
  tableroBarajado: Tablero,
  indice: number
): boolean => {
  if (indice !== undefined && tableroBarajado.cartas[indice]) {
    return (
      tableroBarajado.cartas[indice].estaVuelta === false &&
      tableroBarajado.cartas[indice].encontrada === false
    );
  }
  return false;
};

// Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tableroBarajado: Tablero
): boolean => {
  const { cartas } = tableroBarajado;

  return cartas[indiceA].idFoto === cartas[indiceB].idFoto;
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
  tablero.cartas[indiceA].encontrada = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.cartas[indiceB].encontrada = false;
};

//Comprobar partida

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

// Iniciar partida

export const iniciaPartida = (tableroAResetear: Tablero): void => {
  const cartasBarajadas = barajarCartas([...tablero.cartas]);
  tableroBarajado = {
    ...tableroAResetear,
    cartas: cartasBarajadas,
    estadoPartida: "CeroCartasLevantadas",
    indiceCartaVolteadaA: undefined,
    indiceCartaVolteadaB: undefined,
  };
};
