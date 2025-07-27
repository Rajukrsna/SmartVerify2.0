import { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Chip
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSelect from "../theme/ColorModeSelect";
import { DashboardIcon, LoginIcon, RegisterIcon, LogoutIcon } from "../components/CustomIcons";
import { ReactComponent as SmartVerifyLogo } from '../logo.svg';
import { useTranslation } from "react-i18next";
import TNLOGO from "../assets/logo4.png";
import { useAuth } from "./AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Additional icons for mobile
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  // Navigation items for mobile menu
  const getNavigationItems = () => {
    if (isAuthenticated) {
      return [
        {
          text: t("dashboard"),
          icon: <DashboardIcon />,
          onClick: () => {
            navigate("/seller-dashboard");
            setMobileMenuOpen(false);
          }
        },
        {
          text: t("logout"),
          icon: <LogoutIcon />,
          onClick: handleLogout,
          color: 'error'
        }
      ];
    } else {
      return [
        {
          text: t("login"),
          icon: <LoginIcon />,
          onClick: () => {
            navigate("/login");
            setMobileMenuOpen(false);
          }
        },
        {
          text: t("register"),
          icon: <RegisterIcon />,
          onClick: () => {
            navigate("/register/seller");
            setMobileMenuOpen(false);
          }
        }
      ];
    }
  };

  // Mobile Drawer Component
  const MobileDrawer = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #2c2c2c 0%, #3c3c3c 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <SmartVerifyLogo sx={{ width: 30, height: 30, color: theme.palette.text.primary }} />
            
          </Box>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Navigation Items */}
        <List>
          <ListItemButton
            component={Link}
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("home") || "Home"} />
          </ListItemButton>

          {getNavigationItems().map((item, index) => (
            <ListItemButton
              key={index}
              onClick={item.onClick}
              sx={{ 
                borderRadius: 2, 
                mb: 1,
                color: item.color === 'error' ? 'error.main' : 'inherit'
              }}
            >
              <ListItemIcon sx={{ color: item.color === 'error' ? 'error.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Language Selection */}
        <Box sx={{ px: 2 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Language
          </Typography>
          <Box display="flex" gap={1}>
            <Chip
              label="EN"
              variant={i18n.language === 'en' ? 'filled' : 'outlined'}
              onClick={() => changeLanguage('en')}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
            <Chip
              label="TA"
              variant={i18n.language === 'ta' ? 'filled' : 'outlined'}
              onClick={() => changeLanguage('ta')}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        </Box>

        {/* Theme Toggle */}
        <Box sx={{ px: 2, mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Theme
          </Typography>
          <ColorModeSelect />
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 'auto', pt: 2, textAlign: 'center' }}>
          <Avatar src={TNLOGO} alt="Logo" sx={{ width: 40, height: 40, mx: 'auto', mb: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Powered by Tamil Nadu Government
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.9)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: "blur(10px)",
          borderBottom: (theme) => theme.palette.mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: (theme) => theme.palette.mode === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.1)',
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          px: { xs: 2, md: 3 },
          minHeight: { xs: 56, md: 64 }
        }}>
          
          {/* Logo & Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
              <IconButton 
                component={Link} 
                to="/" 
                sx={{ 
                  p: { xs: 0.5, md: 1 },
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s ease'
                  }
                }}
              >
                <SmartVerifyLogo sx={{ 
                  width: { xs: 28, md: 35 }, 
                  height: { xs: 28, md: 35 }, 
                  color: theme.palette.text.primary 
                }} />
              </IconButton>
              
           
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                
                {/* Language Toggle */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={handleLanguageMenuOpen}
                    sx={{
                      color: theme.palette.text.primary,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <LanguageIcon />
                  </IconButton>
                  
                  <Menu
                    anchorEl={languageMenuAnchor}
                    open={Boolean(languageMenuAnchor)}
                    onClose={handleLanguageMenuClose}
                    PaperProps={{
                      sx: {
                        background: (theme) => theme.palette.mode === 'dark' 
                          ? 'rgba(44, 44, 44, 0.95)'
                          : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                      }
                    }}
                  >
                    <MenuItem onClick={() => changeLanguage("en")}>
                      <Chip
                        label="English"
                        variant={i18n.language === 'en' ? 'filled' : 'outlined'}
                        size="small"
                      />
                    </MenuItem>
                    <MenuItem onClick={() => changeLanguage("ta")}>
                      <Chip
                        label="தமிழ்"
                        variant={i18n.language === 'ta' ? 'filled' : 'outlined'}
                        size="small"
                      />
                    </MenuItem>
                  </Menu>
                </Box>

             

                {/* Authentication Buttons */}
                {isAuthenticated ? (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => navigate("/seller-dashboard")}
                      startIcon={<DashboardIcon />}
                      sx={{ 
                        color: theme.palette.text.primary, 
                        fontWeight: "bold",
                        borderRadius: 2,
                        px: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      {t("dashboard")}
                    </Button>
                    
                    <Button
                      color="inherit"
                      onClick={handleLogout}
                      startIcon={<LogoutIcon />}
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: "bold",
                        borderRadius: 2,
                        px: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          color: 'error.main'
                        }
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
                      sx={{ 
                        color: theme.palette.text.primary, 
                        fontWeight: "bold",
                        borderRadius: 2,
                        px: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      {t("login")}
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => navigate("/register/seller")}
                      startIcon={<RegisterIcon />}
                      variant="outlined"
                      sx={{ 
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.text.primary,
                        fontWeight: "bold",
                        borderRadius: 2,
                        px: 2,
                        '&:hover': {
                          backgroundColor: theme.palette.text.primary,
                          color: theme.palette.background.default,
                        }
                      }}
                    >
                     {t("register")}
                    </Button>
                  </>
                )}

                {/* Government Logo */}
                <IconButton 
                  component={Link} 
                  to="/" 
                  sx={{ 
                    p: 1,
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease'
                    }
                  }}
                >
                  <Avatar src={TNLOGO} alt="TN Logo" sx={{ width: 35, height: 35 }} />
                </IconButton>
              </Box>
            </motion.div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar src={TNLOGO} alt="TN Logo" sx={{ width: 30, height: 30 }} />
                <IconButton
                  onClick={handleMobileMenuToggle}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </motion.div>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Spacer for fixed navbar */}
      <Toolbar sx={{ minHeight: { xs: 56, md: 64 } }} />
    </>
  );
};

export default Navbar;