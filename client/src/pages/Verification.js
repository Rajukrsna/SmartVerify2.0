import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Snackbar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import AppTheme from "../theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "../theme/ColorModeSelect";
import Stack from "@mui/material/Stack";

import VideoConsent from "../components/VideoConsent";
import DigitalSignature from "../components/DigitalSignature";
import VerificationComplete from "../components/VerificationComplete";
import StepperNavigation from "../components/StepperNavigation";

const steps = ["Video Consent", "Digital Signature", "Verification Complete"];

const SellerVerification = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleNextStep = () => setActiveStep((prevStep) => prevStep + 1);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Stack direction="row" component="main" sx={{ justifyContent: "center", alignItems: "stretch", minHeight: "100vh" }}>
      <Stack direction={{ xs: "column-reverse", md: "row" }} sx={{ justifyContent: "center", p: 2, mx: "auto" }}>
        <Box sx={{ p: 4, textAlign: "center", width: "100%", maxWidth: "1200px", margin: "auto" }}>
        <StepperNavigation steps={steps} activeStep={activeStep} />
        <Box sx={{ width: "100%" }}>

            {activeStep === 0 && <VideoConsent handleNextStep={handleNextStep} />}
            {activeStep === 1 && <DigitalSignature handleNextStep={handleNextStep} />}
            {activeStep === 2 && <VerificationComplete navigate={navigate} />}
            <Snackbar open={notification !== ""} autoHideDuration={3000} onClose={() => setNotification("")} message={notification} />
          </Box>
          </Box>
        </Stack>
      </Stack>
    </AppTheme>
  );
};

export default SellerVerification;
