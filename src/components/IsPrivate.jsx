import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; 
import { AuthContext } from "../context/auth.context";

function IsPrivate({ children }) {

  const { isLoggedIn, isLoading, tokenExpired } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (tokenExpired && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

IsPrivate.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default IsPrivate;



