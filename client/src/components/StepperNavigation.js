import React from "react";
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery,
  Paper,
  Chip,
  LinearProgress
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Icons for different steps
import VideocamIcon from '@mui/icons-material/Videocam';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const StepperNavigation = ({ steps, activeStep, stepData = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Default step data if not provided
  const defaultStepData = [
    {
      label: "Video Consent",
      icon: VideocamIcon,
      description: "Record your consent video",
      color: '#e91e63'
    },
    {
      label: "Digital Signature", 
      icon: EditIcon,
      description: "Provide your digital signature",
      color: '#9c27b0'
    },
    {
      label: "Verification Complete",
      icon: VerifiedUserIcon, 
      description: "Complete the verification process",
      color: '#4caf50'
    }
  ];

  const enhancedSteps = stepData.length > 0 ? stepData : defaultStepData;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const getStepStatus = (index) => {
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (index, step) => {
    const status = getStepStatus(index);
    const IconComponent = step.icon || VideocamIcon;
    
    if (status === 'completed') {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CheckCircleIcon sx={{ color: '#4caf50', fontSize: { xs: 24, md: 28 } }} />
        </motion.div>
      );
    }
    
    if (status === 'active') {
      return (
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Box
            sx={{
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 },
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}88 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: `0 4px 12px ${step.color}40`,
              border: `2px solid ${step.color}`,
            }}
          >
            <IconComponent sx={{ fontSize: { xs: 16, md: 20 } }} />
          </Box>
        </motion.div>
      );
    }

    return (
      <Box
        sx={{
          width: { xs: 32, md: 40 },
          height: { xs: 32, md: 40 },
          borderRadius: '50%',
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.1)' 
            : 'rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
          border: '2px solid',
          borderColor: 'divider',
        }}
      >
        <IconComponent sx={{ fontSize: { xs: 16, md: 20 } }} />
      </Box>
    );
  };

  if (isMobile) {
    // Mobile Layout - Compact Design
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            mt: 2,
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 4,
            overflow: 'hidden',
            border: (theme) => theme.palette.mode === 'dark' 
              ? '1px solid rgba(148, 163, 184, 0.2)' 
              : '1px solid rgba(100, 116, 139, 0.2)',
          }}
        >
          {/* Mobile Header */}
          <Box
            sx={{
              p: 2,
              background: `linear-gradient(135deg, ${enhancedSteps[activeStep]?.color || '#6366f1'} 0%, ${enhancedSteps[activeStep]?.color || '#6366f1'}CC 100%)`,
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Step {activeStep + 1} of {enhancedSteps.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {enhancedSteps[activeStep]?.label}
            </Typography>
          </Box>

          {/* Mobile Progress */}
          <Box sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {Math.round(((activeStep + 1) / enhancedSteps.length) * 100)}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={((activeStep + 1) / enhancedSteps.length) * 100}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                background: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.1)' 
                  : 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(135deg, ${enhancedSteps[activeStep]?.color || '#6366f1'} 0%, ${enhancedSteps[activeStep]?.color || '#6366f1'}88 100%)`,
                  borderRadius: 4,
                }
              }}
            />

            {/* Mobile Step Indicators */}
            <Box display="flex" justifyContent="center" gap={1} mt={2}>
              {enhancedSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: index <= activeStep 
                        ? `linear-gradient(135deg, ${step.color} 0%, ${step.color}88 100%)`
                        : (theme) => theme.palette.mode === 'dark' 
                          ? 'rgba(255,255,255,0.2)' 
                          : 'rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                      ...(index === activeStep && {
                        transform: 'scale(1.5)',
                        boxShadow: `0 0 10px ${step.color}60`,
                      })
                    }}
                  />
                </motion.div>
              ))}
            </Box>

            {/* Next Step Preview */}
            {activeStep < enhancedSteps.length - 1 && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Chip
                  label={`Next: ${enhancedSteps[activeStep + 1]?.label}`}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: enhancedSteps[activeStep + 1]?.color,
                    color: enhancedSteps[activeStep + 1]?.color,
                    fontWeight: 'bold',
                    '&:hover': {
                      background: `${enhancedSteps[activeStep + 1]?.color}10`,
                    }
                  }}
                />
              </Box>
            )}
          </Box>
        </Paper>
      </motion.div>
    );
  }

  // Desktop Layout - Enhanced Stepper
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          mt: 2,
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: 4,
          overflow: 'hidden',
          border: (theme) => theme.palette.mode === 'dark' 
            ? '1px solid rgba(148, 163, 184, 0.2)' 
            : '1px solid rgba(100, 116, 139, 0.2)',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 25px 50px rgba(0, 0, 0, 0.25)'
            : '0 25px 50px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Desktop Header */}
        <Box
          sx={{
            p: 3,
            background: `linear-gradient(135deg, ${enhancedSteps[activeStep]?.color || '#6366f1'} 0%, ${enhancedSteps[activeStep]?.color || '#6366f1'}CC 100%)`,
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              animation: 'shimmer 3s infinite',
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' }
            }
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} flexWrap="wrap">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {React.createElement(enhancedSteps[activeStep]?.icon || VideocamIcon, { 
                sx: { fontSize: { md: 28, lg: 32 } } 
              })}
            </motion.div>
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {enhancedSteps[activeStep]?.label}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {enhancedSteps[activeStep]?.description}
              </Typography>
            </Box>
          </Box>
          
          {/* Progress Bar */}
          <Box sx={{ mt: 2, maxWidth: 400, mx: 'auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Step {activeStep + 1} of {enhancedSteps.length}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {Math.round(((activeStep + 1) / enhancedSteps.length) * 100)}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={((activeStep + 1) / enhancedSteps.length) * 100}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                background: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: 4,
                }
              }}
            />
          </Box>
        </Box>

        {/* Enhanced Desktop Stepper */}
        <Box sx={{ p: 4 }}>
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            sx={{
              '& .MuiStepConnector-root': {
                top: { md: 20, lg: 24 },
                left: 'calc(-50% + 20px)',
                right: 'calc(50% + 20px)',
                '& .MuiStepConnector-line': {
                  height: 4,
                  border: 0,
                  borderRadius: 2,
                  background: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.2)' 
                    : 'rgba(0,0,0,0.2)',
                }
              },
              '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
              },
              '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                background: `linear-gradient(135deg, ${enhancedSteps[activeStep]?.color || '#6366f1'} 0%, ${enhancedSteps[activeStep]?.color || '#6366f1'}88 100%)`,
              }
            }}
          >
            {enhancedSteps.map((step, index) => (
              <Step key={index}>
                <motion.div variants={stepVariants}>
                  <StepLabel
                    StepIconComponent={() => getStepIcon(index, step)}
                  >
                    <Box sx={{ mt: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        fontWeight="bold"
                        color={
                          index === activeStep ? 'primary.main' :
                          index < activeStep ? 'success.main' : 
                          'text.secondary'
                        }
                      >
                        {step.label}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: '0.85rem',
                          maxWidth: 150,
                          mx: 'auto',
                          lineHeight: 1.3
                        }}
                      >
                        {step.description}
                      </Typography>
                      
                      {/* Status Chip */}
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          label={
                            index < activeStep ? "Completed" :
                            index === activeStep ? "In Progress" :
                            "Pending"
                          }
                          size="small"
                          color={
                            index < activeStep ? "success" :
                            index === activeStep ? "primary" :
                            "default"
                          }
                          sx={{ 
                            fontSize: '0.7rem',
                            height: 20,
                            fontWeight: 'bold',
                            ...(index === activeStep && {
                              background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}88 100%)`,
                              color: 'white'
                            })
                          }}
                        />
                      </Box>
                    </Box>
                  </StepLabel>
                </motion.div>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default StepperNavigation;