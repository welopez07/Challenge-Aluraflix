import React, { useState } from 'react';
import { Card, CardActions, Typography, } from '@mui/material';
import EliminarVideo from '../EliminarVideo/EliminarVideo';
import FormEdicion from '../FormEdicion/FormEdicion';
import styles from './VideoCard.module.css';

const VideoCard = ({ video, onClick, categoryColor = '#FFFFFF' }) => {
  const [show, setShow] = useState(true);

  const handleDelete = () => {
    setShow(false);
  };

  return (

      <Card 
        className={styles.card}
        key={video.id}
        sx={{ 
          backgroundColor: '#000', 
          borderRadius: '10px',
          cursor: "pointer",
          boxSizing: "border-box",
          transition: "transform .5s ease, box-shadow .5s ease",
          '&:hover': {
            transform: "scale(1.04)",
            boxShadow: `0 0 20px 5px ${categoryColor}`,
          }
        }}
      >
        <div onClick={onClick}>
          <iframe
            src={video.url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              top: 0,
             left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
        </div>
        <div>
          <Typography
            sx={{
              color: '#FFF',
              textAlign: 'center',
              paddingTop: '15px',
              fontWeight: 'bold',
              fontSize: '24px',
              borderBottom: '1px solid #FFF',
            }}
          >
            {video.title}
          </Typography>
        </div>
        <CardActions sx={{ justifyContent: 'space-evenly' }}>
          <EliminarVideo video={video} onDelete={handleDelete} />
          <FormEdicion video={video} />
        </CardActions>
      </Card>

  );
};

export default VideoCard;

