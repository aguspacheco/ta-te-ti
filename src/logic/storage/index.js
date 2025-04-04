export const guardarJuegoStorage = ({ borde, turno }) => {
  window.localStorage.setItem("borde", JSON.stringify(borde));
  window.localStorage.setItem("turno", turno);
};

export const resetiarJuegoStorage = () => {
  window.localStorage.removeItem("borde");
  window.localStorage.removeItem("turno");
};
