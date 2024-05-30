import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  TextField,
  CssBaseline,
  // InputLabel,
  // Select,
  // MenuItem,
} from "@mui/material";
import { putApi } from "../../api/api";
import { Box, Button } from "@mui/material";

const Form_EditarAmbiente = ({ initialValues, onClose, edit }) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    capacity: "",
    minCapacity: "",
    block: "",
    webaddress: "",
    date_i: "",
    date_f: "",
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
      const url = `http://localhost:8080/api/space/spaceupd/${formData._id}`;
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
              label="Capacidad"
              variant="outlined"
              fullWidth
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Capacidad minima"
              variant="outlined"
              fullWidth
              name="minCapacity"
              value={formData.minCapacity}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Bloque de ambiente"
              variant="outlined"
              fullWidth
              name="block"
              value={formData.block}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Direccion de ambiente(GM)"
              variant="outlined"
              fullWidth
              name="webaddress"
              value={formData.webaddress}
              onChange={handleChange}
              margin="dense"
            />
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
            {edit ? "Editar Ambiente" : "Registrar Ambiente"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

Form_EditarAmbiente.propTypes = {
  initialValues: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
};

export default Form_EditarAmbiente;
