import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { itemStyles, iconStyles, textStyles, buttonStyles } from "./Styles";
import PropTypes from "prop-types";
export const CustomListItem = ({ to, text, icon, onClick }) => {
  return (
    <ListItem disablePadding sx={itemStyles}>
      <Link to={to} style={{ textDecoration: "none" }} onClick={onClick}>
        <ListItemButton sx={{ ...buttonStyles }}>
          <ListItemIcon sx={iconStyles}>{icon}</ListItemIcon>
          <ListItemText primary={text} sx={textStyles} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
CustomListItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};
