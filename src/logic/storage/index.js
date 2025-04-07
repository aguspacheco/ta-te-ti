//Guarda el estado actual del juego en el almacenamiento local del navegador
export const guardarJuegoStorage = ({ borde, turno }) => {
  //Guarda el tablero en localStorage convirtiendolo a una cadena JSON
  window.localStorage.setItem("borde", JSON.stringify(borde));
  //Guarda el turno actual como un string
  window.localStorage.setItem("turno", turno);
};

//Reinicia el juego eliminando los datos guardados en localStorage
export const resetiarJuegoStorage = () => {
  //Elimina el tablero guardado del almacenamiento local
  window.localStorage.removeItem("borde");
  //Elimina el turno guardado del almacenamiento
  window.localStorage.removeItem("turno");
};
