import { useState, useEffect } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { iconsList } from "./items/IconsList";
import { Drawer } from "../../layout/admin/AdminComponents";
import { CustomListItem } from "./items/CustomListItem";
import DomainIcon from "@mui/icons-material/Domain";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = ({ open, mode }) => {
  const { user, isAuthenticated } = useAuth0();
  const [role, setRole] = useState("Unknown Role");

  useEffect(() => {
    if (isAuthenticated && user) {
      const userRole = getRoleFromEmail(user.email);
      setRole(userRole);
    }
  }, [isAuthenticated, user]);

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

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const backgroundDia = {
    background: "#FCFCFC",
    color: "black",
  };
  const backgroundNoche = {
    background: "#242526",
    color: "white",
  };

  const [subMenu1Open, setSubMenu1Open] = useState(false);
  const [subMenu2Open, setSubMenu2Open] = useState(false);
  const [subMenu3Open, setSubMenu3Open] = useState(false);
  const [subMenu4Open, setSubMenu4Open] = useState(false);
  const [subMenu5Open, setSubMenu5Open] = useState(false);

  const handleSubMenu1Click = () => {
    setSubMenu1Open(!subMenu1Open);
  };

  const handleSubMenu2Click = () => {
    setSubMenu2Open(!subMenu2Open);
  };

  const handleSubMenu3Click = () => {
    setSubMenu3Open(!subMenu3Open);
  };

  const handleSubMenu4Click = () => {
    setSubMenu4Open(!subMenu4Open);
  };

  const handleSubMenu5Click = () => {
    setSubMenu5Open(!subMenu5Open);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          ...(mode ? backgroundDia : backgroundNoche),
        },
      }}
    >
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <img
            src="https://www.umss.edu.bo/wp-content/uploads/2018/01/logo-fcyt.png"
            alt="Logo"
            style={{
              width: open ? "50%" : "50%",
              height: "auto",
              opacity: open ? 1 : 0.5,
              transition: "opacity 0.3s ease-in-out",
              padding: "5px",
            }}
          />
        </Box>
      </DrawerHeader>

      <Divider />

      <List>
        <CustomListItem
          to="/Admin"
          text="Inicio"
          icon={iconsList["Inicio"]}
          onClick={handleLinkClick}
          style={{ display: role === "Admin" ? "block" : "none" }}
        />
        <Divider />
        <Divider />
        <CustomListItem
          text="Reserva"
          icon={subMenu1Open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleSubMenu1Click}
        />
        {subMenu1Open && (
          <>
            <List>
              <CustomListItem
                to="/Admin/Reserva"
                text="Ambiente"
                icon={<LocalMallIcon />}
                onClick={handleLinkClick}
              />
              <CustomListItem
                to="/Admin/ReservaList"
                text="Lista de Reservas"
                icon={<LocalMallIcon />}
                onClick={handleLinkClick}
              />
            </List>
          </>
        )}
        <Divider />
        {role === "Admin" && (
          <>
            <CustomListItem
              text="Registro"
              icon={subMenu2Open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={handleSubMenu2Click}
            />
            {subMenu2Open && (
              <List>
                <CustomListItem
                  to="/admin/ambiente"
                  text="Ambiente"
                  icon={<DomainIcon />}
                  onClick={handleLinkClick}
                />
              </List>
            )}
            <Divider />
            <CustomListItem
              text="Periodo"
              icon={subMenu3Open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={handleSubMenu3Click}
            />
            {subMenu3Open && (
              <List>
                <CustomListItem
                  to="/Admin/Periodo"
                  text="Administrar"
                  icon={<BorderColorIcon />}
                  onClick={handleLinkClick}
                />
              </List>
            )}
            <Divider />
            <CustomListItem
              text="Reportes"
              icon={subMenu4Open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={handleSubMenu4Click}
            />
            {subMenu4Open && (
              <List>
                <CustomListItem
                  to="/Admin/Reportes"
                  text="Informes"
                  icon={<AssessmentIcon />}
                  onClick={handleLinkClick}
                />
              </List>
            )}
            <Divider />
            <CustomListItem
              text="Materias"
              icon={subMenu5Open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={handleSubMenu5Click}
            />
            {subMenu5Open && (
              <List>
                <CustomListItem
                  to="/Admin/Materias"
                  text="Lista de Materias"
                  icon={<BorderColorIcon />}
                  onClick={handleLinkClick}
                />
              </List>
            )}
            <Divider />
          </>
        )}
      </List>
    </Drawer>
  );
};

NavBar.propTypes = {
  open: PropTypes.bool.isRequired,
  mode: PropTypes.bool.isRequired,
};

export default NavBar;
