interface Cartas {
    src: string;
    volteada: boolean;
  }
  
  const cartas: Cartas[] = [
    {
      src: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
      volteada: false,
    },
    {
      src: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
      volteada: false,
    },
  ];
  
  const divCarta1 = document.getElementById("carta-1");
  const divCarta2 = document.getElementById("carta-2");
  const iconoCarta1 = document.getElementById("icono-carta-1");
  const iconoCarta2 = document.getElementById("icono-carta-2");
  
  const voltearCarta1 = () => {
    if (iconoCarta1 && iconoCarta1 instanceof HTMLImageElement) {
      cartas[0].volteada = true;
      setTimeout(() => {
        iconoCarta1.src = cartas[0].src;
      }, 200);
    }
    if (divCarta1 && divCarta1 instanceof HTMLDivElement) {
      divCarta1.classList.add("carta-volteada");
    }
    comprobarVolteadas();
  };
  
  const voltearCarta2 = () => {
    if (divCarta2 && divCarta2 instanceof HTMLDivElement) {
      divCarta2.classList.add("carta-volteada");
    }
  
    if (iconoCarta2 && iconoCarta2 instanceof HTMLImageElement) {
      cartas[1].volteada = true;
      setTimeout(() => {
        iconoCarta2.src = cartas[1].src;
      }, 200);
    }
    comprobarVolteadas();
  };
  
  const comprobarVolteadas = () => {
    if (
      divCarta1 &&
      divCarta2 &&
      iconoCarta1 &&
      iconoCarta2 &&
      divCarta1 instanceof HTMLDivElement &&
      divCarta2 instanceof HTMLDivElement &&
      iconoCarta1 instanceof HTMLImageElement &&
      iconoCarta2 instanceof HTMLImageElement
    ) {
      if (cartas[0].volteada  && cartas[1].volteada) {
        setTimeout(() => {
          divCarta1.classList.remove("carta-volteada");
          iconoCarta1.src = "";
          divCarta2.classList.remove("carta-volteada");
          iconoCarta2.src = "";
          cartas[0].volteada = false;
          cartas[1].volteada = false;
        }, 1500);
      }
    }
  };
  
  divCarta1?.addEventListener("click", voltearCarta1);
  divCarta2?.addEventListener("click", voltearCarta2);
  