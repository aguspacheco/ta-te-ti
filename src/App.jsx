import { useState } from "react";

const TURNOS = { X: "X", O: "O" };

const Cuadrado = ({ children, isSelected, updateBorde, index }) => {
  const className = `cuadrado ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBorde(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const COMBO_GANADOR = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

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

  const updateBorde = (index) => {
    if (borde[index] || ganador) return;
    const nuevoBorde = [...borde];
    nuevoBorde[index] = turno;
    setBorde(nuevoBorde);
    const nuevoTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(nuevoTurno);
    const nuevoGanador = verificarGanador(nuevoBorde);
    if (nuevoGanador) {
      setGanador(nuevoGanador);
    }
  };

  return (
    <main className="borde">
      <h1>Ta-Te-Ti</h1>
      <section className="juego">
        {borde.map((_, index) => {
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
    </main>
  );
}
export default App;
