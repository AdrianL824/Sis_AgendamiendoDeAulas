import { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  TextField,
  CssBaseline,
} from "@mui/material";

import { postAmbiente } from "../../api/api";

import { Box, Button } from "@mui/material";


const Form_Ambiente = ({ onClose, edit }) => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    block: "",
    wbaddress: "",
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
        capacity: formData.capacity,
        codsis: formData.codsis,
        block: formData.block,
        webaddress: formData.wbaddress,
      };
  
      // Convert the dataToSend object to a JSON string
      //const jsonData = JSON.stringify(dataToSend);
  
      // Send a POST request with JSON data
      const response = await postAmbiente("http://localhost:8080/api/space/register",dataToSend 
        //method: "POST",
        
      );
  
      // Check the response status
      if (response.status === 200) {
        // The request was successful
        console.log("Datos enviados con éxito");
      } else {
        //console.error("Error en la solicitud a la API");
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
              name="wbaddress"
              value={formData.wbaddress}
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
            {edit ? "Editar Carrera" : "Registrar Ambiente"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form_Ambiente;

Form_Ambiente.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
};
