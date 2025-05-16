import React from "react";
import { Paper, Typography, Grid, Avatar, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Pic from "../assets/pic31.jpg"; 
import Pic2 from "../assets/pic32.jpg";
import Pic3 from "../assets/pic33.png";
import Pic4 from "../assets/pic34.jpg";
import Pic5 from "../assets/pic35.jpg";
import { useTranslation } from "react-i18next";   
// ✅ Import images (Place images in "public/images/")
const dosImages = [
  "../assets/prof.png", // Example image for first DO
  "../assets/prof.png", // Example image for first DO
];
const dontsImages = [
  "../assets/pic31.jpg", // Example image for first DONT
  "/images/dont2.jpg", // Example image for second DONT
  "/images/dont3.jpg", // Example image for third DONT
];


const DoDontsList = () => {

  const { t } = useTranslation();

  const dosList = [
    { text: t("dos.0"), image: Pic4 },
    { text: t("dos.1"), image: Pic5 },
  ];

  const dontsList = [
    { text: t("donts.0"), image: Pic },
    { text: t("donts.1"), image: Pic3 },
    { text: t("donts.2"), image: Pic2 },
  ];
  return(
  <Box>
    {/* ✅ Do's Section */}
    <Paper sx={{ p: 2, mb: 2, bgcolor: "#e8f5e9" }} elevation={3}>
      <Typography variant="h6" sx={{ color: "green", display: "flex", alignItems: "center" }}>
        <CheckCircleIcon sx={{ mr: 1 }} />{t("dosHeader")}
      </Typography>
      <Grid container spacing={2}>
        {dosList.map((item, index) => (
          <Grid item xs={12} key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={item.image} alt="Do" sx={{ width: 50, height: 50, mr: 2 }} />
            <Typography variant="body2">{item.text}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>

    {/* ❌ Don'ts Section */}
    <Paper sx={{ p: 2, bgcolor: "#ffebee" }} elevation={3}>
      <Typography variant="h6" sx={{ color: "red", display: "flex", alignItems: "center" }}>
        <CancelIcon sx={{ mr: 1 }} /> {t("dontsHeader")}
      </Typography>
      <Grid container spacing={2}>
        {dontsList.map((item, index) => (
          <Grid item xs={12} key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={item.image} alt="Don't" sx={{ width: 50, height: 50, mr: 2 }} />
            <Typography variant="body2">{item.text}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Box>
  )
};

export default DoDontsList;
