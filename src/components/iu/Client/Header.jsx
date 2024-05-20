import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { LoginButton } from "./Buttonreg";
import MenuItem from "@mui/material/MenuItem";
//import { Link } from "react-router-dom";

const pages = ["Inicio", "Noticias"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      style={{
        background:
          "linear-gradient(16deg, rgba(2,1,28,1) 0%, rgba(28,4,241,1) 67%, rgba(219,27,27,1) 95%)",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center" width="100%">
            <Box flex={1}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="../../../../public/M.png"
                  style={{
                    width: "70px",
                    height: "auto",
                    margin: "5px 15px 5px 15px",
                  }}
                  alt="Logo UMSS"
                />
              </Typography>
            </Box>
            <Box flex={2} display="flex" justifyContent="center">
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "#f3efff",
                    mx: 2,
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box flex={1} display="flex" justifyContent="flex-end">
              {/*<Link to="/admin">
                <Button variant="text" sx={{ color: "white" }}>
                  Iniciar sesión
                </Button>
                </Link>*/}
                <LoginButton />  
            </Box>
          </Box>
          <Box display={{ xs: "flex", md: "none" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
