import { useState } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import Client from "../components/layout/client/Client";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Client>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: "grid",
          placeItems: "center",
          height: "70vh", // Ajusta la altura para ocupar toda la pantalla
        }}
      >
        <div>
          <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
            <Typography variant="h5">Iniciar Sesión</Typography>
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

export default Register;
