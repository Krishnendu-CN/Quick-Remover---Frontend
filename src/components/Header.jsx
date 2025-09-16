import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign");
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#fff", color: "#333" }} elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
        </Box>

        {/* Menu for medium+ screens */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button component={Link} to="/upload" color="inherit">
            Uploads
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
        </Box>

        {/* Auth buttons */}
       {/* <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {!token ? (
            <>
              <Button component={Link} to="/sign" color="inherit">
                Login
              </Button>
              <Button
                component={Link}
                to="/sign"
                sx={{ padding: "10px 20px", bgcolor: "#eee", borderRadius: "50px" }}
                color="inherit"
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          )}
        </Box>*/}

        {/* Mobile Menu Button */}
        <IconButton sx={{ display: { xs: "flex", md: "none" }, color: "#333" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
