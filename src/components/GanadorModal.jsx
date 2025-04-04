import { Cuadrado } from "./Cuadrado";
export function GanadorModal({ ganador, resetiarJuego }) {
  if (ganador === null) return null;

  const textoGanador = ganador === false ? "Empataron 🤝" : "🎉 Gano 🎉";

  return (
    <section className="ganador">
      <div className="text">
        <h2>{textoGanador}</h2>
        <header className="gano">{ganador && <Cuadrado>{ganador}</Cuadrado>}</header>

        <footer>
          <button onClick={resetiarJuego}>Jugar de nuevo 🕹️</button>
        </footer>
      </div>
    </section>
  );
}
