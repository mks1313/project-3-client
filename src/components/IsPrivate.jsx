import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function IsPrivate({ children }) {
    const { isLoggedIn, isLoading, tokenExpired } = useContext(AuthContext);

    if (isLoading) {
        // Muestra un mensaje de carga mientras se verifica la autenticación
        return <p>Loading ...</p>;
    }

    if (tokenExpired && !isLoggedIn) {
        // Si el token ha expirado y el usuario no está autenticado, redirige a la página de inicio de sesión
        return <Navigate to="/login" />;
    }

    if (!isLoggedIn) {
        // Si el usuario no está autenticado, también podrías redirigirlo a la página de inicio de sesión
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado y el token no ha expirado, permite ver el contenido protegido
    return children;
}

export default IsPrivate;


