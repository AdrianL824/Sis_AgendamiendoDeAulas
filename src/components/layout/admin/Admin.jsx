import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { styled } from "@mui/material/styles"; //Requerido
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";

import Header from "../../iu/admin/Header";
import NavBar from "../../iu/admin/NavBar";
import PropTypes from "prop-types";
import { DrawerHeader } from "./AdminComponents";

export const Admin = ({ children }) => {
  const [mode, setMode] = React.useState(true);
  const [open, setOpen] = React.useState(() => {
    const storedOpen = localStorage.getItem("open");

    return storedOpen !== null ? JSON.parse(storedOpen) : false;
  });

  useEffect(() => {
    localStorage.setItem("open", JSON.stringify(open));
  }, [open]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        mode={mode}
        onModeChange={handleModeChange}
      ></Header>

      <NavBar open={open} mode={mode}>
        {" "}
      </NavBar>
      {/* main */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "80vw" }}>
        <DrawerHeader />
        {children}
      </Box>
      {/* {children} */}
    </Box>
  );
};
Admin.propTypes = {
  children: PropTypes.node.isRequired,
};
