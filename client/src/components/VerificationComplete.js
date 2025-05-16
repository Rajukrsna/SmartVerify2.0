import React, { useEffect } from "react";
import { Paper, Typography, Button, Fade } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";  
const userId = localStorage.getItem("userId"); 
const VerificationComplete = ({ navigate }) => {
  const { t } = useTranslation();


  const handleDownloadReceipt = () => alert(t("verification.downloadAlert"));
    
  return (
    <Fade in timeout={1000}>
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          bgcolor: "#e3f2fd",
          borderRadius: "12px",
          maxWidth: "400px",
          mx: "auto",
          boxShadow: 3,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
          {t("verification.title")}
        </Typography>
        <Typography>{t("verification.message")}</Typography>

        <Button
          variant="contained"
          color="warning"
          sx={{ mt: 3, width: "80%", borderRadius: "20px" }}
          onClick={() => navigate("/seller-dashboard")}
        >
          {t("verification.dashboardBtn")}
        </Button>

        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2, width: "80%", borderRadius: "20px" }}
          onClick={handleDownloadReceipt}
        >
          {t("verification.downloadBtn")}
        </Button>
      </Paper>
    </Fade>
  );
};

export default VerificationComplete;
