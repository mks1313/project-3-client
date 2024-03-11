import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LogInPage.css";
import { AuthContext } from "../context/auth.context";
import ReactPlayer from "react-player";

function LogInPage() {
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("auri@gmail.com");
    const [password, setPassword] = useState("Auri123!");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleLoginSubmit = (e) => {
                e.preventDefault();
                const requestBody = { email, password };
        
                 axios.post(`api/auth/login`, requestBody)
                     .then((response) => {
                         storeToken(response.data.authToken);
                         authenticateUser().then(() => {
                             navigate('/profile');
                         });
                     })
                     .catch((error) => {
                         const errorDescription = error.response.data.message;
                         setErrorMessage(errorDescription);
                     });
             };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password, name };

        axios.post("api/auth/signup", requestBody)
            .then(() => {
                setIsSignUp(false); 
                setErrorMessage(undefined);
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const handleFormSubmit = isSignUp ? handleSignUpSubmit : handleLoginSubmit;

    const handleFormToggle = () => {
        setIsSignUp(!isSignUp);
        setErrorMessage(undefined); 
    };
//TODO modificar los estilos de inputs para cada uno
return (
    <div className="container-main">

       <div className="video-container">
            <ReactPlayer
                url='https://player.vimeo.com/video/157269920?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1&muted=1'
                playing
                loop
                muted
                width='100%'
                height='100%'
                style={{ position: 'absolute', top: 0, left: 0 }} 
            />
        </div>
    <div className="login-page">
        <div className="wrapper fadeInDown" style={{ zIndex: 1 }}> 
            <div id="formContentLogin">
                <h2 className={isSignUp ? "inactive underlineHover" : "active"} onClick={handleFormToggle}> Login </h2>
                <h2 className={isSignUp ? "active" : "inactive underlineHover"} onClick={handleFormToggle}> Sign Up </h2>

                <form onSubmit={handleFormSubmit}>
                    {isSignUp && (
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleName}
                            placeholder="Name"
                        />
                    )}
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                        placeholder="Password"
                        style={{ width: '85%', marginTop: '10px' }}
                    />
                    <input
                        type="submit"
                        value={isSignUp ? "Sign Up" : "Log In"}
                    />
                </form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    </div>
    </div>
);
}

export default LogInPage;