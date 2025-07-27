
import { 
  Box, 
  Paper, 
  Typography, 
  Container,
  Grid,
  useTheme,
  useMediaQuery 
} from "@mui/material";
import { FaFileUpload, FaUserEdit, FaPaperPlane, FaSignature, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const SignatureSteps = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const steps = [
    { 
      id: 1, 
      icon: <FaFileUpload size={isMobile ? 24 : 32} color="#3b82f6" />, 
      text: t("step1"),
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    },
    { 
      id: 2, 
      icon: <FaUserEdit size={isMobile ? 24 : 32} color="#8b5cf6" />, 
      text: t("step2"),
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
    },
    { 
      id: 3, 
      icon: <FaPaperPlane size={isMobile ? 24 : 32} color="#06b6d4" />, 
      text: t("step3"),
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
    },
    { 
      id: 4, 
      icon: <FaSignature size={isMobile ? 24 : 32} color="#10b981" />, 
      text: t("step4"),
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    { 
      id: 5, 
      icon: <FaCheckCircle size={isMobile ? 24 : 32} color="#f59e0b" />, 
      text: t("step5"),
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          align="center"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.5rem", md: "2rem" },
            letterSpacing: "-0.02em"
          }}
        >
          {t("digitalSignatureGuide") || "Digital Signature Process"}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            color: "#64748b",
            fontSize: { xs: "0.9rem", md: "1rem" },
            maxWidth: "600px",
            mx: "auto"
          }}
        >
          {t("signatureDescription") || "Follow these simple steps to complete your digital signature process"}
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
        {steps.map((step, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={2.4} 
            key={step.id}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              style={{ width: '100%', maxWidth: '280px' }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  p: { xs: 3, md: 4 },
                  textAlign: "center",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: "1px solid rgba(15, 23, 42, 0.1)",
                  boxShadow: "0 4px 24px rgba(15, 23, 42, 0.08)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
                    transform: "translateY(-4px)",
                    "& .step-number": {
                      transform: "scale(1.1)"
                    },
                    "& .icon-container": {
                      transform: "scale(1.1)"
                    }
                  },
                }}
              >
                {/* Step Number */}
                <Box
                  className="step-number"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: { xs: 28, md: 32 },
                    height: { xs: 28, md: 32 },
                    borderRadius: "50%",
                    background: step.gradient,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", md: "0.9rem" },
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    transition: "transform 0.3s ease"
                  }}
                >
                  {step.id}
                </Box>

                {/* Icon Container */}
                <Box
                  className="icon-container"
                  sx={{
                    width: { xs: 60, md: 70 },
                    height: { xs: 60, md: 70 },
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${step.gradient.split(',')[0].split('(')[1]} 20%, ${step.gradient.split(',')[1].split(' ')[1]} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                    "& svg": {
                      filter: "brightness(0) invert(1)"
                    }
                  }}
                >
                  {step.icon}
                </Box>

                {/* Step Title */}
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: "#1e293b",
                    fontSize: { xs: "1rem", md: "1.1rem" }
                  }}
                >
                  {t("step")} {step.id}
                </Typography>

                {/* Step Description */}
                <Typography 
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.85rem", md: "0.9rem" }
                  }}
                >
                  {step.text}
                </Typography>

                {/* Connection Line for Desktop */}
                {!isMobile && index < steps.length - 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: "-20px",
                      width: "40px",
                      height: "2px",
                      background: "linear-gradient(90deg, #e2e8f0 0%, transparent 100%)",
                      zIndex: 0,
                      transform: "translateY(-50%)",
                      display: { xs: "none", lg: "block" }
                    }}
                  />
                )}
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Progress Indicator for Mobile */}
      {isMobile && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {steps.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#e2e8f0",
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default SignatureSteps;