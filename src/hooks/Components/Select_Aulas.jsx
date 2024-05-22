import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectAulas = ({ cantClass, setCantClass, namesMaterias, resources }) => {
  const [materia, setMateria] = useState("");
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
  }, [cantClass]);

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
          <MenuItem key={index} value={item.name} index={index}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {/* {filteredResources.map((item, index) => (
        <h1 key={index}>{item.name}</h1>
      ))} */}
    </FormControl>
  );
};

export default SelectAulas;
