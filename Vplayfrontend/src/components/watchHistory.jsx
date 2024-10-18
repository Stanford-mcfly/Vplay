import React, { useState, useEffect } from 'react';
import './subscribe.css';  // Reusing the same CSS as SubscribedVideos
import VideoCard from './VideoCard';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const WatchHistory = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatchHistory();
  }, []);

  const fetchWatchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/watch_history');
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch watch history:', error);
    }
  };

  const handleUploadRedirect = () => {
    navigate('/upload');
  };

  return (
    <div className="subscribedVideosPage">
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src="icon.png" alt="Website Logo" />
          </Link>
        </div>
        <nav className="nav">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/upload" className="nav-link">Upload Video</Link>
          <Link to="/subscribed_videos" className="nav-link">Subscribed Videos</Link>
          <Link to="/watch_history" className="nav-link">WatchHistory</Link>
          <Link to="/search" className="nav-link">Search</Link>
        </nav>
        <div className="user-profile">
          <Link to="/my-profile">
            <img src="users.png" alt="User Profile" />
          </Link>
        </div>
      </header>

      <div className="main-content">
        <h1 align="center">Watch History</h1>
        <br></br>
        <br></br>
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoCard key={video.file_id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchHistory;
