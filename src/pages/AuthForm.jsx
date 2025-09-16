import React, { useState } from "react";
import {
  Box, Button, Container, TextField, Tabs, Tab, Alert
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AuthForm() {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    username: "", email: "", password: "", confirmPassword: ""
  });
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
    setAuthError("");
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const body = new URLSearchParams();
      body.append("username", formData.email);
      body.append("password", formData.password);

      const res = await axios.post("https://quick-remover-backend-production.up.railway.app/login", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setAuthError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://quick-remover-backend-production.up.railway.app/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setAuthError(err.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        {authError && <Alert severity="error" sx={{ mb: 2 }}>{authError}</Alert>}

        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 3 }}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {tabValue === 0 ? (
          <Box>
            <TextField fullWidth label="Email or Username"
              value={formData.email} onChange={handleInputChange("email")}
              margin="normal" />
            <TextField fullWidth label="Password" type="password"
              value={formData.password} onChange={handleInputChange("password")}
              margin="normal" />
            <Button fullWidth variant="contained"
              onClick={handleLogin} disabled={loading} sx={{ mt: 3 }}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        ) : (
          <Box>
            <TextField fullWidth label="Username"
              value={formData.username} onChange={handleInputChange("username")}
              margin="normal" />
            <TextField fullWidth label="Email"
              value={formData.email} onChange={handleInputChange("email")}
              margin="normal" />
            <TextField fullWidth label="Password" type="password"
              value={formData.password} onChange={handleInputChange("password")}
              margin="normal" />
            <TextField fullWidth label="Confirm Password" type="password"
              value={formData.confirmPassword} onChange={handleInputChange("confirmPassword")}
              margin="normal" />
            <Button fullWidth variant="contained"
              onClick={handleSignup} disabled={loading} sx={{ mt: 3 }}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
}
