import { useState } from "react";
import confetti from "canvas-confetti";
import { Cuadrado } from "./components/Cuadrado";
import { TURNOS } from "./constantes";
import { verificarGanador, verificarJuegoTerminado } from "./logic/boarde";
import { GanadorModal } from "./components/GanadorModal";
import { guardarJuegoStorage, resetiarJuegoStorage } from "./logic/storage/index";

function App() {
  const [borde, setBorde] = useState(() => {
    const bordeDesdeStorage = window.localStorage.getItem("borde");
    if (bordeDesdeStorage) return JSON.parse(bordeDesdeStorage);
    return Array(9).fill(null);
  });

  const [turno, setTurno] = useState(() => {
    const turnoDesdeStorage = window.localStorage.getItem("turno");
    return turnoDesdeStorage ?? TURNOS.X;
  });

  const [ganador, setGanador] = useState(null);

  const resetiarJuego = () => {
    setBorde(Array(9).fill(null));
    setTurno(TURNOS.X);
    setGanador(null);
    resetiarJuegoStorage();
  };

  const updateBorde = (index) => {
    if (borde[index] || ganador) return;
    const nuevoBorde = [...borde];
    nuevoBorde[index] = turno;
    setBorde(nuevoBorde);
    const nuevoTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(nuevoTurno);
    guardarJuegoStorage({ borde: nuevoBorde, turno: nuevoTurno });
    const nuevoGanador = verificarGanador(nuevoBorde);
    if (nuevoGanador) {
      confetti();
      setGanador(nuevoGanador);
    } else if (verificarJuegoTerminado(nuevoBorde)) setGanador(false);
  };

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
