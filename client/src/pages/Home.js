import React ,{ useState }from "react";
import { AppBar, Toolbar, Button, Typography,Modal, Container, Box, Stack, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/backImg.jpg"; 
import aiImage from "../assets/arti.jpg"; 
import videoConsentImage from "../assets/verification.jpg"; 
import blockchainImage from "../assets/blockchain.jpg"; 
import step1Image from "../assets/consentForm.jpg"; 
import step2Image from "../assets/video.jpg"; 
import step3Image from "../assets/Coer.jpg"; 
import step4Image from "../assets/approve.jpg"; 
import registrationImage from "../assets/path.jpg"; // Add your image in /src/assets
import Home2 from "../components/Home2.js"
import Why from "../components/WhyThisMatters.js"
import { useTranslation } from 'react-i18next';


const Home = () => {
    const { t } = useTranslation();
  
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false)
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
    
    <Box
  sx={{
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    textAlign: "center",
    px: 4,
  }}
>
  <Container maxWidth="md">
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        color: "#fff",
        textShadow: "3px 3px 8px rgba(0,0,0,0.6)",
        mb: 3,
        fontSize: { xs: "2rem", md: "3.5rem" },
      }}
    >
    {t("title1")}
    </Typography>
    <Typography variant="h6" sx={{ mb: 5, color: "#e0e0e0" }}>
{t("instu")}    </Typography>
    <Stack direction="row" spacing={3} justifyContent="center">
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/login")}
        sx={{
          borderRadius: "30px",
          px: 5,
          py: 1.5,
          fontWeight: "bold",
          background: "linear-gradient(to right, #2196f3, #21cbf3)",
          boxShadow: "0 4px 20px rgba(33, 203, 243, 0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(to right, #21cbf3, #2196f3)",
            boxShadow: "0 6px 25px rgba(33, 203, 243, 0.5)",
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
          borderRadius: "30px",
          px: 5,
          py: 1.5,
          fontWeight: "bold",
          color: "#fff",
          borderColor: "#fff",
          backgroundColor: "rgba(255,255,255,0.1)",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "#000",
            borderColor: "#fff",
          },
        }}
      >
       {t("reg")}
      </Button>
    </Stack>
  </Container>
</Box>

      
      {/* Why Choose Us Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 4 }}>
          {t("ins2")}
        </Typography>
        <Grid container spacing={3}>
          {[
            { img: aiImage, title: "AI-Based Verification", desc: "Ensures the seller's willingness using AI-powered sentiment analysis." },
            { img: videoConsentImage, title: "Video Consent Validation", desc: "Records Seller video consent and stores it securly for transparency." },
            { img: blockchainImage, title: "Blockchain Security", desc: "Uses blockchain to securely store the consent Data ensuring tamper-proof." },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{
    borderRadius: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
  }}>
                <CardMedia component="img" height="220" image={feature.img} alt={feature.title} sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
 />
                <CardContent sx={{ textAlign: "center", px:3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container sx={{ py: { xs: 6, md: 10 } }}>
  <Grid container spacing={6} alignItems="center">
    {/* Left Side - Image */}
    <Grid item xs={12} md={6}>
      <Box
        component="img"
        src={registrationImage}
        alt="Registration Department"
        sx={{
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
          transition: "transform 0.4s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      />
    </Grid>

    {/* Right Side - Text */}
    <Grid item xs={12} md={6}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Revolutionizing Online Registration
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444" }}
      >
        {t("para")}
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444" }}
      >
        From managing high-volume registrations to verifying identities through secure video consent,
        our system is built to enhance operational efficiency and trust.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOpen}
        sx={{
          mt: 3,
          px: 4,
          py: 1.5,
          borderRadius: "30px",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
          transition: "0.3s ease",
          "&:hover": {
            backgroundColor: "#1565c0",
            boxShadow: "0px 6px 18px rgba(21,101,192,0.4)",
          },
        }}
      >
        Learn More
      </Button>
    </Grid>
  </Grid>
</Container>

<Box
  sx={{
    background: "linear-gradient(to right, #e0f7fa, #f1f8e9)",
    py: { xs: 6, md: 10 },
  }}
>
  <Container>
    <Typography
      variant="h4"
      align="center"
      sx={{
        fontWeight: "bold",
        mb: 6,
        background: "linear-gradient(90deg, #1976d2, #26a69a)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      How the Registration Works
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {[
        {
          img: step2Image,
          step: "1",
          title: "Video Consent",
          desc: "Record and store your video statement securely. Immutable once submitted.",
        },
        {
          img: step1Image,
          step: "2",
          title: "Sign Consent Documents",
          desc: "Digitally sign documents with secure storage and traceability.",
        },
        {
          img: step3Image,
          step: "3",
          title: "AI Verification",
          desc: "AI checks for coercion. Manual review is triggered when anomalies are detected.",
        },
        {
          img: step4Image,
          step: "4",
          title: "Final Approval",
          desc: "Consent verified and a unique transaction ID is issued for transparency.",
        },
      ].map((step, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              transition: "all 0.35s ease",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box
              component="img"
              src={step.img}
              alt={step.title}
              height="180"
              sx={{ width: "100%", objectFit: "cover" }}
            />
            <CardContent sx={{ textAlign: "center", px: 3, py: 4 }}>
              <Box
                sx={{
                  background: "#26a69a",
                  color: "#fff",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  mb: 2,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
              >
                {step.step}
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#004d40" }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#444", lineHeight: 1.6 }}
              >
                {step.desc}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
{/* Modal */}
<Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: '90%', md: 700 },
            maxHeight: '90vh',
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Why />
        </Box>
      </Modal>
<Box> 
<Home2/>
  
</Box>
      {/* Footer */}
      <Box sx={{ backgroundColor: "#000", color: "#fff", py: 3, textAlign: "center" }}>
        <Typography variant="body2">© Pravin Raju T M,  All Rights Reserved.</Typography>
      </Box>
    </Box>
  
  );
};

export default Home;
