const barajarCartas = (array: number[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const misCartas: number[] = [1, 2, 3, 4, 5];
console.log("Array original:", misCartas);
const arrayBarajado = barajarCartas([...misCartas]);
console.log("Array barajado:", arrayBarajado);
