import  { useState, useEffect } from 'react';
import './subscribe.css';
import VideoCard from './VideoCard';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-color.svg';

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
    <div className="subscribedVideosPage">
      <header className="header">
        <div className="logo">
          <Link to="/">
<<<<<<< HEAD
            <img src={logo} alt="Website Logo" />
=======
            <img src="../assets/logo-color.svg" alt="Website Logo" />
>>>>>>> 88007e905ae2ba957c8f8554d408bdc2d0dc3d6b
          </Link>
        </div>
        <nav className="nav">
        <Link to="/home" className="nav-link">Home</Link>
          <Link to="/upload" className="nav-link">Upload Video</Link>
          <Link to="/subscribed_videos" className="nav-link">Subscribed Videos</Link>
        </nav>
        <div className="user-profile">
          <Link to="/my-profile">
            <img src="users.png" alt="User Profile" />
          </Link>
        </div>
      </header>

      <div className="main-content">
        <h1 align="center">Subscribed Videos</h1>
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

export default SubscribedVideos;
