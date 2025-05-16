import React from "react";
import { Box, Card, CardContent, Typography, List, ListItem, IconButton,ListItemText, ListItemAvatar,  Button, Grid, Avatar } from "@mui/material";
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
const [notifications , setNotifications] = useState([]);  
const [aiStatus , setAistatus] = useState([]);
// Notifications


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

  const [events, setEvents] = useState([]);

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
setAistatus(response.data.result); // Assuming the API returns the AI status directly
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
    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
    <Stack
      direction="column"
      component="main"
      sx={[
        {
          justifyContent: 'center',
          height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
          marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
          minHeight: '100%',
        },
        (theme) => ({
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            backgroundImage:
              'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundRepeat: 'no-repeat',
            ...theme.applyStyles('dark', {
              backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            }),
          },
        }),
      ]}
    >
      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{
          justifyContent: 'center',
          gap: { xs: 6, sm: 12 },
          p: 2,
          mx: 'auto',
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: { xs: 2, sm: 4 },
            m: 'auto',
          }}
        >
       
      
    <Box sx={{ p: 1, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Top Section: Image + Steps */}
      <Card
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        mb: 3,
        p: 3,
        backgroundColor: "#ffffff",
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
       {t("seed")}
      </Typography>

      {/* Instructions Grid */}
      <Grid container spacing={3}>
        {instructionSteps.map((step) => (
          <Grid item xs={12} md={4} key={step.id} textAlign="center">
            <img
              src={step.image}
              alt={step.title}
              style={{ width: "100%", maxWidth: "120px", height: "auto", marginBottom: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold">
              {step.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {step.description}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Proceed Button */}
      <Box textAlign="center" mt={3}>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/verification")}
        >
      {t("proceed")}
        </Button>
      </Box>
    </Card>

      {/* Bottom Section: Notifications & Timeline */}
      <Grid container spacing={3}>
        {/* Notifications Panel */}
        <Grid item xs={12} md={4}>
      <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          {/* Header with Notification Icon and Mark All as Read */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              <NotificationsActiveIcon color="primary" sx={{ verticalAlign: "middle", mr: 1 }} /> {t("Noti")}
            </Typography>
            <IconButton color="success">
              <DoneAllIcon />
            </IconButton>
          </Box>

        

          {/* View all notifications */}
          <Typography variant="body2" color="primary" sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}>
            View all notifications
          </Typography>
        </CardContent>
      </Card>
    </Grid>

        {/* Timeline Panel */}
        <Grid item xs={12} md={8}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Key Events
            </Typography>
            <Button variant="contained" color="primary" startIcon={<CalendarTodayIcon />}>
             {t("calander")}
            </Button>
          </Box>
          <Timeline
  position="right"
  sx={{ 
    display: "flex", 
    flexDirection: "row", 
    overflowX: "auto", 
    whiteSpace: "nowrap" 
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
        {index !== events.length - 1 && <TimelineConnector sx={{ width: "100px", height: "2px", backgroundColor: "gray" }} />}
      </TimelineSeparator>
      <TimelineContent sx={{ textAlign: "center", mt: 1 }}>
        <Typography variant="body1" fontWeight="bold">{event.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          📅 {new Date(event.date).toLocaleString()}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
          <Typography color="primary" sx={{ mt: 2, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
            {t("details")}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
      </Grid>
    </Box>
    
        </Stack>
      </Stack>
    </Stack>
  </AppTheme>
  );
};

export default SellerDashboard;
