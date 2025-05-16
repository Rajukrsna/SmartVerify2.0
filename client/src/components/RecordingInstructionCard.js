import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
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

  const instructionData = [
    {
      key: "lighting",
      icon: <LightbulbIcon fontSize="large" color="primary" />,
    },
    {
      key: "start",
      icon: <VideocamIcon fontSize="large" color="primary" />,
    },
    {
      key: "speak",
      icon: <RecordVoiceOverIcon fontSize="large" color="primary" />,
    },
    {
      key: "pause",
      icon: <PauseCircleIcon fontSize="large" color="primary" />,
    },
    {
      key: "look",
      icon: <CameraAltIcon fontSize="large" color="primary" />,
    },
    {
      key: "submit",
      icon: <SendIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box sx={{ overflowX: "auto", py: 3 }}>
      <Grid container spacing={2}>
        {instructionData.map(({ key, icon }) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {icon}
                  <Typography
                    variant="h6"
                    sx={{ ml: 2, fontWeight: "bold" }}
                  >
                    {t(`instructions2.${key}.title`)}
                  </Typography>
                </Box>
                <Typography variant="body2">
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
