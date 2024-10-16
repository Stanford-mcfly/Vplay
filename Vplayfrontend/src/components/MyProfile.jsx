import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/my_page');
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleDeleteVideo = async () => {
    if (!selectedVideo) return;

    try {
      await axios.delete('http://localhost:5000/delete_video', {
        data: { filename: selectedVideo },
      });
      setDeleteStatus('Video deleted successfully');
      fetchUserProfile(); // Refresh profile
    } catch (error) {
      console.error('Failed to delete video:', error);
      setDeleteStatus('Failed to delete video');
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Navigation Bar */}
      <header className="header">
        <div className="logo">
          <img src="icon.png" alt="Website Logo" />
        </div>
        <nav className="nav">
          <a href="/home">Home</a>
          <a href="/upload">Upload Video</a>
          <a href="/subscribed_videos">Subscribed Videos</a>
        </nav>
        <div className="profile-icon">
          <a href="/"><img src="users.png" alt="User Profile" /></a>
        </div>
      </header>

      {/* Profile Section */}
      <div className="myProfileContainer">
        <h1>My Profile</h1>
        <div className="profileInfo">
          <img
            src={`data:image/jpeg;base64,${userData.profilePicture}`}
            alt="Profile"
            className="profileThumbnail"
          />
          <h2>{userData.username}</h2>
          <p>Email: {userData.email}</p>
        </div>
        <h2>My Videos</h2>
        <div className="videosGrid">
          {userData.videos.length > 0 ? (
            userData.videos.map((video) => (
              <div key={video.file_id} className="videoCard">
                <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt={video.title} />
                <h3>{video.title}</h3>
              </div>
            ))
          ) : (
            <p>No videos uploaded yet.</p>
          )}
        </div>
        <h2>Delete Video</h2>
        <select onChange={(e) => setSelectedVideo(e.target.value)} value={selectedVideo}>
          <option value="">Select a video to delete</option>
          {userData.videos.map((video) => (
            <option key={video.file_id} value={video.filename}>
              {video.title}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteVideo}>Delete Video</button>
        {deleteStatus && <p>{deleteStatus}</p>}
      </div>
    </div>
  );
};

export default MyProfile;
