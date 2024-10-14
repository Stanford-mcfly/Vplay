import React, { useState, useEffect } from 'react';
import './home.css';
import VideoCard from './VideoCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    navigate('/subscribed_videos'); // Navigate to subscribed videos page
  };

  return (
    <div className="homeContainer">
      <h1>Video Gallery</h1>
      <button onClick={handleUploadRedirect} className="uploadButton">Upload Video</button>
      <button onClick={handleSubscribedVideosRedirect} className="uploadButton">Subscribed Videos</button> {/* Subscribed Videos button */}
      <div className="videosGrid">
        {videos.map((video) => (
          <VideoCard key={video.file_id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
