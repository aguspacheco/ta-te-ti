import { COMBO_GANADOR } from "../constantes";

export const verificarGanador = (bordeVerifica) => {
  for (const combo of COMBO_GANADOR) {
    const [a, b, c] = combo;
    if (
      bordeVerifica[a] &&
      bordeVerifica[a] === bordeVerifica[b] &&
      bordeVerifica[a] === bordeVerifica[c]
    ) {
      return bordeVerifica[a];
    }
  }
  return null;
};

export const verificarJuegoTerminado = (nuevoBorde) => {
  return nuevoBorde.every((cuadrado) => cuadrado !== null);
};
