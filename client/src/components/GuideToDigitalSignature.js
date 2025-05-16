import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { FaFileUpload, FaUserEdit, FaPaperPlane, FaSignature, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";


 
const SignatureSteps = () => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, icon: <FaFileUpload size={30} color="#1976d2" />, text: t("step1") },
    { id: 2, icon: <FaUserEdit size={30} color="#1976d2" />, text: t("step2") },
    { id: 3, icon: <FaPaperPlane size={30} color="#1976d2" />, text: t("step3") },
    { id: 4, icon: <FaSignature size={30} color="#1976d2" />, text: t("step4") },
    { id: 5, icon: <FaCheckCircle size={30} color="#1976d2" />, text: t("step5") },
  ];
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} p={2}>
      {steps.map((step) => (
        <Paper
          key={step.id}
          elevation={3}
          sx={{
            width: 220,
            p: 2,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box mb={1}>{step.icon}</Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {t("step")} {step.id}          </Typography>
          <Typography variant="body2" color="text.secondary">
            {step.text}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default SignatureSteps;
