interface InfoCarta {
    idFoto: number;
    imagen: string;
  }
  
  const arrayCartas: InfoCarta[] = [
    {
      idFoto: 1,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
    },
    {
      idFoto: 2,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
    },
    {
      idFoto: 3,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
    },
    {
      idFoto: 4,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
    },
    {
      idFoto: 5,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
    },
    {
      idFoto: 6,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
    },
    {
      idFoto: 7,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
    },
    {
      idFoto: 8,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
    },
    {
      idFoto: 9,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
    },
    {
      idFoto: 10,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
    },
    {
      idFoto: 11,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
    },
    {
      idFoto: 12,
      imagen:
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
    },
  ];
  
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
      divConIndice.src = arrayCartas[indiceArrayNumber].imagen;
    }
  };
  