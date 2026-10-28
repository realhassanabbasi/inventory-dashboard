// A simple box that can hold any child content
function CardWrapper({ children }) {
  return <div className="card">{children}</div>;
}

export default CardWrapper;
