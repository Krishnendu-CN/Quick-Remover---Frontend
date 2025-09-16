import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Slider,
  IconButton,
  Drawer,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  RotateLeft,
  RotateRight,
  Flip,
  Download,
  ColorLens
} from "@mui/icons-material";
import { ChromePicker } from "react-color";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditorPanel from "../pages/EditorPanel";
// Create simple placeholder components
// const Header = () => (
//   <Box component="header" sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
//     <Container>
//       <Typography variant="h6">Advanced Image Editor</Typography>
//     </Container>
//   </Box>
// );

// const Footer = () => (
//   <Box component="footer" sx={{ bgcolor: 'grey.100', py: 3, mt: 4 }}>
//     <Container>
//       <Typography variant="body2" color="text.secondary" align="center">
//         © {new Date().getFullYear()} Advanced Image Editor
//       </Typography>
//     </Container>
//   </Box>
// );

export default function App() {
  const location = useLocation();
  const { file: initialFile, preview: initialPreview } = location.state || {};

  const [file, setFile] = useState(initialFile || null);
  const [preview, setPreview] = useState(initialPreview || null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);
  const [imageState, setImageState] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
    blur: 0,
    sepia: 0,
    bgColor: "#ffffff",
    bgType: "transparent" // transparent, color, or image
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setIsDragActive(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:8000/remove-bg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });
      
      const url = URL.createObjectURL(res.data);
      setResult(url);
    } catch (err) {
      alert(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (property, value) => {
    setImageState(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const rotateImage = (degrees) => {
    setImageState(prev => ({
      ...prev,
      rotation: (prev.rotation + degrees) % 360
    }));
  };

  const flipImage = (direction) => {
    if (direction === 'horizontal') {
      setImageState(prev => ({
        ...prev,
        flipHorizontal: !prev.flipHorizontal
      }));
    } else {
      setImageState(prev => ({
        ...prev,
        flipVertical: !prev.flipVertical
      }));
    }
  };

  const applyEdits = async () => {
    setSaving(true);
    try {
      // Fetch the current result image
      const response = await fetch(result);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append("image", blob);
      formData.append("brightness", imageState.brightness);
      formData.append("contrast", imageState.contrast);
      formData.append("saturation", imageState.saturation);
      formData.append("hue", imageState.hue);
      formData.append("rotation", imageState.rotation);
      formData.append("flip_horizontal", imageState.flipHorizontal);
      formData.append("flip_vertical", imageState.flipVertical);
      formData.append("blur", imageState.blur);
      formData.append("sepia", imageState.sepia);
      
      // Add background options
      formData.append("bg_type", imageState.bgType);
      if (imageState.bgType === "color" && imageState.bgColor) {
        formData.append("bg_color", imageState.bgColor);
      }

      const res = await axios.post("http://localhost:8000/save-edited", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });
      
      const url = URL.createObjectURL(res.data);
      setResult(url);
      setEditorOpen(false);
    } catch (err) {
      alert(err.response?.data?.detail || err.message);
    } finally {
      setSaving(false);
    }
  };

  const downloadImage = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result;
    link.download = 'edited-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetEdits = () => {
    setImageState({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      blur: 0,
      sepia: 0,
      bgColor: "#ffffff",
      bgType: "transparent"
    });
  };

  const handleColorPickerOpen = (event) => {
    setColorPickerAnchor(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
  };

  const handleColorChange = (color) => {
    handleImageChange('bgColor', color.hex);
  };

  const colorPickerOpen = Boolean(colorPickerAnchor);
  const id = colorPickerOpen ? 'color-picker-popover' : undefined;

  return (
    <>
      <Header />
      <Container sx={{ py: 5 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Advanced Image Editor
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
          Upload, remove background, and edit your images
        </Typography>

        <Card sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 3 }}>
          <CardContent>
            {!preview && (
              <Box 
                {...getRootProps()} 
                sx={{
                  border: isDragActive ? '2px dashed #1976d2' : '2px dashed #e0e0e0',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: isDragActive ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: 'rgada(25, 118, 210, 0.04)'
                  }
                }}
              >
                <input {...getInputProps()} />
                <Box sx={{ color: '#757575' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <Typography variant="h6" gutterBottom>
                    {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    or
                  </Typography>
                </Box>
                <Button variant="contained" component="label">
                  Upload File
                  
                </Button>
              </Box>
            )}

            {preview && !result && (
              <>
                <CardMedia
                  component="img"
                  image={preview}
                  alt="Preview"
                  sx={{ borderRadius: 2, mt: 2, maxHeight: 400, objectFit: 'contain', mx: 'auto' }}
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                  >
                    Change Image
                    
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleUpload}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Remove Background"}
                  </Button>
                </Box>
              </>
            )}

            {result && (
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Final Result
                </Typography>
                
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  <img
                    src={result}
                    alt="Result"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      filter: `
                        brightness(${imageState.brightness}%)
                        contrast(${imageState.contrast}%)
                        saturate(${imageState.saturation}%)
                        hue-rotate(${imageState.hue}deg)
                        blur(${imageState.blur}px)
                        sepia(${imageState.sepia}%)
                      `,
                      transform: `
                        rotate(${imageState.rotation}deg)
                        scaleX(${imageState.flipHorizontal ? -1 : 1})
                        scaleY(${imageState.flipVertical ? -1 : 1})
                      `,
                    }}
                  />
                </Box>
                
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => setEditorOpen(true)}
                    >
                      Edit Image
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={downloadImage}
                      startIcon={<Download />}
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
        
        {/* Image Editor Panel for post-processing */}
        <EditorPanel
            open={editorOpen}
            onClose={() => setEditorOpen(false)}
            imageState={imageState}
            handleImageChange={handleImageChange}
            rotateImage={rotateImage}
            flipImage={flipImage}
            resetEdits={resetEdits}
            applyEdits={applyEdits}
            saving={saving}
          />
      </Container>
    </>
  );
}