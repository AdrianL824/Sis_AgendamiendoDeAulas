// import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function Drawer_User({ isOpen, onClose, edit, name, form }) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        container: document.getElementById("root"),
        style: { zIndex: 1300 },
      }}
    >
      <Box sx={{ width: 350, padding: 2 }}>
        <List>
          <ListItem>
            {edit ? (
              <ListItemText
                primary={`Actualizar ${name} `}
                primaryTypographyProps={{ fontWeight: 700 }}
              />
            ) : (
              <ListItemText
                primary={`${name}`}
                primaryTypographyProps={{ fontWeight: 700 }}
              />
            )}

            <HighlightOffIcon
              onClick={onClose}
              sx={{ p: 0, cursor: "pointer" }}
            />
          </ListItem>
        </List>
        <Divider />

        {form}
      </Box>
    </Drawer>
  );
}
Drawer_User.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  form: PropTypes.node.isRequired,
};
