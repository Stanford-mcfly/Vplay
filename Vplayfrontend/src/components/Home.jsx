import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoCard from './VideoCard';
import './home.css';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  const handleUploadRedirect = () => {
    navigate('/upload');
  };

  const handleSubscribedVideosRedirect = () => {
    navigate('/subscribed_videos');
  };

  return (
    <div className="home">
      <header className="header">
        <div className="logo">
          <img src="/path/to/your/logo.png" alt="Website Logo" />
        </div>
        <nav className="nav">
          <button onClick={handleUploadRedirect}>Upload Video</button>
          <button onClick={handleSubscribedVideosRedirect}>Subscribed Videos</button>
        </nav>
      </header>
      <main className="main-content">
        <h1>Video Gallery</h1>
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoCard key={video.file_id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;