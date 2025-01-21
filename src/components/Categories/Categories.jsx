import React, { useContext, useState, } from "react";
import { Typography, Box, Divider } from "@mui/material";
import styles from './Categories.module.css';
import { VideoContext } from "../Context/VideoContext";
import VideoCard from '../VideoCard/VideoCard';
import DialogVideo from "../ModalVideo/ModalVideo";
import FormEdicion from "../FormEdicion/FormEdicion";

const categoryColors = {
  frontEnd: "#6BD1FF",
  backEnd: "#00C86F",
  innovacionGestion: "#FF8C2A",
  uxUiDiseño: "#DC6EBE",
  devOps: "#9CD33B",
  mobileDevelopment: "#FF4B33",
  dataScience: "#6B5BE2",
  otros: "#FF8D85"
};

const categoryShadows = {
  frontEnd: "0px 5px 29px 0px rgba(107, 209, 255, 0.70)",
  backEnd: "0px 5px 29px 0px rgba(0, 200, 111, 0.70)",
  innovacionGestion: "0px 5px 29px 0px rgba(255, 140, 42, 0.70)",
  uxUiDiseño: "0px 5px 29px 0px rgba(220, 110, 190, 0.70)",
  devOps: "0px 5px 29px 0px rgba(156, 211, 59, 0.70)",
  mobileDevelopment: "0px 5px 29px 0px rgba(255, 75, 51, 0.70)",
  dataScience: "0px 5px 29px 0px rgba(107, 91, 226, 0.70)",
  otros: "0px 5px 29px 0px rgba(255, 141, 133, 0.70)"
};

export default function Categories() {
  const { videos } = useContext(VideoContext);
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ title: "", url: "", descripcion: "" });
  const [editingVideo, setEditingVideo] = useState(null);

  const handleOpen = (video) => {
    setOpen(true);
    setSelectedVideo({
      title: video.title,
      url: video.url,
      descripcion: video.descripcion,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVideo({ title: "", url: "", descripcion: "" });
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
  };

  const handleCloseEdit = () => {
    setEditingVideo(null);
  };

  if (!videos) {
    return null;
  }

  const categories = [
    { name: "Front End", key: "frontEnd", videos: videos.frontEnd || [] },
    { name: "Back End", key: "backEnd", videos: videos.backEnd || [] },
    { name: "Innovación y Gestión", key: "innovacionGestion", videos: videos.innovacionGestion || [] },
    { name: "UX/UI & Diseño", key: "uxUiDiseño", videos: videos.uxUiDiseño || [] },
    { name: "DevOps", key: "devOps", videos: videos.devOps || [] },
    { name: "Mobile Development", key: "mobileDevelopment", videos: videos.mobileDevelopment || [] },
    { name: "Data Science", key: "dataScience", videos: videos.dataScience || [] },
    { name: "Otros", key: "otros", videos: videos.otros || [] },
  ].map(category => ({
    ...category,
    videos: Array.isArray(videos[category.key]) ? videos[category.key] : []
  }));

  const categoriasConVideos = categories.filter(cat => cat.videos && cat.videos.length > 0);



  return (
    <>
      {categoriasConVideos.map((category, index) => (
        <React.Fragment key={`${category.key}-${index}`}>
          <Divider
            sx={{
              mt: index === 0 ? 0 : 2,
              mb: 2,
              borderColor: categoryColors[category.key],
              boxShadow: `0 0 10px ${categoryColors[category.key]}`,
              opacity: 0.7,
              borderBottomWidth: 5
            }}
          />
          <Box
            sx={{
              width: "100%",
              padding: "20px 20px",
              marginBottom: "5px",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                display: "inline-block",
                marginBottom: "15px",
                padding: "15px",
                borderRadius: "15px",
                color: "#F5F5F5",
                backgroundColor: categoryColors[category.key],
                justifyContent: "center",
                boxShadow: categoryShadows[category.key],
                fontSize: "48px",
                fontWeight: "bold",
                border: "1px solid #F5F5F5",
                boxSizing: "border-box",
                width: "fit-content",
              }}
            >
              {category.name}
            </Typography>

            <div className={styles.horizontalScroll}>
              <div className={styles.videos}>
                {category.videos.map((video) => (
                  <React.Fragment key={video.id}>
                    <VideoCard
                      key={`${category.key}-${video.id}`}
                      video={video}
                      onClick={() => handleOpen(video)}
                      categoryColor={categoryColors[category.key]}
                    />
                    {editingVideo && editingVideo.id === video.id && (
                      <FormEdicion
                        video={video}
                        onClose={handleCloseEdit}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Box>
        </React.Fragment>
      ))}

      <DialogVideo open={open} selectedVideo={selectedVideo} onClose={handleClose} />
    </>
  );
}
