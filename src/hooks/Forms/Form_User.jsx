import { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  TextField,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Box, Button } from "@mui/material";
//import axios from "axios";
import { postProduct } from "../../api/api";

const Form_User = ({ onClose, edit }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    codsis: "",
    numberp: "",
    facultad: "",
    carrera: "",
    cargo: "",
  });

  const [showCarreraFacultad, setShowCarreraFacultad] = useState(false);
  const [carreras, setCarreras] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      facultad: "",
      carrera: "",
    });

    if (name === "cargo" && value === "Estudiante") {
      setShowCarreraFacultad(true);
    } else {
      setShowCarreraFacultad(false);
    }
  };

  const handleFacultadChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value === "Facultad de veterinaria") {
      setCarreras(["Veterinaria "]);
    } else if (value === "Facultad de Ciencias y Tecnologia") {
      setCarreras([
        "Ing. Sistemas",
        "Ing. Electronica",
        "Ing. Eletrica",
        "Ing. Civil",
        "Ing. Industrial",
      ]);
    } else {
      setCarreras([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const dataToSend = {
        name: formData.name,
        lastname: formData.lastname,
        codsis: formData.codsis,
        cargo: formData.cargo,
        numberp: formData.numberp,
        facultad: formData.facultad,
        carrera: formData.carrera,
      };
  
      // Convert the dataToSend object to a JSON string
      //const jsonData = JSON.stringify(dataToSend);
  
      // Send a POST request with JSON data
      const response = await postProduct("http://localhost:8000/api/v1/registerusert",dataToSend 
        //method: "POST",
        
      );
  
      // Check the response status
      if (response.status === 200) {
        // The request was successful
        console.log("Datos enviados con éxito");
      } else {
        console.error("Error en la solicitud a la API");
      }
  
      onClose();
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <CssBaseline />

      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            width: 320,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Apellidos"
              variant="outlined"
              fullWidth
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              required
              label="Codigo Sis"
              variant="outlined"
              fullWidth
              name="codsis"
              value={formData.codsis}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2, marginBottom: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="cargo">Cargo</InputLabel>
              <Select
                required
                label="Cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                inputProps={{
                  name: "cargo",
                  id: "cargo",
                }}
              >
                <MenuItem value="Estudiante">Estudiante</MenuItem>
                <MenuItem value="Docente">Docente</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 2, marginBottom: 2 }}>
            <TextField
              required
              label="Telefono/Celular"
              variant="outlined"
              fullWidth
              type="number"
              name="numberp"
              value={formData.numberp}
              onChange={handleChange}
            />
          </Box>

          {showCarreraFacultad && (
            <Box sx={{ mt: 2, marginBottom: 2 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="facultad">Facultad</InputLabel>
                <Select
                  required
                  label="Facultad"
                  name="facultad"
                  value={formData.facultad}
                  onChange={handleFacultadChange}
                  inputProps={{
                    name: "facultad",
                    id: "facultad",
                  }}
                >
                  <MenuItem value="Facultad de veterinaria">
                    Facultad de veterinaria
                  </MenuItem>
                  <MenuItem value="Facultad de Ciencias y Tecnologia">
                    Facultad de Ciencias y tecnologia
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {showCarreraFacultad && (
            <Box sx={{ mt: 2, marginBottom: 2 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="carrera">Carrera</InputLabel>
                <Select
                  required
                  label="Carrera"
                  name="carrera"
                  value={formData.carrera}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      carrera: e.target.value,
                    });
                  }}
                  inputProps={{
                    name: "carrera",
                    id: "carrera",
                  }}
                >
                  {carreras.map((carrera, index) => (
                    <MenuItem key={index} value={carrera}>
                      {carrera}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            sx={{
              width: "100%",
              borderRadius: "55px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.9)",
            }}
            variant="solid"
            color="primary"
          >
            {edit ? "Editar Usuario" : "Crear Usuario"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form_User;

Form_User.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
};
