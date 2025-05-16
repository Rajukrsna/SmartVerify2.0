import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { FaVideo, FaBrain, FaShieldAlt } from "react-icons/fa";

const services = [
  {
    icon: <FaVideo size={36} color="#3f51b5" />,
    title: "Video Consent Capture",
    description:
      "We record video statements to ensure the seller is aware, willing, and fully informed — creating strong legal proof.",
  },
  {
    icon: <FaBrain size={36} color="#3f51b5" />,
    title: "AI-Based Emotion Analysis",
    description:
      "Advanced AI checks the seller's facial cues and tone to detect stress, confusion, or coercion during the consent process.",
  },
  {
    icon: <FaShieldAlt size={36} color="#3f51b5" />,
    title: "Digital Signature Security",
    description:
      "Transactions are sealed using tamper-proof digital signatures, preventing impersonation or forged agreements.",
  },
];



const HomePage = () => {
  return (
    <Box>
      {/* Services Section */}
      <Box sx={{ backgroundColor: "#e4e7ff", py: 6, px: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Trusted Verification Services
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {services.map((service, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ mb: 2 }}>{service.icon}</Box>
                <Typography variant="h6" fontWeight="bold">
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {service.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: 4, borderRadius: "20px", px: 4, py: 1.5 }}
        >
          Start Verification
        </Button>
      </Box>

    </Box>
  );
};

export default HomePage;
