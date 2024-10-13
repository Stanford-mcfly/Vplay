import { useState, useEffect } from 'react';
import './video.css'; // Import the CSS file for styling

const Video = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [videoList, setVideoList] = useState([]);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setUploadStatus('Uploading...');
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      const result = await response.json();
      setUploadStatus('Video uploaded successfully. Filename: ' + result.filename);
      fetchVideos(); // Refresh the video list
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Upload failed: ' + error.message);
    }
  };

  const retrieveVideo = (filename) => {
    setVideoSrc('http://localhost:5000/video/' + filename);
  };

  const fetchVideos = async () => {
    setVideoList(['Loading...']);
    try {
      const response = await fetch('http://localhost:5000/videos');
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      const videos = await response.json();
      setVideoList(videos);
    } catch (error) {
      console.error('Error:', error);
      setVideoList(['Failed to load videos: ' + error.message]);
    }
  };

  return (
    <div className="videoContainer">
      <h1 className="title">Video Upload and Retrieval</h1>

      <h2>Upload Video</h2>
      <form id="uploadForm" onSubmit={handleUpload} encType="multipart/form-data">
        <input type="file" name="video" accept="video/*" required className="inputBox" />
        <button type="submit" className="inputButton">Upload</button>
      </form>
      <div id="uploadStatus" className="statusMessage">{uploadStatus}</div>

      <h2>Retrieve Video</h2>
      <input type="text" id="videoFilename" placeholder="Enter video filename" className="inputBox" />
      <button onClick={() => retrieveVideo(document.getElementById('videoFilename').value)} className="inputButton">Retrieve</button>
      <br /><br />
      <video id="videoPlayer" controls style={{ display: videoSrc ? 'block' : 'none' }} src={videoSrc}>
        Your browser does not support the video tag.
      </video>

      <h2>Available Videos</h2>
      <ul id="videoList">
        {videoList.map((video, index) => (
          <li key={index} onClick={() => retrieveVideo(video.filename)} className="videoItem">
            {video.filename}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Video;
