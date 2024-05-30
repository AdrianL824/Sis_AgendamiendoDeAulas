import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectAulas = ({ cantClass, setCantClass, namesMaterias, resources, inputDate, setInputDate, materia, setMateria }) => {
  const [filteredResources, setFilteredResources] = useState([]);

  const handleChange = (event) => {
    const selectedMateria = event.target.value;
    setMateria(selectedMateria);
    const selectedMateriaInfo = namesMaterias.find(
      (item) => item.name === selectedMateria
    );
    setCantClass(selectedMateriaInfo ? selectedMateriaInfo.cantAlum : 0);
  };

  useEffect(() => {
    const filtered = resources.filter(
      (item) => cantClass >= item.minCapacity && cantClass <= item.capacity
    );
    setFilteredResources(filtered);
  }, [cantClass, resources]);

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
            {item.name}
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
