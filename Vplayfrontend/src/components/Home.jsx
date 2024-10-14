import React, { useState, useEffect } from 'react';
import './home.css';
import VideoCard from './VideoCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();  // Initialize the navigate hook

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

  // Function to handle redirection to the Upload Video page
  const handleUploadRedirect = () => {
    navigate('/upload');  // Navigate to /upload page
  };

  return (
    <div className="homeContainer">
      <h1>Video Gallery</h1>
      <button onClick={handleUploadRedirect} className="uploadButton">Upload Video</button> {/* Upload button */}
      <div className="videosGrid">
        {videos.map((video) => (
          <VideoCard key={video.file_id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
