import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSelect from "../theme/ColorModeSelect";
import {  DashboardIcon, LoginIcon, RegisterIcon, LogoutIcon } from "../components/CustomIcons";
import { ReactComponent as SmartVerifyLogo } from '../logo.svg';
import { useTranslation } from "react-i18next";
import TNLOGO from "../assets/logo4.png";
import { useAuth } from "./AuthContext"; // path may vary

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="absolute" // Allows it to float over the background
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Light transparent white
        backdropFilter: "blur(6px)", // Cool glass effect
        boxShadow: "none", // No shadow
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Logo & Branding */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/" sx={{ p: 1 }}>
            <SmartVerifyLogo sx={{ width: 35, height: 35, color: "black" }} />
          </IconButton>
          
        </Box>

        {/* Theme Toggle */}
        <ColorModeSelect />

        {/* Authentication Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/seller-dashboard")}
                startIcon={<DashboardIcon />}
                sx={{ color: "black", fontWeight: "bold" }}
              >
                {t("dashboard")}
              </Button>
              
        {/* Theme + Language Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button onClick={() => changeLanguage("en")}>EN</Button>
          <Button onClick={() => changeLanguage("ta")}>TA</Button>
          <ColorModeSelect />
        </Box>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {t("logout")}
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                startIcon={<LoginIcon />}
                sx={{ color: "black", fontWeight: "bold" }}
              >
                {t("login")}
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/register/seller")}
                startIcon={<RegisterIcon />}
                sx={{ color: "black", fontWeight: "bold" }}
              >
               {t("register")}
              </Button>
            </>
          )}
        </Box>
          <IconButton component={Link} to="/" sx={{ p: 1 }}>
            <Avatar src={TNLOGO} alt="Logo" sx={{ width: 35, height: 35 }} /> 
          </IconButton>
   
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
