import React, { useState } from "react";
import axios from "axios"; // ✅ Import axios
import { Button, TextField, Container, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SellerRegister = () => {
  const [sellerData, setSellerData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Fix error state
  const navigate = useNavigate(); // ✅ Fix navigation
console.log(sellerData)
  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/authRoute/register`, {
        name: sellerData.name,
        email: sellerData.email,
        password: sellerData.password,
      });

      if (response.data) {
        navigate("/login"); // ✅ Fix navigation function
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Seller Registration
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
       {/* ✅ Show error message */}              
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default SellerRegister;
