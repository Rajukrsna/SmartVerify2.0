import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StepperNavigation = ({ steps, activeStep }) => (
  <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 , paddingTop: 4}}>
    {steps.map((label, index) => (
      <Step key={index}>
        <StepLabel icon={index < activeStep || activeStep === 2 ? <CheckCircleIcon color="success" /> : undefined}>
          {label}
        </StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default StepperNavigation;
