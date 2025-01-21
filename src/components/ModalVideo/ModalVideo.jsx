import React, { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography 
} from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ReactMarkdown from 'react-markdown';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './ModalVideo.css';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter
};

const DialogVideo = ({ open, selectedVideo, onClose }) => {
  if (!selectedVideo || !selectedVideo.title || !selectedVideo.url) {
    return null;
  }

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#262626',
          color: '#FFF',
          borderRadius: '20px',
        },
      }}
    >
      <DialogActions sx={{ 
        justifyContent: 'space-between', 
        boxSizing: 'border-box', 
        width: '100%',
        overflowX: 'hidden',
        display: 'flex', 
        alignItems: 'center', 
        padding: '8px 16px',
        '@media (max-width: 600px)': {
          padding: '8px 8px'
        }
      }} >
        <DialogTitle 
          sx={{
            flex: 1, 
            width: '100%',
            padding: '0 16px',
            '@media (max-width: 600px)': {
              padding: '0 8px'
            }
          }}
        >
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              width: '100%',
              '@media (max-width: 600px)': {
                fontSize: '1.5rem', 
                lineHeight: 1.2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }
            }}
          >
            {selectedVideo.title}
          </Typography>
        </DialogTitle>
        <Button 
          onClick={onClose} 
          color="primary" 
          sx={{
            minWidth: 'auto',
            padding: '4px',
            '&:hover': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }
          }} 
        >
          <CloseIcon sx={{ scale: 1.5 }} />
        </Button>
      </DialogActions>
      <DialogContent
        sx={{
          maxHeight: 'auto',
          overflowX: 'hidden',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px', gap: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '10px',
          },
          padding: '1rem',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%' }}>
          <iframe
            src={selectedVideo.url}
            title={selectedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '10px',
            }}
          />
        </div>
        <div style={{border: '1px solid #fff', marginTop:"15px", padding:"10px" , borderRadius: '10px'}} >
          <Typography 
            variant="body1" 
            className="description-preview"
            sx={{
              position: 'relative',
              marginBottom: '10px'
            }}
          >
            <ReactMarkdown
              components={{
                a: ({node, ...props}) => (
                  <a 
                    {...props} 
                    style={{ color: '#61dafb', textDecoration: 'none' }}
                    target="_blank" 
                    rel="noopener noreferrer"
                  />
                )
              }}
            >
              {selectedVideo.descripcion}
            </ReactMarkdown>
          </Typography>

          {selectedVideo.descripcion && selectedVideo.descripcion.length > 200 && (
            <CSSTransition
              in={isDescriptionExpanded}
              timeout={300}
              classNames="description"
              unmountOnExit
            >
              <Typography 
                variant="body1" 
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                  paddingBottom: '40px'
                }}
              >
                <ReactMarkdown
                  components={{
                    a: ({node, ...props}) => (
                      <a 
                        {...props} 
                        style={{ color: '#61dafb', textDecoration: 'none' }}
                        target="_blank" 
                        rel="noopener noreferrer"
                      />
                    )
                  }}
                >
                  {selectedVideo.descripcion}
                </ReactMarkdown>
              </Typography>
            </CSSTransition>
          )}

          {selectedVideo.descripcion && selectedVideo.descripcion.length > 200 && (
            <Button 
              onClick={toggleDescription}
              fullWidth
              endIcon={isDescriptionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{
                marginTop: '10px',
                color: '#1976d2'
              }}
            >
              {isDescriptionExpanded ? 'Ver menos' : 'Ver más'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVideo;
