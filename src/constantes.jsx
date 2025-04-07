//Define constantes para los turnos de los jugadores
export const TURNOS = { X: "❌", O: "⚪" };

//Lista de combinaciones ganadoras del tablero
export const COMBO_GANADOR = [
  //Fila de arriba
  [0, 1, 2],
  //Fila del medio
  [3, 4, 5],
  //Fila de abajo
  [6, 7, 8],
  //Columna izquierda
  [0, 3, 6],
  //Columna del medio
  [1, 4, 7],
  //Columna derecha
  [2, 5, 8],
  //Diagonal de arriba a izquierda
  [0, 4, 8],
  //Diagonal de arriba a derecha
  [2, 4, 6],
];
