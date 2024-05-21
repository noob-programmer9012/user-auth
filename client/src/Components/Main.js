import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useState, useContext, useEffect } from "react";

import UserContext from "../Context/UserContext";
import axios from "axios";

function Main(props) {
  const { user, setUser, setFirm, serverUrl, component } =
    useContext(UserContext);
  const { _id } = JSON.parse(user).data;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const getFirmData = async () => {
      try {
        const data = await axios.get(`${serverUrl}/api/firm/getfirm/${_id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = JSON.stringify(data.data.data);
        setFirm(json);
      } catch (error) {
        console.log(error.message);
        return;
      }
    };
    getFirmData();
  }, [setFirm, _id, serverUrl]);

  const { handleDrawerToggle, setDarkMode, darkMode } = props.action;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMode = () => {
    const currentMode = localStorage.getItem("darkMode");
    localStorage.setItem("darkMode", currentMode === "dark" ? "light" : "dark");
    setDarkMode(localStorage.getItem("darkMode"));
  };

  return (
    <Box sx={{ dipslay: "flex", flexGrow: 1 }}>
      <AppBar
        position="sticky"
        top={0}
        sx={{ boxShadow: 0, backgroundColor: "primary.light" }}
      >
        <Toolbar sx={{ dipslay: "flex", justifyContent: "space-between" }}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div>
            {darkMode === "dark" && (
              <IconButton onClick={() => handleMode()}>
                <LightModeIcon />
              </IconButton>
            )}
            {darkMode === "light" && (
              <IconButton onClick={() => handleMode()}>
                <DarkModeIcon />
              </IconButton>
            )}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="background.default"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setUser(null);
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box>{component}</Box>
    </Box>
  );
}

export default Main;
