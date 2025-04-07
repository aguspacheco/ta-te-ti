//Importa el hook useState de React para manejar estados dentro del componente funcional
import { useState } from "react";
//Importa la funcion confetti que lanza una animacion visual de celebracion
import confetti from "canvas-confetti";
//Importa el cuadrado que representa cada celda del tablero
import { Cuadrado } from "./components/Cuadrado";
//Importa los turnos
import { TURNOS } from "./constantes";
//Importa funciones logicas del tablero
import { verificarGanador, verificarJuegoTerminado } from "./logic/boarde";
//Importa componentes y funciones relacionados al almecenamiento local y al modal de victoria
import { GanadorModal } from "./components/GanadorModal";
import { guardarJuegoStorage, resetiarJuegoStorage } from "./logic/storage/index";

//Componente principal del juego
function App() {
  //Se inicializa con el valor guardado en el localStorage o con un array de 9 null si no hay nada guardado
  const [borde, setBorde] = useState(() => {
    const bordeDesdeStorage = window.localStorage.getItem("borde");
    if (bordeDesdeStorage) return JSON.parse(bordeDesdeStorage);
    //Tablero vacio
    return Array(9).fill(null);
  });

  //Se inicia con TURNOS.X por defecto
  const [turno, setTurno] = useState(() => {
    const turnoDesdeStorage = window.localStorage.getItem("turno");
    return turnoDesdeStorage ?? TURNOS.X;
  });

  //Estado del ganador puede ser "X" o "O" o falso en caso de empate o vacio sin terminar
  const [ganador, setGanador] = useState(null);

  //Reinicia el tablero, el turno y estado del ganador
  const resetiarJuego = () => {
    //Limpia el tablero
    setBorde(Array(9).fill(null));
    //Reinicia el turno
    setTurno(TURNOS.X);
    //Quita el ganador
    setGanador(null);
    //Elimina datos del localStorage
    resetiarJuegoStorage();
  };

  //Actualiza el tablero cuando se hace clicl en un cuadrado
  const updateBorde = (index) => {
    //Si la celda ya tiene valor o el juego termino, no hace nada
    if (borde[index] || ganador) return;
    //Crea una copia del tablero actual e inserta el truno actual en la posicion que se hace click
    const nuevoBorde = [...borde];
    nuevoBorde[index] = turno;
    //Actualiza el estado del tablero
    setBorde(nuevoBorde);
    //Cambia de turno
    const nuevoTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(nuevoTurno);
    //Guarda el nuevo estado del juego en el localStorage
    guardarJuegoStorage({ borde: nuevoBorde, turno: nuevoTurno });
    //Verifica si hay ganador
    const nuevoGanador = verificarGanador(nuevoBorde);
    if (nuevoGanador) {
      //Ejecuta la funcion si alguien gano
      confetti();
      //Establece el ganador
      setGanador(nuevoGanador);
      //Si no hay ganador y el tablero esta lleno hay empate
    } else if (verificarJuegoTerminado(nuevoBorde)) setGanador(false);
  };

  //Estructura virtual
  return (
    <main className="borde">
      <h1>Ta-Te-Ti</h1>
      <button onClick={resetiarJuego}>Reanudar Partida</button>
      <section className="juego">
        {borde.map((cuadrado, index) => {
          return (
            <Cuadrado key={index} index={index} updateBorde={updateBorde}>
              {borde[index]}
            </Cuadrado>
          );
        })}
      </section>

      <section className="turno">
        <Cuadrado isSelected={turno === TURNOS.X}>{TURNOS.X}</Cuadrado>
        <Cuadrado isSelected={turno === TURNOS.O}>{TURNOS.O}</Cuadrado>
      </section>

      <GanadorModal resetiarJuego={resetiarJuego} ganador={ganador} />
    </main>
  );
}
export default App;
