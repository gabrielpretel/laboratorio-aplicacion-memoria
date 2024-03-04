const divCarta = document.getElementById("carta");
const iconoCarta = document.getElementById("icono-carta");

const voltearCarta = () => {
  if (divCarta && divCarta instanceof HTMLDivElement) {
    divCarta.classList.add("carta-volteada");
  }

  if (iconoCarta && iconoCarta instanceof HTMLImageElement) {
    setTimeout(() => {
      iconoCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png";
    }, 200);
  }
};

divCarta?.addEventListener("click", voltearCarta);
