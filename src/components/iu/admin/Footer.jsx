// import * as React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ mt: "auto", p: 2, backgroundColor: "#3B4252" }}>
      <Typography variant="body2" color="white" align="center">
        © {new Date().getFullYear()} 
      </Typography>
    </Box>
  );
};

export default Footer;
