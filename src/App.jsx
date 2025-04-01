import { useState } from "react";
import confetti from "canvas-confetti";
import { Cuadrado } from "./components/Cuadrado";
import { TURNOS, COMBO_GANADOR } from "./constantes";

function App() {
  const [borde, setBorde] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState(TURNOS.X);
  const [ganador, setGanador] = useState(null);

  const verificarGanador = (bordeVerifica) => {
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

  const resetiarJuego = () => {
    setBorde(Array(9).fill(null));
    setTurno(TURNOS.X);
    setGanador(null);
  };

  const verificarJuegoTerminado = (nuevoBorde) => {
    return nuevoBorde.every((cuadrado) => cuadrado !== null);
  };

  const updateBorde = (index) => {
    if (borde[index] || ganador) return;
    const nuevoBorde = [...borde];
    nuevoBorde[index] = turno;
    setBorde(nuevoBorde);
    const nuevoTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(nuevoTurno);
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
      {ganador !== null && (
        <section className="ganador">
          <div className="text">
            <h2>{ganador === false ? "Empataron 🤝" : "🎉 Gano 🎉"}</h2>

            <header className="gano">{ganador && <Cuadrado>{ganador}</Cuadrado>}</header>

            <footer>
              <button onClick={resetiarJuego}>Jugar de nuevo 🕹️</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}
export default App;
