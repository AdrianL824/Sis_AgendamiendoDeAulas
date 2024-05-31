import Calendar from "./Calendar";
import * as React from "react";
import { useState, useEffect } from "react";
import { getApi } from "../../api/api";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SelectAulas from "./Select_Aulas";
import { useAuth0 } from "@auth0/auth0-react";
import TextField from "@mui/material/TextField";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className="calendar"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Aulas() {
  const [value, setValue] = useState(0);
  const [space, setSpaces] = useState([]);
  const [materia, setMateria] = useState("");
  const [namesMaterias, setNamesMaterias] = useState([]);
  const [inputDate, setInputDate] = useState("");
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (filteredResources.length > 0) {
      getReservations(filteredResources[newValue].id);
    }
  };

  useEffect(() => {
    getSpaces();
  }, []);

  useEffect(() => {
    if (namesMaterias.length > 0) {
      const firstMateria = namesMaterias[0].name;
      setMateria(firstMateria);
      filterResources(firstMateria);
    }
  }, [namesMaterias]);

  useEffect(() => {
    filterResources(materia);
  }, [materia, space]);

  const { user, isAuthenticated } = useAuth0();
  const [userProfileImage, setUserProfileImage] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setUserProfileImage(user.picture);
      const userRole = getRoleFromEmail(user.email);
      if (userRole === "Admin") {
        getAdminData(user.name);
      } else {
        getUserData(user.name);
      }
    }
  }, [isAuthenticated, user]);

  const [userData, setUserData] = useState(null);

  const getRoleFromEmail = (email) => {
    if (email.includes("admin")) {
      return "Admin";
    } else if (email.includes("docente")) {
      return "Docente";
    } else if (email.includes("auxiliar")) {
      return "Auxiliar";
    } else {
      return "Unknown Role";
    }
  };

  async function getUserData(username) {
    const url = `http://localhost:8080/api/user/singleuser/${username}`;

    try {
      const response = await getApi(url);
      console.log("Datos obtenidos:", response);
      setUserData(response);
      updateNamesMaterias(response.DAUser, false);
    } catch (error) {
      console.error(`Error fetching data for user ${username}:`, error);
    }
  }

  async function getAdminData(username) {
    const url = `http://localhost:8080/api/user/user/`;

    try {
      const response = await getApi(url);
      console.log("Datos obtenidos:", response);
      setUserData(response);
      updateNamesMaterias(response.DAUser, true);
    } catch (error) {
      console.error(`Error fetching data for admin ${username}:`, error);
    }
  }

  function updateNamesMaterias(daUserData, isAdmin) {
    const updatedNamesMaterias = daUserData.map((data) => {
      const subjectName = isAdmin
        ? `${data.subject} - ${data.group}`
        : data.subject;
      return {
        name: subjectName,
        cantAlum: parseInt(data.N_students, 10),
      };
    });
    setNamesMaterias(updatedNamesMaterias);
  }

  async function getSpaces() {
    try {
      const response = await getApi("http://localhost:8080/api/space/spaces");
      setSpaces(response.space);
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  }

  async function getReservations(spaceId) {
    try {
      const response = await getApi(`http://localhost:8080/api/reservation/${spaceId}`);
      // Procesa las reservas según sea necesario
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  }

  const resources = space.map((space) => ({
    id: space.name,
    title: space.slug,
    block: space.block,
    capacity: space.capacity,
    minCapacity: space.minCapacity,
    webaddress: space.webaddress,
  }));

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    filterResources(materia, newValue); // Actualizar el filtrado incluyendo el valor de búsqueda
  };

  const handleMateriaChange = (selectedMateria) => {
    setMateria(selectedMateria);
  };

  const filterResources = (selectedMateria, searchText = searchValue) => {
    const materiaInfo = namesMaterias.find((mat) => mat.name === selectedMateria);
    if (materiaInfo) {
      const cantClass = materiaInfo.cantAlum;
      const filtered = resources.filter((item) => {
        const studentsInRange = cantClass >= item.minCapacity && cantClass <= item.capacity;
        return studentsInRange && item.title.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredResources(filtered);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 624,
      }}
    >
      <Box
        sx={{
          width: "18%",
          paddingRight: "10px",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <TextField
          label="Buscar Aula"
          variant="outlined"
          value={searchValue}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            paddingTop: "0px",
          }}
        >
          {filteredResources.map((item, index) => (
            <Tab label={`${item.title}`} key={index} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {filteredResources.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          <div
            style={{
              display: "flex",
            }}
          >
            <SelectAulas
              namesMaterias={namesMaterias}
              materia={materia}
              setMateria={handleMateriaChange}
              inputDate={inputDate}
              setInputDate={setInputDate}
            />
            <h2 style={{ paddingLeft: "25%" }}>{item.title}</h2>
          </div>
          <Calendar
            title={item.title}
            block={item.block}
            capacity={item.capacity}
            webaddress={item.webaddress}
            inputDate={inputDate}
            setInputDate={setInputDate}
          />
        </TabPanel>
      ))}
    </Box>
  );
}
