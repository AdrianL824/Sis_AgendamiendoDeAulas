import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectAulas = ({ namesMaterias, materia, setMateria, inputDate, setInputDate }) => {
  const handleChange = (event) => {
    const selectedMateria = event.target.value;
    setMateria(selectedMateria);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, mt: "25px" }} size="small">
      <InputLabel id="demo-select-small-label">Materia</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={materia}
        label="Materia"
        onChange={handleChange}
      >
        {namesMaterias.map((item, index) => (
          <MenuItem key={index} value={item.name}>
            {item.name
}
          </MenuItem>
        ))}
      </Select>
      <input
        type="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
        placeholder="YYYY-MM-DD"
      />
    </FormControl>
  );
};

export default SelectAulas;
