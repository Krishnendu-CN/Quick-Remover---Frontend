import {
  Drawer,
  Tabs,
  Tab,
  Box,
  Typography,
  Slider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover
} from "@mui/material";
import { ChromePicker } from "react-color";
import { RotateLeft, RotateRight, Flip } from "@mui/icons-material";
import { useState } from "react";

function EditorPanel({
  open,
  onClose,
  imageState,
  handleImageChange,
  rotateImage,
  flipImage,
  resetEdits,
  applyEdits,
  saving
}) {
  const [tab, setTab] = useState(0);
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);

  const handleColorPickerOpen = (event) => setColorPickerAnchor(event.currentTarget);
  const handleColorPickerClose = () => setColorPickerAnchor(null);
  const colorPickerOpen = Boolean(colorPickerAnchor);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 360, p: 2 }
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Image Editor
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Effects" />
        <Tab label="Background" />
      </Tabs>

      {/* Effects Tab */}
      {tab === 0 && (
        <Box>
          <Typography gutterBottom>Brightness: {imageState.brightness}%</Typography>
          <Slider
            value={imageState.brightness}
            onChange={(e, val) => handleImageChange("brightness", val)}
            min={0}
            max={200}
          />

          <Typography gutterBottom>Contrast: {imageState.contrast}%</Typography>
          <Slider
            value={imageState.contrast}
            onChange={(e, val) => handleImageChange("contrast", val)}
            min={0}
            max={200}
          />

          <Typography gutterBottom>Saturation: {imageState.saturation}%</Typography>
          <Slider
            value={imageState.saturation}
            onChange={(e, val) => handleImageChange("saturation", val)}
            min={0}
            max={200}
          />

          <Typography gutterBottom>Hue: {imageState.hue}°</Typography>
          <Slider
            value={imageState.hue}
            onChange={(e, val) => handleImageChange("hue", val)}
            min={-180}
            max={180}
          />

          <Typography gutterBottom>Blur: {imageState.blur}px</Typography>
          <Slider
            value={imageState.blur}
            onChange={(e, val) => handleImageChange("blur", val)}
            min={0}
            max={20}
          />

          <Typography gutterBottom>Sepia: {imageState.sepia}%</Typography>
          <Slider
            value={imageState.sepia}
            onChange={(e, val) => handleImageChange("sepia", val)}
            min={0}
            max={100}
          />

          <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
            <Button startIcon={<RotateLeft />} onClick={() => rotateImage(-90)}>
              Rotate Left
            </Button>
            <Button startIcon={<RotateRight />} onClick={() => rotateImage(90)}>
              Rotate Right
            </Button>
            <Button startIcon={<Flip />} onClick={() => flipImage("horizontal")}>
              Flip
            </Button>
            <Button onClick={resetEdits} variant="outlined">
              Reset
            </Button>
          </Box>
        </Box>
      )}

      {/* Background Tab */}
      {tab === 1 && (
        <Box>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Background</InputLabel>
            <Select
              value={imageState.bgType}
              label="Background"
              onChange={(e) => handleImageChange("bgType", e.target.value)}
            >
              <MenuItem value="transparent">Transparent</MenuItem>
              <MenuItem value="color">Color</MenuItem>
            </Select>
          </FormControl>

          {imageState.bgType === "color" && (
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>Background Color</Typography>
              {/* Default Color Swatches */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    backgroundImage: "url(color-multi.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: imageState.bgColor,
                    border: "2px solid #ccc",
                    cursor: "pointer"
                  }}
                  onClick={handleColorPickerOpen}
                />
                {["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"].map(
                  (c) => (
                    <Box
                      key={c}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        backgroundColor: c,
                        border: c === imageState.bgColor ? "2px solid #1976d2" : "1px solid #ccc",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": { border: "2px solid #1976d2" }
                      }}
                      onClick={() => handleImageChange("bgColor", c)}
                    />
                  )
                )}
              </Box>

              {/* Current color preview + picker */}
              

              <Popover
                open={colorPickerOpen}
                anchorEl={colorPickerAnchor}
                onClose={handleColorPickerClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <ChromePicker
                  color={imageState.bgColor}
                  onChange={(c) => handleImageChange("bgColor", c.hex)}
                />
              </Popover>
            </Box>
          )}
        </Box>
      )}

      {/* Actions */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={applyEdits}
          variant="contained"
          disabled={saving}
        >
          {saving ? "Saving..." : "Apply"}
        </Button>
      </Box>
    </Drawer>
  );
}

export default EditorPanel;
