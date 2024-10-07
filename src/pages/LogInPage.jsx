import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LogInPage.css";
import { AuthContext } from "../context/auth.context";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function LogInPage() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = { email, password };

    axios
      .post(`${API_BASE_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser().then(() => {
          navigate("/profile");
        });
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
        setErrorMessage(errorDescription);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = { email, password, name };

    axios
      .post(`${API_BASE_URL}/auth/signup`, requestBody)
      .then(() => {
        setIsSignUp(false);
        setEmail("");
        setPassword("");
        setName("");
        setErrorMessage(undefined);
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
        setErrorMessage(errorDescription);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormSubmit = isSignUp ? handleSignUpSubmit : handleLoginSubmit;

  const handleFormToggle = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setName("");
    setErrorMessage(undefined);
  };

  return (
    <div className="container-main">
      <ReactPlayer
        url="https://youtu.be/Ki9AGLZYpmU"
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <div className="login-page">
        <div className="wrapper fadeInDown" style={{ zIndex: 1 }}>
          <div id="formContentLogin">
            <h2
              className={isSignUp ? "inactive underlineHover" : "active"}
              onClick={handleFormToggle}
            >
              Login
            </h2>
            <h2
              className={isSignUp ? "active" : "inactive underlineHover"}
              onClick={handleFormToggle}
            >
              Sign Up
            </h2>

            <form className="login-form" onSubmit={handleFormSubmit}>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleName}
                  placeholder="Full Name"
                  className="login-form-input"
                />
              )}
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
                placeholder="Email"
                className="login-form-input"
              />
              <div className="password-container">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Password"
                  className="login-form-input"
                />
                <span
                  onClick={togglePasswordVisibility}
                  onKeyDown={(e) => e.key === 'Enter' && togglePasswordVisibility()} // Add keyboard event
                  role="button"
                  tabIndex="0"
                  aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                </span>
              </div>
              <input
                type="submit"
                value={isSignUp ? "Sign Up" : "Log In"}
                className="login-form-input"
              />
            </form>

            {loading && <p className="loading-message">Loading...</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;



