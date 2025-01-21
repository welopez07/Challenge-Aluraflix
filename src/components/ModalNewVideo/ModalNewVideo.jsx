import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Modal,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useVideo } from '../Context/VideoContext';

const categories = [
  { label: "Frontend", value: "frontEnd" },
  { label: "Backend", value: "backEnd" },
  { label: "Innovación y Gestión", value: "innovacionGestion" },
  { label: "UX/UI & Diseño", value: "uxUiDiseño" },
  { label: "DevOps", value: "devOps" },
  { label: "Mobile Development", value: "mobileDevelopment" },
  { label: "Data Science", value: "dataScience" },
  { label: "Otros", value: "otros" },
];

export default function ModalNewVideo() {
  const { addVideo, setAlert } = useVideo();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    videoUrl: "",
    descripcion: "",
  });
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: "",
      category: "",
      videoUrl: "",
      descripcion: "",
    });
    setErrors({});
  };

  const convertToEmbedUrl = (url) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?([a-zA-Z0-9_-]{11})(?:\S+)?/;
    const match = url.match(youtubeRegex);
    
    if (match) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "El título es obligatorio.";
    if (!formData.category) newErrors.category = "Seleccione una categoría.";
    if (!formData.videoUrl) {
      newErrors.videoUrl = "El enlace de video es obligatorio.";
    } else {
      const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?([a-zA-Z0-9_-]{11})(?:\S+)?/;
      if (!youtubeRegex.test(formData.videoUrl)) {
        newErrors.videoUrl = "La URL debe ser de YouTube";
      }
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      title: "",
      category: "",
      videoUrl: "",
      descripcion: "",
    });
    setErrors({});
    setAlert({
      type: 'info',
      message: 'El formulario se limpió con éxito',
      position: { vertical: 'bottom', horizontal: 'left' }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      const newVideo = {
        title: formData.title,
        url: convertToEmbedUrl(formData.videoUrl),
        descripcion: formData.descripcion || '', 
        category: formData.category 
      };

      try {
        await addVideo(newVideo);
        setAlert({
          type: 'success',
          message: 'Video agregado con éxito',
          position: { vertical: 'bottom', horizontal: 'left' }
        });
        handleClose();
      } catch (error) {
        console.error("Error al agregar video:", error);
        setAlert({
          type: 'error',
          message: `Error al agregar el video: ${error.message}`,
          position: { vertical: 'bottom', horizontal: 'left' }
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Button
        sx={{ color: "#FFF", border: "1px solid #FFF", borderRadius: 2 }}
        variant="outlined"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        NUEVO VIDEO
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: '90%',
            maxWidth: 600,
            margin: "5% auto",
            '@media (min-width: 768px)': {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 0,
              width: '90%',
              maxWidth: 800
            },
            padding: 3,
            backgroundColor: "#1c1c1c",
            borderRadius: 4,
            border: "1px solid #fff",
            color: "#fff",
            boxSizing: 'border-box'
          }}
        >
          <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 2 }}>
            NUEVO VIDEO
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", marginBottom: 3 }}
          >
            COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              marginBottom: 2,
              borderBottom: "1px solid #FFF",
              borderTop: "1px solid #FFF",
              padding: 1,
            }}
          >
            CREAR TARJETA
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title || ""}
                sx={{
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiFormLabel-root": { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2c2c2c",
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                select
                fullWidth
                label="Categoría"
                name="category"
                value={formData.category}
                onChange={handleChange}
                error={!!errors.category}
                helperText={errors.category || ""}
                sx={{
                  color: "#fff",
                  "& .MuiSelect-icon": { color: "#fff" },
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiFormLabel-root": { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2c2c2c",
                    borderRadius: "10px",
                  },
                }}
              >
                <MenuItem value="">Seleccione una categoría</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Enlace de Video"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                error={!!errors.videoUrl}
                helperText={errors.videoUrl || ""}
                sx={{
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiFormLabel-root": { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2c2c2c",
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                multiline
                rows={8}
                sx={{
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiFormLabel-root": { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2c2c2c",
                    borderRadius: "10px",
                  },
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: "#2A7AE4",
                    "&:hover": { backgroundColor: "#5595E9" } 
                  }}
                >
                  GUARDAR
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: "#fff" }}
                  onClick={handleClear}
                >
                  LIMPIAR
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: "#fff" }}
                  onClick={handleClose}
                >
                  CANCELAR
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
