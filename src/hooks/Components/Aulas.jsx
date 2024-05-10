import Calendar from "./Calendar";
import * as React from "react";
import { useState, useEffect } from "react";
import { getApi } from "../../api/api";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getSpaces();
  }, []);

  async function getSpaces() {
    try {
      const response = await getApi("http://localhost:8080/api/space/spaces");
      setSpaces(response.space);
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  }
  console.log(space);

  const resources = space.map((space) => ({
    id: space.name,
    title: space.slug,
    block: space.block,
    capacity: space.capacity,
    webaddress: space.webaddress,
  }));

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
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {resources.map((item, index) => (
          <Tab label={`${item.title}`} key={index} {...a11yProps(index)} />
        ))}
      </Tabs>

      {resources.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
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
