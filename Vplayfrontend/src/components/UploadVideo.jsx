import React, { useState } from 'react';
import './uploadVideo.css';
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
      const response = await axios.post('http://localhost:5000/upload', formData, {
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
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
          accept="image/*"
          required
        />
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
  );
};

export default UploadVideo;
