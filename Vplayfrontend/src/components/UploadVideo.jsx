import { useState } from 'react';
import { Link } from 'react-router-dom';
import './uploadVideo.css';
import logo from '../assets/logo-color.svg';
import axios from 'axios';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('video', video);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      setUploadStatus('Video uploaded successfully');
    } catch (error) {
      setUploadStatus('Failed to upload video');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="uploadPage">
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Website Logo" />
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
      
      <div className="uploadContainer">
        <h1>Upload Video</h1>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Video Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p>Select Thumbnail image</p>
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/*"
            required
          />
          <p>Select Video</p>
          <input
            type="file"
            onChange={(e) => setVideo(e.target.files[0])}
            accept="video/*"
            required
          />
          <button type="submit">Upload</button>
        </form>
        <p>{uploadStatus}</p>
      </div>
    </div>
  );
};

export default UploadVideo;
