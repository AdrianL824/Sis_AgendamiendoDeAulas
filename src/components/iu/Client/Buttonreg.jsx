import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router";
export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
 
  React.useEffect(()=>{
    if(isAuthenticated){
      navigate('/Admin/Reserva')
    }
  },[isAuthenticated, navigate]
    
  ) 

  return <Button variant="text" sx={{ color: "white" }} onClick={() => loginWithRedirect()} >Iniciar sesion</Button>;
  //<button onClick={() => loginWithRedirect()}>Login</button>;
};