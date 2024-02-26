import "./LoginBtn.css";


const LoginButton = () => {
    
  const handleLogin = () => {
    // Aquí puedes manejar la lógica para iniciar sesión
    console.log('Iniciar sesión');
  };

  return (
    <button className="login-button" onClick={handleLogin}>
      <img src="./image/avatarImage.jpg" alt="Descripción de la imagen" />
      <span>Iniciar sesión</span>
    </button>
  );
};

export default LoginButton;
