import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  TextField,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box
} from "@mui/material"; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { postApi, getApi } from "../../api/api";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/es'; // Importar el idioma español de dayjs

dayjs.locale('es'); // Establecer el idioma español como predeterminado

// Objeto de traducción personalizado para los días de la semana
const spanishDayLabels = {
  sunday: 'Domingo',
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
};

const Form_Reserva = ({ onClose, edit }) => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    block: "",
    wbaddress: "",
    name_teacher: "",
    date: dayjs(), // Convertir a Dayjs
    day: dayjs().format('dddd'), // Autocompletar el día en español
    schedule: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeSpace = async (e) => {
    const selectedSpaceName = e.target.value;
    try {
      const response = await getApi(`http://localhost:8080/api/space/singlespace/${selectedSpaceName}`);
      const selectedSpace = response.space;
      setFormData({
        ...formData,
        name: selectedSpace.name,
        capacity: selectedSpace.capacity,
        block: selectedSpace.block,
        wbaddress: selectedSpace.webaddress,
        // Agrega aquí los demás campos que quieras llenar automáticamente
      });
    } catch (error) {
      console.error("Error fetching space details:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [spaceNames, setSpaceNames] = useState([]);

  async function getProduct() {
    try {
      const productsData = await getApi('http://localhost:8080/api/space/spaces');
      setSpaceNames(productsData.space.map(space => space.name));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const dataToSend = {
        name: formData.name,
        capacity: formData.capacity,
        block: formData.block,
        webaddress: formData.wbaddress,
        name_teacher: formData.name_teacher,
        date: formData.date.format(), // Formatear a string antes de enviar
        day: formData.day,
        schedule: formData.schedule,
      };
  
      const response = await postApi("http://localhost:8080/api/book/register", dataToSend);
  
      if (response.status === 200) {
        console.log("Datos enviados con éxito");
      }
  
      onClose();
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const handleChangeDate = (date) => {
    setFormData({
      ...formData,
      date: date,
      day: spanishDayLabels[dayjs(date).format('dddd').toLowerCase()], // Autocompletar el día en español según la fecha seleccionada
    });
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
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="nombre_aula">Nombre Aula</InputLabel>
              <Select
                required
                label="Nombre aula"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  handleChangeSpace(e);
                  handleChange(e);
                }}
                inputProps={{
                  name: "name",
                  id: "name",
                }}
              >
                {spaceNames.map((name, index) => (
                  <MenuItem key={index} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="nombre_docente">Nombre Docente</InputLabel>
              <Select
                required
                label="nombre_docente"
                name="name_teacher"
                value={formData.name_teacher}
                onChange={handleChange}
                inputProps={{
                  name: "name_teacher",
                  id: "name_teacher",
                }}
              >
                <MenuItem value="David E">David E</MenuItem>
                <MenuItem value="Victor R">Victor R</MenuItem>
                <MenuItem value="Juan M">Juan M</MenuItem>
                <MenuItem value="Rodrigo R">Rodrigo R</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
              <DemoContainer components={["DateRangePicker"]}>
                <DatePicker 
                  label="Fecha de reserva"
                  value={formData.date} 
                  onChange={handleChangeDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Dia"
              variant="outlined"
              fullWidth
              name="day"
              value={formData.day}
              // No necesitas el evento onChange ya que está autocompletado
              margin="dense"
              disabled // Deshabilitar la edición manual del input
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Horario"
              variant="outlined"
              fullWidth
              name="schedule"
              value={formData.schedule}
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
            {edit ? "Editar Carrera" : "Registrar Reserva"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form_Reserva;

Form_Reserva.propTypes = {
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};
