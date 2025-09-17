import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import ReactCompareImage from "react-compare-image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedDefault, setSelectedDefault] = useState(null);


  const handleFile = (fileObj) => {
  if (!fileObj) return;

  let file;
  let preview;

  if (fileObj instanceof File) {
    // User-uploaded file
    file = fileObj;
    preview = URL.createObjectURL(fileObj);
  } else if (fileObj.file) {
    // Default image converted to File
    file = fileObj.file;
    preview = fileObj.preview;
  } else {
    console.error("Invalid file object", fileObj);
    return;
  }

  navigate("/upload", { state: { file, preview } });
};


  const handleDefaultImageClick = async (img) => {
  try {
    setSelectedDefault(img.src);

    // Convert default image URL to File
    const response = await fetch(img.src);
    const blob = await response.blob();
    const file = new File([blob], img.label + ".png", { type: blob.type });

    // Call handleFile with proper object
    handleFile({ file, preview: URL.createObjectURL(file) });
  } catch (err) {
    console.error("Error loading default image:", err);
  }
};


  const handleFileChange = (e) => handleFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };
  //const [tabValue, setTabValue] = useState(0);
const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const videos = [
    {
      poster: "https://sb.kaleidousercontent.com/67418/840x560/686381d375/emilia-poster.jpg",
      src: "https://sb.kaleidousercontent.com/67418/x/681f13b37d/emilia_compressed.mp4",
    },
    {
      poster: "https://sb.kaleidousercontent.com/67418/840x560/d749ed76de/manuel-poster.jpg",
      src: "https://sb.kaleidousercontent.com/67418/x/9289c7b8dd/manuel_compressed.mp4",
    },
  ];

  const selectedVideo = useMemo(
    () => videos[Math.floor(Math.random() * videos.length)],
    []
  );

  const imagePairs = [
    {
      before: "https://sb.kaleidousercontent.com/67418/992x558/b9305ff4cd/stunning-quality-animal.png",
      after: "https://sb.kaleidousercontent.com/67418/992x558/84082a6eda/stunning-quality-animal-transp.png",
      title: "Animals"
    },
    {
      before: "https://sb.kaleidousercontent.com/67418/992x558/b024f7a4e1/stunning-quality-product.png",
      after: "https://sb.kaleidousercontent.com/67418/992x558/235d7eafc9/stunning-quality-prodcut-transp.png",
      title: "Products"
    },
    {
      before: "https://sb.kaleidousercontent.com/67418/992x558/ef4cc24685/people-org.png",
      after: "https://sb.kaleidousercontent.com/67418/992x558/7632960ff9/people.png",
      title: "People"
    }
  ];

  const imagePairsnew = [
    {
      before: "../animal-1.png",
      after: "../animal-2.png",
      title: "Animals"
    },
    {
      before: "../prodcut-2.jpg",
      after: "../product-2.png",
      title: "Products"
    },
    {
      before: "../person-1.png",
      after: "../person-2.png",
      title: "People"
    }
  ];
  const defaultImages = [
  { src: "../person-1.png", label: "Animals" },
  { src: "../animal-1.png", label: "Products" }
];


  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 7 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            width: "100%",
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 3,
            }}
          >
            <Box
              component="video"
              preload="auto"
              autoPlay
              playsInline
              muted
              loop
              poster={selectedVideo.poster}
              src={selectedVideo.src}
              sx={{
                width: "100%",
                maxWidth: { xs: 320, lg: 420 },
                borderRadius: "24px",
                boxShadow: 3,
              }}
            />
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ fontSize: "50px", lineHeight: 1.2 }}
            >
              Remove Image Background
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: 420 }}
              paragraph
            >
              100% Automatically and{" "}
              <Box component="span" sx={{ color: "#f9a825", fontWeight: 700 }}>
                Free
              </Box>
            </Typography>
          </Box>

          {/* Right Section (Upload) */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Card sx={{ textAlign: "center", borderRadius: 0, boxShadow: 0 }}>
              <CardContent>
                <Box
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  sx={{
                    textAlign: "center",
                    boxShadow: 3,
                    borderRadius: 11,
                    pl: 15,
                    pr: 15,
                    pt: 10,
                    pb: 5,
                    cursor: "pointer",
                    backgroundColor: dragOver
                      ? "rgba(0,0,0,0.05)"
                      : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                  
                >
                  <Typography variant="h5" gutterBottom>
                    Upload Image
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    or drop a file
                  </Typography>

                  <Button variant="contained" component="label" sx={{ mt: 2 }}>
                    Upload
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: '14px' }} >
                    <strong>Max File Size : 300kb</strong> 
                  </Typography>
                 <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: '16px' }} >
                    <strong>Images not working? Try these sample images.</strong> (Due to  <strong>Railway's</strong> RAM limitations, we are using NumPy,OpenCV instead of RemBG, which may not work properly as expected.)
                  </Typography>

                <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                  {defaultImages.map((img, index) => (
                    <Box
                      key={index}
                      sx={{
                        border: selectedDefault === img.src ? "2px solid #f9a825" : "2px solid transparent",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": { borderColor: "primary.main" },
                        transition: "border 0.2s",
                      }}
                      onClick={() => handleDefaultImageClick(img)}
                    >
                      <Box
                        component="img"
                        src={img.src}
                        alt={img.label}
                        sx={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              </CardContent>
            </Card>
          </Box>
        </Box>


        {/* Tabbed Before/After Comparison */}
        <Box sx={{ mt: 12, textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Stunning Results
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Switch tabs & slide to compare
          </Typography>

          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            centered
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{ mb: 4 }}
          >
            {imagePairs.map((pair, index) => (
              <Tab key={index} label={pair.title} />
            ))}
          </Tabs>

          {/* Show selected tab's slider */}
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <ReactCompareImage
              leftImage={imagePairs[tabValue].before}
              rightImage={imagePairs[tabValue].after}
              sliderLineColor="#fff"
              sliderPositionPercentage={0.5}
            />
          </Box>
        </Box>


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

         <Box sx={{ mt: 12, textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Just picture it
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            See how our AI removes backgrounds with perfect precision
          </Typography>

          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              variant={isMobile ? "fullWidth" : "standard"}
              sx={{ mb: 4 }}
            >
              {imagePairs.map((pair, index) => (
                <Tab key={index} label={pair.title} />
              ))}
            </Tabs>

            {imagePairsnew.map((pair, index) => (
              <Box
                key={index}
                role="tabpanel"
                hidden={tabValue !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
              >
                {tabValue === index && (
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Grid container spacing={4} justifyContent="center">
                      <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: "center", mb: 2 }}>
                          
                          <Box
                            component="img"
                            src={pair.before}
                            alt={`Before - ${pair.title}`}
                            sx={{
                              width: "100%",
                              maxWidth: 300,
                              borderRadius: 2,
                              boxShadow: 3,
                            }}
                          />
                          <Typography variant="h6" color="primary" gutterBottom>
                            Original
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: "center", mb: 2 }}>
                          
                          <Box
                            component="img"
                            src={pair.after}
                            alt={`After - ${pair.title}`}
                            sx={{
                              width: "100%",
                              maxWidth: 300,
                              borderRadius: 2,
                              boxShadow: 3,
                            }}
                          />
                          <Typography variant="h6" color="success.main" gutterBottom>
                            Transparent background
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
