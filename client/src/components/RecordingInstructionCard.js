import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import VideocamIcon from "@mui/icons-material/Videocam";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

const RecordingInstructionsCards = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const instructionData = [
    {
      key: "lighting",
      icon: <LightbulbIcon fontSize={isMobile ? "medium" : "large"} color="primary" />,
    },
    {
      key: "start",
      icon: <VideocamIcon fontSize={isMobile ? "medium" : "large"} color="primary" />,
    },
    {
      key: "speak",
      icon: <RecordVoiceOverIcon fontSize={isMobile ? "medium" : "large"} color="primary" />,
    },
    {
      key: "pause",
      icon: <PauseCircleIcon fontSize={isMobile ? "medium" : "large"} color="primary" />,
    },
    {
      key: "look",
      icon: <CameraAltIcon fontSize={isMobile ? "medium" : "large"} color="primary" />,
    },
    {
      key: "submit",
      icon: <SendIcon fontSize={isMobile ? "medium" : "large"} color="primary" />,
    },
  ];

  return (
    <Box sx={{ 
      overflowX: "auto", 
      py: { xs: 2, md: 3 },
      px: { xs: 1, md: 0 }
    }}>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }}>
        {instructionData.map(({ key, icon }) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card sx={{ 
              height: "100%",
              minHeight: { xs: 'auto', md: '140px' }
            }}>
              <CardContent sx={{ 
                p: { xs: 2, md: 3 },
                '&:last-child': { pb: { xs: 2, md: 3 } }
              }}>
                <Box sx={{ 
                  display: "flex", 
                  alignItems: isMobile ? "flex-start" : "center", 
                  mb: { xs: 1, md: 2 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}>
                  <Box sx={{ 
                    mb: { xs: 1, sm: 0 },
                    mr: { sm: 2 }
                  }}>
                    {icon}
                  </Box>
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{ 
                      fontWeight: "bold",
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      lineHeight: { xs: 1.3, md: 1.2 }
                    }}
                  >
                    {t(`instructions2.${key}.title`)}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.85rem', md: '0.875rem' },
                    lineHeight: { xs: 1.4, md: 1.43 },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  {t(`instructions2.${key}.description`)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecordingInstructionsCards;