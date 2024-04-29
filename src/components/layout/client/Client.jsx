import PropTypes from "prop-types";

import { Box, CssBaseline } from "@mui/material";
import Header from "../../iu/Client/Header";
export const Client = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "80vw" }}>
        {children}
      </Box>
    </Box>
  );
};

Client.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Client;
