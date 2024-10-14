import React, { useState, useEffect } from 'react';
import './home.css';
import VideoCard from './VideoCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubscribedVideos = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscribedVideos();
  }, []);

  const fetchSubscribedVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/subscribed_videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch subscribed videos:', error);
    }
  };

  const handleUploadRedirect = () => {
    navigate('/upload');
  };

  return (
    <div className="homeContainer">
      <h1>Subscribed Videos</h1>
      <button onClick={handleUploadRedirect} className="uploadButton">Upload Video</button>
      <div className="videosGrid">
        {videos.map((video) => (
          <VideoCard key={video.file_id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SubscribedVideos;
