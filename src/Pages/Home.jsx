import { useState, useEffect } from "react";
import CardReco from "../components/CardRecomended/CardReco";
import ContainerCats from "../components/ContainerCategories/ContainerCats";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Box, Fade, Typography, CircularProgress} from "@mui/material";

function Home() {
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ backgroundColor: "#262626" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            gap: 4,
          }}
        >
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              gap: 4,
              animation: "fadeIn 1.5s ease-in-out",
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateY(20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" }
              }
            }}
          >
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              color="#FFF"
            >
              Bienvenido a
            </Typography>
            <img 
              src="../../img/LogoMain.png" 
              alt="Logo aluraflix" 
              style={{ width: "300px" }}
            />
          </Box>
          <CircularProgress 
            size={60}
            thickness={4}
            sx={{
              color: "#2575fc",
              "@keyframes pulse": {
                "0%": { opacity: 0.6, transform: "scale(0.98)" },
                "50%": { opacity: 1, transform: "scale(1)" },
                "100%": { opacity: 0.6, transform: "scale(0.98)" }
              },
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </Box>
      ) : (
        <Fade in={!loading} timeout={1000}>
          <div>
            <Header />
            <CardReco />
            <ContainerCats />
            <Footer />
          </div>
        </Fade>
      )}
    </main>
  );
}

export default Home;
