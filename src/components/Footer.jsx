import React from "react";
import { Box, Typography, TextField, Button, Link, Stack } from "@mui/material";
import { Email, Article, Link as LinkIcon } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{ 
      bgcolor: "grey.900", 
      color: "grey.300", 
      py: 8, 
      px: 4,
      borderTop: "1px solid",
      borderColor: "grey.800"
    }}>
      {/* Main Footer Content */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "center", md: "flex-start" },
        gap: 6,
        maxWidth: "1200px",
        mx: "auto",
        mb: 6
      }}>
        
        {/* Blog Section */}
        <Box sx={{ 
          textAlign: { xs: "center", md: "left" },
          flex: 1,
          minWidth: "200px"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
            <Article sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: "white", fontWeight: 'bold' }}>
              Blog
            </Typography>
          </Box>
          <Stack spacing={1} sx={{ listStyle: "none", p: 0, m: 0 }}>
            <Link href="#" sx={{ 
              color: "grey.300", 
              textDecoration: "none", 
              "&:hover": { color: "primary.main" },
              display: "block",
              transition: "color 0.2s ease"
            }}>
              New AI updates
            </Link>
            <Link href="#" sx={{ 
              color: "grey.300", 
              textDecoration: "none", 
              "&:hover": { color: "primary.main" },
              display: "block",
              transition: "color 0.2s ease"
            }}>
              Background tips
            </Link>
          </Stack>
        </Box>

        {/* Newsletter Section */}
        <Box sx={{ 
          textAlign: { xs: "center", md: "left" },
          flex: 1,
          minWidth: "280px"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
            <Email sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: "white", fontWeight: 'bold' }}>
              Get Updates
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              sx={{ 
                flex: 1,
                bgcolor: "white", 
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                }
              }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        {/* Links Section */}
        <Box sx={{ 
          textAlign: { xs: "center", md: "left" },
          flex: 1,
          minWidth: "200px"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
            <LinkIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: "white", fontWeight: 'bold' }}>
              Links
            </Typography>
          </Box>
          <Stack spacing={1} sx={{ listStyle: "none", p: 0, m: 0 }}>
            <Link href="#" sx={{ 
              color: "grey.300", 
              textDecoration: "none", 
              "&:hover": { color: "primary.main" },
              display: "block",
              transition: "color 0.2s ease"
            }}>
              Pricing
            </Link>
            <Link href="#" sx={{ 
              color: "grey.300", 
              textDecoration: "none", 
              "&:hover": { color: "primary.main" },
              display: "block",
              transition: "color 0.2s ease"
            }}>
              API
            </Link>
            <Link href="#" sx={{ 
              color: "grey.300", 
              textDecoration: "none", 
              "&:hover": { color: "primary.main" },
              display: "block",
              transition: "color 0.2s ease"
            }}>
              Contact
            </Link>
          </Stack>
        </Box>
      </Box>

      {/* Copyright Section */}
      <Box sx={{ 
        textAlign: "center", 
        pt: 4,
        borderTop: "1px solid",
        borderColor: "grey.800",
        maxWidth: "1200px",
        mx: "auto"
      }}>
        <Typography 
          sx={{ 
            fontSize: "0.875rem", 
            color: "grey.500",
          }}
        >
          © {new Date().getFullYear()} Quick Remover – All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}