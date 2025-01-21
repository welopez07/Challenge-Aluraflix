import { useState, useContext, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Snackbar,
    Alert,
    Modal,
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import { VideoContext } from "../Context/VideoContext";
import styles from "./FormEdicion.module.css";

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

export default function FormEdicion({ video }) {
    const { updateVideo, videos } = useContext(VideoContext);
    const [open, setOpen] = useState(false);

    const getCategoryForVideo = (videoData) => {
        const categories = ['frontEnd', 'backEnd', 'innovacionGestion', 'uxUiDiseño', 'devOps', 'mobileDevelopment', 'dataScience', 'otros'];

        for (let category of categories) {
            const categoryVideos = videos[category] || [];
            const videoInCategory = categoryVideos.find(v => v.id === videoData.id);

            if (videoInCategory) {
                return category;
            }
        }

        return 'otros';
    };

    const getCategoryLabel = (categoryValue) => {
        const category = categories.find(cat => cat.value === categoryValue);
        return category ? category.label : "";
    };

    const videoCategory = getCategoryForVideo(video);

    const getOriginalUrl = (embedUrl) => {
        const videoIdMatch = embedUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
        return videoIdMatch
            ? `https://youtu.be/${videoIdMatch[1]}`
            : embedUrl;
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

    const [formData, setFormData] = useState(() => ({
        titulo: video.title || "",
        categoria: getCategoryLabel(videoCategory) || "",
        video: video.url ? getOriginalUrl(video.url) : "",
        descripcion: video.descripcion || "",
    }));

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        if (video) {
            const newCategory = getCategoryForVideo(video);

            setFormData({
                titulo: video.title || "",
                categoria: getCategoryLabel(newCategory) || "",
                video: video.url ? getOriginalUrl(video.url) : "",
                descripcion: video.descripcion || "",
            });
        }
    }, [video, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateYouTubeUrl = (url) => {
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?([a-zA-Z0-9_-]{11})(?:\S+)?/;
        return youtubeRegex.test(url);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.titulo) newErrors.titulo = "El título es obligatorio.";
        if (!formData.categoria) newErrors.categoria = "Seleccione una categoría.";
        if (!formData.video) {
            newErrors.video = "El enlace del video es obligatorio.";
        } else if (!validateYouTubeUrl(formData.video)) {
            newErrors.video = "Debe ser un enlace de YouTube válido.";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length === 0) {
            try {

                const categoryValue = categories.find(cat => cat.label === formData.categoria)?.value ||
                    getCategoryForVideo(video) ||
                    'otros';

                updateVideo(video.id, {
                    title: formData.titulo,
                    url: convertToEmbedUrl(formData.video),
                    descripcion: formData.descripcion,
                    category: categoryValue
                });

                setSuccessMessage(true);
                setOpen(false);
            } catch (error) {
                setErrors({ submit: error.message });
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <>
            <Button
                sx={{ color: "#FFF", border: "none" }}
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => {
                    setOpen(true);
                }}
            >
                EDITAR
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        width: '90%',
                        maxWidth: 600,
                        margin: "30% auto",
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
                    <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
                        Editar Video
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {errors.submit && (
                                <Alert severity="error">{errors.submit}</Alert>
                            )}
                            <TextField
                                fullWidth
                                label="Título"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                error={!!errors.titulo}
                                helperText={errors.titulo || ""}
                                sx={{
                                    "& .MuiInputBase-input": { color: "#fff" },
                                    "& .MuiFormLabel-root": { color: "#fff" },
                                    "& .MuiOutlinedInput-root": { backgroundColor: "#2c2c2c" },
                                }}
                            />
                            <TextField
                                select
                                fullWidth
                                label="Categoría"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                error={!!errors.categoria}
                                helperText={errors.categoria || ""}
                                sx={{
                                    "& .MuiSelect-icon": { color: "#fff" },
                                    "& .MuiInputBase-input": { color: "#fff" },
                                    "& .MuiFormLabel-root": { color: "#fff" },
                                    "& .MuiOutlinedInput-root": { backgroundColor: "#2c2c2c" },
                                }}
                            >
                                <MenuItem value="">Seleccione una categoría</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.value} value={category.label}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                label="Enlace de Video"
                                name="video"
                                value={formData.video}
                                onChange={handleChange}
                                error={!!errors.video}
                                helperText={errors.video || ""}
                                sx={{
                                    "& .MuiInputBase-input": { color: "#fff" },
                                    "& .MuiFormLabel-root": { color: "#fff" },
                                    "& .MuiOutlinedInput-root": { backgroundColor: "#2c2c2c" },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Descripción"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                multiline
                                rows={10}
                                sx={{
                                    "& .MuiInputBase-input": { color: "#fff" },
                                    "& .MuiFormLabel-root": { color: "#fff" },
                                    "& .MuiOutlinedInput-root": { backgroundColor: "#2c2c2c" },
                                }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: "#1976d2" }}
                                >
                                    GUARDAR
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ color: "#fff", borderColor: "#fff" }}
                                    onClick={() => setOpen(false)}
                                >
                                    CANCELAR
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Modal>

            <Snackbar
                open={successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage(false)}
            >
                <Alert
                    onClose={() => setSuccessMessage(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Video actualizado con éxito
                </Alert>
            </Snackbar>
        </>
    );
}