import React, { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { initialState } from '../VideoProvider/VideoProvider';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState({});

    useEffect(() => {
        setVideos(initialState);
    }, []);

    const addVideo = async (video) => {
        try {
            if (!video.title || !video.url || !video.category) {
                throw new Error("Campos de video incompletos");
            }

            const newVideo = {
                ...video,
                id: Date.now().toString() 
            };

            const category = newVideo.category || 'otros';
            setVideos(prevVideos => {
                const updatedVideos = {
                    ...prevVideos,
                    [category]: [...(prevVideos[category] || []), newVideo]
                };
                return updatedVideos;
            });

            return newVideo;
        } catch (error) {
            console.error("Error al agregar video:", error);
            throw error;
        }
    };

    const updateVideo = async (id, updatedVideo) => {
        try {
            const response = await fetch(`/api/videos/${id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedVideo)
            });
            const updated = await response.json();
            
            const oldCategory = Object.keys(videos).find(cat => 
                videos[cat].some(v => v.id === id)
            ) || 'otros';
            
            const updatedVideos = {
                ...videos,
                [oldCategory]: videos[oldCategory].filter(v => v.id !== id)
            };
            
            const newCategory = updated.category || 'otros';
            updatedVideos[newCategory] = [...(updatedVideos[newCategory] || []), updated];
            
            setVideos(updatedVideos);
        } catch (error) {
            console.error("Error updating video:", error);
        }
    };

    const deleteVideo = async (id) => {
        try {
            await fetch(`/api/videos/${id}`, {
                method: 'DELETE',
                mode: 'cors'
            });
            
            const category = Object.keys(videos).find(cat => 
                videos[cat].some(v => v.id === id)
            ) || 'otros';
            
            setVideos(prevVideos => ({
                ...prevVideos,
                [category]: prevVideos[category].filter(v => v.id !== id)
            }));
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    const searchVideos = (query) => {
        const allVideos = Object.values(videos).flat();
        return allVideos.filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.descripcion.toLowerCase().includes(query.toLowerCase())
        );
    };

    return (
        <VideoContext.Provider value={{ 
            videos, 
            addVideo, 
            updateVideo, 
            deleteVideo,
            searchVideos 
        }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideo = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideo must be used within a VideoProvider');
    }
    return context;
};