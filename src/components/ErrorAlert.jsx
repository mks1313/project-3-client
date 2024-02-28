const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="error-alert">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ErrorAlert;

//sustituir por este componente todos los console.log!!!!!!! mejora experiencia de ususario