import { useState } from "react";
import Cookies from "js-cookie";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { postApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import Client from "../components/layout/client/Client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Variable de estado para el mensaje de error
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postApi("auth/login", { email, password });

      if (response && response.token) {
        const authToken = response.token;
        Cookies.set("token", authToken);
        navigate("/admin");
        const storedToken = Cookies.get("token");
        console.log("Token almacenado:", storedToken);
      } else {
        setError("Correo o contraseña incorrectos"); // Establece el mensaje de error
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setError("Correo o contraseña incorrectos"); // Establece el mensaje de error en caso de un error
    }
  };

  return (
    <Client>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: "grid",
          placeItems: "center",
          height: "70vh",
        }}
      >
        <div>
          <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
            <Typography variant="h5">Iniciar Sesión</Typography>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Ingresar
              </Button>
            </form>
          </Paper>
        </div>
      </Container>
    </Client>
  );
};

export default Login;
