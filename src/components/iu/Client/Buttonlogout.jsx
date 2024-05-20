
import { useAuth0 } from "@auth0/auth0-react";
import Typography from "@mui/material/Typography";
export const LogoutButton = () => {
  const { logout } = useAuth0();

  return <Typography textAlign="center" onClick={() => logout({ returnTo: window.location.origin })}>salir</Typography>
  //<button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>

};