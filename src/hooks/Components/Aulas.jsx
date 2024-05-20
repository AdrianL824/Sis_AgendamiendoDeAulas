import Calendar from "./Calendar";
import * as React from "react";
import { useState, useEffect } from "react";
import { getApi } from "../../api/api";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select_Aulas from "./Select_Aulas";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { useAuth0 } from '@auth0/auth0-react';

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
  const [value, setValue] = React.useState(0);
  const [space, setSpaces] = useState([]);
  const [cantClass, setCantClass] = useState([100]);
  const [materia, setMateria] = useState("");
  const [namesMaterias, setNamesMaterias] = useState([]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getSpaces();
  }, []);

  const { user, isAuthenticated } = useAuth0();
  const [userProfileImage, setUserProfileImage] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setUserProfileImage(user.picture);
      const userRole = getRoleFromEmail(user.email);
      if (userRole === 'Admin') {
        getAdminData(user.name);
      } else {
        getUserData(user.name);
      }
    }
  }, [isAuthenticated, user]);

  const [userData, setUserData] = useState(null);

  const getRoleFromEmail = (email) => {
    if (email.includes('admin')) {
      return 'Admin';
    } else if (email.includes('docente')) {
      return 'Docente';
    } else if (email.includes('auxiliar')) {
      return 'Auxiliar';
    } else {
      return 'Unknown Role';
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
    const updatedNamesMaterias = daUserData.map(data => {
      const subjectName = isAdmin ? `${data.subject} - ${data.group}` : data.subject;
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

  const resources = space.map((space) => ({
    id: space.name,
    title: space.slug,
    block: space.block,
    capacity: space.capacity,
    minCapacity: space.minCapacity,
    maxCapacity: space.maxCapacity,
    webaddress: space.webaddress,
  }));

  const filteredResources = resources.filter((item) => {
    const studentsInRange =
      cantClass >= item.minCapacity && cantClass <= item.maxCapacity;
    return studentsInRange;
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 624,
      }}
    >
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
          width: "18%",
        }}
      >
        {filteredResources.map((item, index) => (
          <Tab label={`${item.title}`} key={index} {...a11yProps(index)} />
        ))}
      </Tabs>

      {filteredResources.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          <div
            style={{
              display: "flex",
            }}
          >
            <Select_Aulas
              namesMaterias={namesMaterias}
              resources={resources}
              materia={materia}
              setMateria={setMateria}
              cantClass={cantClass}
              setCantClass={setCantClass}
            />
            <h2 style={{ paddingLeft: "25%" }}>{item.title}</h2>
          </div>
          <Calendar
            title={item.title}
            block={item.block}
            capacity={item.capacity}
            webaddress={item.webaddress}
            value={value}
          />
        </TabPanel>
      ))}
    </Box>
  );
}
