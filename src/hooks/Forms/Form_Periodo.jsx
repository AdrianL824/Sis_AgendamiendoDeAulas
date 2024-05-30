import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  TextField,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { putApi } from "../../api/api";
import { Box, Button } from "@mui/material";

const Form_Periodo = ({ initialValues, onClose }) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    date_r_i: "",
    date_r_f: "",
    date_e_i: "",
    date_e_f: "",
    role: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

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
      console.log("Form Data being sent:", formData); // Log the form data
      const url = `http://localhost:8080/api/period/periodupd/${formData._id}`;
      const response = await putApi(url, formData);
      console.log("Response from server:", response); // Log the server response
      if (response.success) {
        console.log("Datos enviados con éxito");
        onClose();
      } else {
        console.error("Error en la respuesta del servidor:", response.message);
      }
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            width: "100%",
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
              label="Fecha Inicio Reserva"
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
                inputProps={{ name: "role", id: "role" }}
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
            Registrar Periodo
          </Button>
        </Box>
      </form>
    </Box>
  );
};

Form_Periodo.propTypes = {
  initialValues: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default Form_Periodo;
