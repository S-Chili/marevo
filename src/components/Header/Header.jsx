import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Tabs,
  Tab,
  Typography,
  Link,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FaceLogo from "../Footer/facebook.png";
import InstaLogo from "../Footer/instagram.png";
import logo from "../../logo192.png";

const Copyright = () => {

  return (
    <Typography variant="body2" color='lightgray' sx={{textAlign: 'center'}}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/S-Chili">
        Check developer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Header({ value, handleChange }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleHome = () => {
    navigate("/");
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: "#fafafadf" }}>
        <Toolbar
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          {/* Logo */}
          <Button size="small" onClick={handleHome}>
            <img src={logo} alt="Logo" style={{ width: 52, height: 62 }} />
          </Button>

          {/* Desktop nav */}
          {!isMobile && (
            <Tabs value={value} onChange={handleChange}>
              <Tab label="About" value={0} />
              <Tab label="Store" value={1}  />
              <Tab label="Delivery" value={2} />
            </Tabs>
          )}

          {/* Right icons */}
          <Box>
            <IconButton>
              <PersonOutlineOutlinedIcon />
            </IconButton>
            <IconButton>
              <HeadsetMicOutlinedIcon />
            </IconButton>

            {/* Mobile burger */}
            {isMobile && (
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
<Drawer
  anchor="right"
  open={drawerOpen}
  onClose={toggleDrawerClose}
  PaperProps={{
    sx: {
      width: 300,
      backgroundColor: "#b0b0b0",
      borderLeft: "2px solid #eee",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between", // головне — розкидає top/bottom
    },
  }}
>
  {/* Верхній контент */}
  <Box
    sx={{
      p: 3,
      display: "flex",
      flexDirection: "column",
      gap: 3,
      flexGrow: 1, 
    }}
    role="presentation"
  >
    {/* Навігація */}
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 2 }}>
      <Tabs
        orientation="vertical"
        value={value}
        sx={{
          "& .MuiTab-root": { alignItems: "flex-start", textTransform: "none" },
        }}
      >
        <Tab label="About" value={0} onClick={() => { handleChange(null, 0); setDrawerOpen(false); }} />
        <Tab label="Store" value={1} onClick={() => { handleChange(null, 1); setDrawerOpen(false); }} />
        <Tab label="Delivery" value={2} onClick={() => { handleChange(null, 2); setDrawerOpen(false); }} />
      </Tabs>
    </Box>

    {/* Opening times */}
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Opening times
      </Typography>
      <Typography variant="body2">Every day</Typography>
      <Typography variant="body2">9:00 – 22:00</Typography>
    </Box>

    {/* Contacts */}
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Contacts
      </Typography>
      <Typography variant="body2">
        <Link href="tel:+380631234567" underline="hover" color="inherit">
          📞 +38 063 123 45 67
        </Link>
      </Typography>
      <Typography variant="body2">
        <Link href="mailto:marevostudio@example.com" underline="hover" color="inherit">
          ✉️ marevostudio@example.com
        </Link>
      </Typography>
      <Typography variant="body2">📍 Reitarska Street, 11</Typography>
      <Typography variant="body2">Kyiv, Ukraine</Typography>
    </Box>
  </Box>

  {/* Нижній блок — завжди внизу */}
  <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
      <IconButton href="https://facebook.com" target="_blank">
        <img src={FaceLogo} alt="Facebook" width={26} />
      </IconButton>
      <IconButton href="https://instagram.com" target="_blank">
        <img src={InstaLogo} alt="Instagram" width={26} />
      </IconButton>
    </Box>
    <Copyright />
  </Box>
</Drawer>


    </>
  );
}

export default Header;