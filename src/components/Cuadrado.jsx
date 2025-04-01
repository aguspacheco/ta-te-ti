export const Cuadrado = ({ children, isSelected, updateBorde, index }) => {
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
