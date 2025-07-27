import React from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  IconButton,
  ListItemText, 
  ListItemAvatar,  
  Button, 
  Grid, 
  Avatar,
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import { motion } from "framer-motion";
import RecordImage from "../assets/Record.jpg";
import SignImage from "../assets/Sign.jpg";
import AIimg from "../assets/AI.jpg"; 
import axios from "axios";
import { useEffect, useState } from "react";
import ColorModeSelect from '../theme/ColorModeSelect';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from "../theme/AppTheme";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { green, red, blue, grey } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTranslation } from "react-i18next";
import { useAuth } from "./AuthContext"; 

const userId = localStorage.getItem("userId");
console.log("userId", userId);  

const SellerDashboard = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [notifications, setNotifications] = useState([]);  
  const [aiStatus, setAistatus] = useState([]);
  const [events, setEvents] = useState([]);
  
  // Instruction Steps
  const instructionSteps = [
    {
      id: 1,
      title: t("instructions.1.title"),
      description: t("instructions.1.description"),
      image: RecordImage,
    },
    {
      id: 2,
      title: t("instructions.2.title"),
      description: t("instructions.2.description"),
      image: SignImage,
    },
    {
      id: 3,
      title: t("instructions.3.title"),
      description: t("instructions.3.description"),
      image: AIimg,
    },
  ];

  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    if(!(isAuthenticated.isAuthenticated)) {
      navigate("/login");
      return;
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/timeline/events/${userId}`);
      setEvents(response.data);
    } catch (error) {
      console.error("❌ Error fetching events:", error);
    }
  };
  
  const fetchStatus = async () => { 
    try{
      const response = await axios.get(`http://localhost:5000/api/video/save/${userId}`);
      setAistatus(response.data.result);
      console.log(response)
    }
    catch(error){
      console.error("❌ Error fetching AIstatus:", error);
    }
  }

  useEffect(() => {
    fetchEvents();
    fetchStatus();
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
    
      
      <Container 
        maxWidth="xl" 
        sx={{
          minHeight: '100vh',
          py: { xs: 2, md: 4 },
          background: (theme) => theme.applyStyles('light', {
            backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
          }),
          ...theme.applyStyles('dark', {
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
          }),
        }}
      >
        <Box sx={{ 
          p: { xs: 1, md: 2 }, 
          backgroundColor: "#f9f9f9", 
          minHeight: "100vh",
          borderRadius: { xs: 0, md: 2 }
        }}>
          
          {/* Top Section: Image + Steps */}
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
              mb: { xs: 2, md: 3 },
              p: { xs: 2, md: 3 },
              backgroundColor: "#ffffff",
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              fontWeight="bold" 
              align="center" 
              gutterBottom
              sx={{ mb: { xs: 2, md: 3 } }}
            >
              {t("seed")}
            </Typography>

            {/* Instructions Grid */}
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {instructionSteps.map((step) => (
                <Grid item xs={12} sm={6} md={4} key={step.id}>
                  <Box textAlign="center">
                    <img
                      src={step.image}
                      alt={step.title}
                      style={{ 
                        width: "100%", 
                        maxWidth: isMobile ? "80px" : "120px", 
                        height: "auto", 
                        marginBottom: "10px" 
                      }}
                    />
                    <Typography 
                      variant={isMobile ? "subtitle1" : "h6"} 
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      {step.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="textSecondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                        lineHeight: 1.4 
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Proceed Button */}
            <Box textAlign="center" mt={{ xs: 2, md: 3 }}>
              <Button
                component={motion.button}
                whileHover={{ scale: isMobile ? 1.02 : 1.1 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                color="primary"
                size={isMobile ? "medium" : "large"}
                onClick={() => navigate("/verification")}
                sx={{
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '0.9rem', md: '1rem' }
                }}
              >
                {t("proceed")}
              </Button>
            </Box>
          </Card>

          {/* Bottom Section: Notifications & Timeline */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            
            {/* Notifications Panel */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                p: { xs: 1, md: 2 }, 
                boxShadow: 3, 
                borderRadius: 3,
                height: { md: 'fit-content' }
              }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  {/* Header with Notification Icon and Mark All as Read */}
                  <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center"
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Typography 
                      variant={isMobile ? "subtitle1" : "h6"} 
                      fontWeight="bold"
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      <NotificationsActiveIcon 
                        color="primary" 
                        sx={{ 
                          verticalAlign: "middle", 
                          mr: 1,
                          fontSize: { xs: '1.2rem', md: '1.5rem' }
                        }} 
                      /> 
                      {t("Noti")}
                    </Typography>
                    <IconButton 
                      color="success"
                      size={isMobile ? "small" : "medium"}
                    >
                      <DoneAllIcon />
                    </IconButton>
                  </Box>

                  {/* View all notifications */}
                  <Typography 
                    variant="body2" 
                    color="primary" 
                    sx={{ 
                      mt: 2, 
                      textAlign: "center", 
                      cursor: "pointer",
                      fontSize: { xs: '0.8rem', md: '0.875rem' }
                    }}
                  >
                    View all notifications
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Timeline Panel */}
            <Grid item xs={12} md={8}>
              <Card sx={{ 
                p: { xs: 1, md: 3 }, 
                boxShadow: 3, 
                borderRadius: 3 
              }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    mb={2}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    gap={{ xs: 2, sm: 0 }}
                  >
                    <Typography 
                      variant={isMobile ? "subtitle1" : "h6"} 
                      fontWeight="bold"
                    >
                      Key Events
                    </Typography>
               
                  </Box>

                  {/* Mobile Timeline - Vertical Layout */}
                  {isMobile ? (
                    <Timeline position="right">
                      {events.map((event, index) => (
                        <TimelineItem key={index}>
                          <TimelineSeparator>
                            <TimelineDot color={event.status === "Completed" ? "success" : "warning"}>
                              <CheckCircleIcon sx={{ fontSize: '1rem' }} />
                            </TimelineDot>
                            {index !== events.length - 1 && <TimelineConnector />}
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant="body2" fontWeight="bold">
                              {event.title}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              📅 {new Date(event.date).toLocaleString()}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  ) : (
                    /* Desktop Timeline - Horizontal Layout */
                    <Timeline
                      position="right"
                      sx={{ 
                        display: "flex", 
                        flexDirection: "row", 
                        overflowX: "auto", 
                        whiteSpace: "nowrap",
                        pb: 2
                      }}
                    >
                      {events.map((event, index) => (
                        <TimelineItem 
                          key={index} 
                          sx={{ 
                            display: "inline-flex", 
                            flexDirection: "column", 
                            alignItems: "center", 
                            minWidth: "200px" 
                          }}
                        >
                          <TimelineSeparator>
                            <TimelineDot color={event.status === "Completed" ? "success" : "warning"}>
                              <CheckCircleIcon />
                            </TimelineDot>
                            {index !== events.length - 1 && (
                              <TimelineConnector 
                                sx={{ 
                                  width: "100px", 
                                  height: "2px", 
                                  backgroundColor: "gray" 
                                }} 
                              />
                            )}
                          </TimelineSeparator>
                          <TimelineContent sx={{ textAlign: "center", mt: 1 }}>
                            <Typography variant="body1" fontWeight="bold">
                              {event.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              📅 {new Date(event.date).toLocaleString()}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  )}

                  <Typography 
                    color="primary" 
                    sx={{ 
                      mt: 2, 
                      cursor: "pointer", 
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                      "&:hover": { textDecoration: "underline" } 
                    }}
                  >
                    {t("details")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AppTheme>
  );
};

export default SellerDashboard;