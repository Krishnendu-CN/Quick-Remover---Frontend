import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  Alert
} from "@mui/material";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
const AuthForm = ({ onLogin }) => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setErrors({});
    setAuthError("");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    if (authError) setAuthError("");
  };

  const validateForm = (isSignup) => {
    const newErrors = {};
    if (isSignup) {
      if (!formData.username.trim()) newErrors.username = "Username is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (isSignup) {
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm(true)) return;
    setLoading(true);
    try {
      const response = await axios.post("https://quick-remover-backend-production.up.railway.app/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });
      localStorage.setItem("token", response.data.access_token);
      onLogin(response.data.access_token);
    } catch (error) {
      setAuthError(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateForm(false)) return;
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.email);
      formDataToSend.append("password", formData.password);
      const response = await axios.post("https://quick-remover-backend-production.up.railway.app/login", formDataToSend, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });
      localStorage.setItem("token", response.data.access_token);
      onLogin(response.data.access_token);
    } catch (error) {
      setAuthError(error.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{ py: 5 }}>
        {authError && <Alert severity="error" sx={{ mb: 2 }}>{authError}</Alert>}
        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 3 }}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {tabValue === 0 ? (
          <Box component="form">
            <TextField
              fullWidth
              label="Email or Username"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        ) : (
          <Box component="form">
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={handleInputChange("username")}
              error={!!errors.username}
              helperText={errors.username}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSignup}
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default function Signlog() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    fetchUserInfo(token);
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("https://quick-remover-backend-production.up.railway.app/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token);
    }
  }, []);

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      {isLoggedIn ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography>Welcome, {user?.username}</Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <AuthForm onLogin={handleLogin} />
      )}
    </Box>
  );
}
