import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { AppBar } from "../../layout/admin/AdminComponents";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../Client/Buttonlogout";
import { useAuth0 } from '@auth0/auth0-react';

const Header = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  mode,
  onModeChange,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const handleChange = (event) => {
    onModeChange(event.target.checked);
  };

  const backgroundDia = {
    background: "#FCFCFC",
    color: "black",
  };

  const backgroundNoche = {
    background: "#242526",
    color: "white",
  };

  const { user, isAuthenticated } = useAuth0();    
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userProfileImage, setUserProfileImage] = React.useState(null);

  React.useEffect(() => {
    if (isAuthenticated) {
      setUserProfileImage(user.picture);
    }
  }, [isAuthenticated, user]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        ...(mode ? backgroundDia : backgroundNoche),
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex", md: "flex" },
            }}
          >
            {open ? (
              <IconButton
                color="inherit"
                aria-label="close drawer"
                onClick={handleDrawerClose}
                edge="start"
                sx={{
                  marginRight: 5,
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          <img
            src="https://www.umss.edu.bo/wp-content/uploads/2019/04/escudo-01.png"
            alt="Logo"
            style={{
              width: open ? "0.5%" : 50,
              height: "auto",
              margin: 5,
              opacity: open ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 100,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              width: 100,
            }}
          >
            Reserva de Ambientes
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={mode}
                onChange={handleChange}
                aria-label="login switch"
                icon={<Brightness4Icon />}
                checkedIcon={<WbSunnyIcon />}
              />
            }
            label={mode ? "Dia" : "Noche"}
          />
          <Typography>
            {isAuthenticated && <span>{getRoleFromEmail(user.email)} | {user.name || 'User'}</span>}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src={userProfileImage || 'URL_DE_LA_IMAGEN_POR_DEFECTO'}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Logout" onClick={handleLogout}>
                <LogoutButton />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  mode: PropTypes.bool.isRequired,
  onModeChange: PropTypes.func.isRequired,
};

export default Header;
