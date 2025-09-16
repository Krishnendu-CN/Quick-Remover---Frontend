import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme
} from "@mui/material";
export default function About() {
  return (
    <>
      <Header />
      <Container sx={{ py: 5 }}>
        {/*<Typography variant="h3" align="center">About Us</Typography>*/}
        {/* Tabbed Before/After Comparison */}
        <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack on mobile, side-by-side on desktop
        alignItems: "center",
        gap: 4, // spacing between columns
        py: 6,
      }}
    >
      {/* Left Side - Text */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, lineHeight: 1.3, mb: 2 }}
        >
          Background remover: Fully automated in 5 seconds with 1 click
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
          Thanks to remove.bg's clever AI, you can slash editing time – and have more fun!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          No matter if you want to make a background transparent (PNG), add a white background to a photo,{" "}
          <Box component="span" fontWeight="bold">
            extract or isolate the subject, or get the cutout of a photo
          </Box>{" "}
          – you can do all this and more with remove.bg, the AI background remover for professionals.
        </Typography>
      </Box>

      {/* Right Side - Image */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box
          component="img"
          src="/all-pages-2.png"
          alt="Illustration"
          sx={{ width: "100%", maxWidth: 400, height: "auto", borderRadius: 2 }}
        />
      </Box>
    </Box>

      </Container>
      <Footer />
    </>
  );
}
