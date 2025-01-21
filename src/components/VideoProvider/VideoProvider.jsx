import React, { useState } from "react";
import PropTypes from "prop-types";
import { VideoContext } from "../Context/VideoContext";

export const initialState = {
  frontEnd: [
    {
      id: 1,
      title: "Introducción a Flexbox en CSS",
      descripcion: "¿Quieres aprender a alinear elementos de forma sencilla? En este video exploraremos cómo funciona Flexbox en CSS, desde sus propiedades principales hasta ejemplos prácticos.",
      url: "https://www.youtube.com/embed/fYq5PXgSsbE"
    },
    {
      id: 2,
      title: "React Hooks Avanzados",
      descripcion: "Profundiza en los hooks más avanzados de React como useCallback, useMemo, y useRef. Aprenderás cuándo y cómo utilizarlos para optimizar el rendimiento de tus aplicaciones.",
      url: "https://www.youtube.com/embed/TNhaISOUy6Q"
    },
    {
      id: 3,
      title: "Next.js 14: Novedades y Mejores Prácticas",
      descripcion: "Descubre las últimas características de Next.js 14, incluyendo Server Components, App Router y mejoras en el sistema de caching. Aprenderás a construir aplicaciones web modernas y optimizadas.",
      url: "https://www.youtube.com/embed/6aP9nyTcd44"
    },
    {
      id: 4,
      title: "TailwindCSS: De Básico a Avanzado",
      descripcion: "Aprende a utilizar TailwindCSS de manera efectiva en tus proyectos. Desde la configuración inicial hasta técnicas avanzadas de personalización y optimización.",
      url: "https://www.youtube.com/embed/h52AVAiGmqo"
    }
  ],
  backEnd: [
    {
      id: 5,
      title: "Node.js y Express: API REST Profesional",
      descripcion: "Aprende a construir APIs RESTful escalables con Node.js y Express. Cubriremos autenticación, manejo de errores, validación de datos y las mejores prácticas de seguridad.",
      url: "https://www.youtube.com/embed/bK3AJfs7qNY"
    },
    {
      id: 6,
      title: "Microservicios con Spring Boot",
      descripcion: "Diseña y desarrolla arquitecturas de microservicios utilizando Spring Boot y Spring Cloud. Aprenderás sobre service discovery, circuit breakers y configuración distribuida.",
      url: "https://www.youtube.com/embed/p485kUNpPvE"
    },
    {
      id: 7,
      title: "Python FastAPI: APIs Modernas y Rápidas",
      descripcion: "Descubre cómo crear APIs rápidas y modernas con FastAPI. Aprenderás sobre tipado estático, documentación automática, validación de datos y más.",
      url: "https://www.youtube.com/embed/tLKKmouUams"
    },
    {
      id: 8,
      title: "MongoDB: Modelado de Datos Avanzado",
      descripcion: "Aprende técnicas avanzadas de modelado de datos en MongoDB. Desde relaciones y embedding hasta patrones de diseño y optimización de consultas.",
      url: "https://www.youtube.com/embed/4SNkgONqic8"
    }
  ],
  innovacionGestion: [
    {
      id: 9,
      title: "Gestión Ágil de Proyectos: Scrum y Kanban en la Práctica",
      descripcion: "Tutorial completo sobre metodologías ágiles de gestión de proyectos, enfocado en Scrum y Kanban. Incluye ejemplos prácticos, herramientas digitales recomendadas y técnicas para mejorar la productividad del equipo y la entrega de valor al cliente.",
      url: "https://www.youtube.com/embed/sLexw-z13Fo"
    },
    {
      id: 10,
      title: " Scrum + Kamban Ejemplo",
      descripcion: "Aprende cómo implementar SCRUM y KANBAN en la gestión ágil de proyectos con ejemplos prácticos.",
      url: "https://www.youtube.com/embed/6ZBIE0XJU1M"
    },
    {
      id: 11,
      title: "La Gestión de Proyectos Ágiles con Scrum",
      descripcion: "Conoce en detalle cómo funciona la gestión de proyectos ágiles utilizando Scrum.",
      url: "https://www.youtube.com/embed/Po-b3irJheM"
    },
    {
      id: 12,
      title: "Gestión Ágil de Proyectos: Scrum y Kanban en la Práctica",
      descripcion: "Tutorial completo sobre metodologías ágiles de gestión de proyectos, enfocado en Scrum y Kanban. Incluye ejemplos prácticos, herramientas digitales recomendadas y técnicas para mejorar la productividad del equipo y la entrega de valor al cliente.",
      url: "https://www.youtube.com/embed/sLexw-z13Fo"
    }
  ],
  uxUiDiseño: [],
  devOps: [],
  mobileDevelopment: [],
  dataScience: [],
  otros: []
};

function VideoProvider({ children }) {
  const [videos, setVideos] = useState(initialState);
  const [alert, setAlert] = useState(null);

  // Función para transformar URLs de YouTube
  const transformYoutubeUrl = (url) => {
    if (!url) return "";
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  // Agregar un nuevo video
  const addVideo = (newVideo) => {
    if (!newVideo.category || !videos[newVideo.category]) {
      setAlert({ type: "error", message: "Categoría no válida." });
      return;
    }

    const videoToAdd = {
      ...newVideo,
      url: transformYoutubeUrl(newVideo.url),
      id: Date.now(), // Genera un ID único basado en el tiempo
    };

    setVideos((prevVideos) => ({
      ...prevVideos,
      [newVideo.category]: [...prevVideos[newVideo.category], videoToAdd],
    }));

    setAlert({ type: "success", message: "Video agregado con éxito." });
    setTimeout(() => setAlert(null), 3000); // Limpia la alerta después de 3 segundos
  };

  // Eliminar un video
  const deleteVideo = (videoId) => {
    setVideos((prevVideos) => {
      const updatedVideos = {};
      Object.keys(prevVideos).forEach((category) => {
        updatedVideos[category] = prevVideos[category].filter((video) => video.id !== videoId);
      });
      return updatedVideos;
    });

    setAlert({ type: "success", message: "Video eliminado con éxito." });
    setTimeout(() => setAlert(null), 3000);
  };

  // Actualizar un video
  const updateVideo = (videoId, updatedVideo) => {
    setVideos((prevVideos) => {
      const updatedVideos = { ...prevVideos };

      Object.keys(updatedVideos).forEach((category) => {
        const videoIndex = updatedVideos[category].findIndex((video) => video.id === videoId);
        if (videoIndex !== -1) {
          const originalCategory = category;
          const newCategory = updatedVideo.category;

          if (newCategory !== originalCategory) {
            const videoToMove = updatedVideos[originalCategory][videoIndex];
            updatedVideos[originalCategory] = updatedVideos[originalCategory].filter((_, i) => i !== videoIndex);
            updatedVideos[newCategory] = [...(updatedVideos[newCategory] || []), { ...videoToMove, ...updatedVideo }];
          } else {
            updatedVideos[originalCategory][videoIndex] = { ...updatedVideos[originalCategory][videoIndex], ...updatedVideo };
          }
        }
      });

      return updatedVideos;
    });

    setAlert({ type: "success", message: "Video actualizado con éxito." });
    setTimeout(() => setAlert(null), 3000);
  };

  const value = {
    videos,
    addVideo,
    deleteVideo,
    updateVideo,
    alert,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

VideoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { VideoProvider };
export default VideoProvider;