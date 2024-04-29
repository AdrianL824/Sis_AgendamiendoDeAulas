import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const RegisterModal = ({ setOpen, target }) => {
  const [startDate, setStartDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (target) {
      // Extraer la fecha, el día de la semana, la hora de inicio y la hora de fin del target
      const { startDate, startTime, endTime } = target;
      setStartDate(startDate);
      setDayOfWeek(
        new Date(startDate).toLocaleDateString("en-US", { weekday: "long" })
      );
      setStartTime(startTime);
      setEndTime(endTime);
    }
  }, [target]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de envío del formulario
    handleClose();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Registrar Reserva</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles de la reserva:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="startDate"
            name="startDate"
            label="Fecha de inicio"
            type="text"
            fullWidth
            variant="standard"
            value={startDate}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            id="dayOfWeek"
            name="dayOfWeek"
            label="Día de la semana"
            type="text"
            fullWidth
            variant="standard"
            value={dayOfWeek}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            id="startTime"
            name="startTime"
            label="Hora de inicio"
            type="text"
            fullWidth
            variant="standard"
            value={startTime}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            id="endTime"
            name="endTime"
            label="Hora de fin"
            type="text"
            fullWidth
            variant="standard"
            value={endTime}
            InputProps={{ readOnly: true }}
          />
          {/* Otros campos del formulario pueden ir aquí */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Registrar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterModal;
