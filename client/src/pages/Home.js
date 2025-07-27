import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Modal, 
  Container, 
  Box, 
  Stack, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  useTheme,
  useMediaQuery,
  Fade,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "../assets/backImg.jpg"; 
import aiImage from "../assets/arti.jpg"; 
import videoConsentImage from "../assets/verification.jpg"; 
import blockchainImage from "../assets/blockchain.jpg"; 
import step1Image from "../assets/consentForm.jpg"; 
import step2Image from "../assets/video.jpg"; 
import step3Image from "../assets/Coer.jpg"; 
import step4Image from "../assets/approve.jpg"; 
import registrationImage from "../assets/path.jpg";
import Home2 from "../components/Home2.js"
import Why from "../components/WhyThisMatters.js"
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      
      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { md: "fixed" },
          color: "white",
          textAlign: "center",
          px: { xs: 2, md: 4 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            pointerEvents: "none"
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5rem" },
                lineHeight: 1.1,
                letterSpacing: "-0.02em"
              }}
            >
              {t("title1")}
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 6, 
                color: "#cbd5e1",
                fontWeight: 300,
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6
              }}
            >
              {t("instu")}
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              spacing={3} 
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  borderRadius: "50px",
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                    boxShadow: "0 15px 40px rgba(59, 130, 246, 0.4)",
                    transform: "translateY(-2px)"
                  },
                }}
              >
                {t("log")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/register/seller")}
                sx={{
                  borderRadius: "50px",
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)"
                  },
                }}
              >
                {t("reg")}
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              fontWeight: 700, 
              mb: 8,
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "-0.02em"
            }}
          >
            {t("ins2")}
          </Typography>
        </motion.div>
        
        <Grid container spacing={4}>
          {[
            { 
              img: aiImage, 
              title: "AI-Based Verification", 
              desc: "Ensures the seller's willingness using AI-powered sentiment analysis.",
              gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
            },
            { 
              img: videoConsentImage, 
              title: "Video Consent Validation", 
              desc: "Records Seller video consent and stores it securely for transparency.",
              gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
            },
            { 
              img: blockchainImage, 
              title: "Blockchain Security", 
              desc: "Uses blockchain to securely store the consent Data ensuring tamper-proof.",
              gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card sx={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(15, 23, 42, 0.1)",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  boxShadow: "0 4px 24px rgba(15, 23, 42, 0.08)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
                    transform: "translateY(-4px)"
                  },
                }}>
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia 
                      component="img" 
                      height="240" 
                      image={feature.img} 
                      alt={feature.title}
                      sx={{ 
                        transition: "transform 0.4s ease",
                        "&:hover": { transform: "scale(1.05)" }
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `${feature.gradient}`,
                        opacity: 0.1,
                        transition: "opacity 0.3s ease",
                        ".Card:hover &": { opacity: 0.2 }
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        color: "#1e293b",
                        fontSize: "1.3rem"
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: "#64748b",
                        lineHeight: 1.7,
                        fontSize: "1rem"
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Registration Info Section */}
      <Box sx={{ 
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        py: { xs: 8, md: 12 }
      }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  component="img"
                  src={registrationImage}
                  alt="Registration Department"
                  sx={{
                    width: "100%",
                    borderRadius: "24px",
                    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
                    transition: "transform 0.4s ease",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    background: "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em"
                  }}
                >
                  Revolutionizing Online Registration
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ 
                    fontSize: "1.1rem", 
                    lineHeight: 1.8, 
                    color: "#475569",
                    mb: 3
                  }}
                >
                  {t("para")}
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ 
                    fontSize: "1.1rem", 
                    lineHeight: 1.8, 
                    color: "#475569",
                    mb: 4
                  }}
                >
                  From managing high-volume registrations to verifying identities through secure video consent,
                  our system is built to enhance operational efficiency and trust.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleOpen}
                  sx={{
                    borderRadius: "50px",
                    px: 5,
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                      boxShadow: "0 15px 40px rgba(59, 130, 246, 0.4)",
                      transform: "translateY(-2px)"
                    },
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Process Steps Section */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 8,
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "-0.02em"
            }}
          >
            How the Registration Works
          </Typography>
        </motion.div>
        
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              img: step2Image,
              step: "1",
              title: "Video Consent",
              desc: "Record and store your video statement securely. Immutable once submitted.",
              color: "#3b82f6"
            },
            {
              img: step1Image,
              step: "2",
              title: "Sign Consent Documents",
              desc: "Digitally sign documents with secure storage and traceability.",
              color: "#8b5cf6"
            },
            {
              img: step3Image,
              step: "3",
              title: "AI Verification",
              desc: "AI checks for coercion. Manual review is triggered when anomalies are detected.",
              color: "#06b6d4"
            },
            {
              img: step4Image,
              step: "4",
              title: "Final Approval",
              desc: "Consent verified and a unique transaction ID is issued for transparency.",
              color: "#10b981"
            },
          ].map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid rgba(15, 23, 42, 0.1)",
                    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    boxShadow: "0 4px 24px rgba(15, 23, 42, 0.08)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    height: "100%",
                    "&:hover": {
                      boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
                      transform: "translateY(-4px)"
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <Box
                      component="img"
                      src={step.img}
                      alt={step.title}
                      height="200"
                      sx={{ 
                        width: "100%", 
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                        "&:hover": { transform: "scale(1.05)" }
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: step.color,
                        color: "#fff",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                      }}
                    >
                      {step.step}
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        color: "#1e293b",
                        fontSize: "1.3rem"
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ 
                        color: "#64748b", 
                        lineHeight: 1.7,
                        fontSize: "1rem"
                      }}
                    >
                      {step.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal */}
      <Modal open={openModal} onClose={handleClose}>
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: '95%', sm: '90%', md: 700 },
              maxHeight: '90vh',
              bgcolor: "background.paper",
              boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
              borderRadius: "24px",
              p: 0,
              overflow: "hidden"
            }}
          >
            <Why />
          </Box>
        </Fade>
      </Modal>

      <Box> 
        <Home2/>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        color: "#e2e8f0", 
        py: 4, 
        textAlign: "center" 
      }}>
        <Typography variant="body1" sx={{ fontWeight: 300 }}>
          © Pravin Raju T M, All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;