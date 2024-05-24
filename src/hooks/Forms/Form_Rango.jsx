import { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, TextField, CssBaseline,InputLabel,
    Select,
    MenuItem, } from "@mui/material";

import { postApi } from "../../api/api";

import { Box, Button } from "@mui/material";

const Form_Rango = ({ onClose, edit, getProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    date_r_i: "",
    date_r_f: "",
    date_e_i: "",
    date_e_f: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        name: formData.name,
        date_r_i: formData.date_r_i,
        date_r_f: formData.date_r_f,
        date_e_i: formData.date_e_i,
        date_e_f: formData.date_e_f,
        role: formData.role,
      };

      // Convert the dataToSend object to a JSON string
      //const jsonData = JSON.stringify(dataToSend);

      // Send a POST request with JSON data
      const response = await postApi(
        "http://localhost:8080/api/period/register",
        dataToSend
        //method: "POST",
      );

      // Check the response status
      if (response.status === 200) {
        // The request was successful
        console.log("Datos enviados con éxito");
      } else {
        //console.error("Error en la solicitud a la API");
      }
      getProduct();
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
              label="Fecha inicio Reserva"
              variant="outlined"
              fullWidth
              name="date_r_i"
              value={formData.date_r_i}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Fecha Fin Reserva"
              variant="outlined"
              fullWidth
              name="date_r_f"
              value={formData.date_r_f}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Fecha Inicio Examen"
              variant="outlined"
              fullWidth
              name="date_e_i"
              value={formData.date_e_i}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Fecha Fin Examen"
              variant="outlined"
              fullWidth
              name="date_e_f"
              value={formData.date_e_f}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="role">Rol habilitado</InputLabel>
              <Select
                required
                label="Rol habilitado"
                name="role"
                value={formData.role}
                onChange={handleChange}
                inputProps={{
                  name: "role",
                  id: "role",
                }}
              >
                <MenuItem value="Docente">Docente</MenuItem>
                <MenuItem value="Auxiliar">Auxiliar</MenuItem>
              </Select>
            </FormControl>
          </Box>

                   
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
            {edit ? "Editar Carrera" : "Registrar Rango"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form_Rango;

Form_Rango.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
};
