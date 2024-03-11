import './Button.css';

const Button = ({ children, onClick }) => {
  return (
    <button className="chulo-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

