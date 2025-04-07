//Importa el componente cuadrado para mostrar el simbolo ganador
import { Cuadrado } from "./Cuadrado";
//Componente funcional del GanadorModal
export function GanadorModal({ ganador, resetiarJuego }) {
  //Si no hay ganador, no se muestra nada
  if (ganador === null) return null;

  //Define el texto a mostrar en el modal, segun el valor de ganador
  const textoGanador = ganador === false ? "Empataron 🤝" : "🎉 Gano 🎉";

  //Renderiza el modal del resultado del juego
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
