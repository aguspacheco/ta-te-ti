//Children es el contenido que se va a mostrar dentro cuadro cuadrado
//isSelected indica si este cuadrado esta resaltado
//updateBorde se llama cuando se hace clic en elcuadrado para actualizar el tablero
//Index indica la posicion del cuadrado dentro del tablero
export const Cuadrado = ({ children, isSelected, updateBorde, index }) => {
  const className = `cuadrado ${isSelected ? "is-selected" : ""}`;

  //Se ejecuta cuando el usuario hace clic en el cuadrado y llama a la funcion updateBorde pasando la posicion del cuadrado
  const handleClick = () => {
    updateBorde(index);
  };

  //Devuelve el JSX que es un cuadrado
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
