//Importa la constante que tiene todas las combianciones para ganar
import { COMBO_GANADOR } from "../constantes";

//Verifica si hay un ganador en el tablero actual
export const verificarGanador = (bordeVerifica) => {
  //Recorre cada combinacion ganadora posible
  for (const combo of COMBO_GANADOR) {
    //Extrae las posiciones de la combinacion
    const [a, b, c] = combo;
    //Verifica que la posicion no este vacia, compara la primera con la segunda y compara la primera con la tercera
    if (
      bordeVerifica[a] &&
      bordeVerifica[a] === bordeVerifica[b] &&
      bordeVerifica[a] === bordeVerifica[c]
    ) {
      //Si hay concidencia devuelve el simbolo del ganador
      return bordeVerifica[a];
    }
  }
  //Si no hay ninguna combinacion devuelve null
  return null;
};

//Verifica si el tablero esta lleno
export const verificarJuegoTerminado = (nuevoBorde) => {
  //Verifica que todos los elementos del array cumplan la condicion
  return nuevoBorde.every((cuadrado) => cuadrado !== null);
};
