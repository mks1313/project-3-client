import './Button.css';

const Button = ({ children, onClick, style }) => {
  return (
    <button className="chulo-button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default Button;

