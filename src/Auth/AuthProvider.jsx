import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie"; // Importa la biblioteca js-cookie
import PropTypes from "prop-types";
export const ProtectedRoute = ({ redirectTo = "/login" }) => {
  // Verifica si la cookie "token" existe y si es válida (puedes agregar otras comprobaciones si es necesario)
  const authToken = Cookies.get("token");

  if (!authToken) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string, // Define el tipo de 'redirectTo' como una cadena (string)
};
