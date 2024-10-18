import React, { useState } from 'react';
import './subscribe.css'; // Reusing the same CSS
import VideoCard from './VideoCard';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button'; // Import custom Button
import './button.css'; 

const Search = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  // Speech recognition setup using webkitSpeechRecognition
  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US'; // Set language
      recognition.interimResults = false; // Do not return interim results
  
      recognition.onresult = (event) => {
        let spokenText = event.results[0][0].transcript.trim(); // Get recognized speech and trim whitespace
  
        // Remove trailing period (.) if it exists
        if (spokenText.length > 0) {
            spokenText = spokenText.slice(0, -1);
          }
  
        setQuery(spokenText); // Update the search input with the spoken text
        handleSearch(spokenText); // Perform the search
      };
  
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
  
      recognition.start(); // Start speech recognition
    } else {
      alert('Sorry, your browser does not support voice search.');
    }
  };

  const handleSearch = async (inputQuery) => {
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${inputQuery}`);
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
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
          <Link to="/watch_history" className="nav-link">Watch History</Link>
          <Link to="/search" className="nav-link">Search</Link>
        </nav>
        <div className="user-profile">
          <Link to="/my-profile">
            <img src="users.png" alt="User Profile" />
          </Link>
        </div>
      </header>

      <div className="main-content">
        <h1 align="center">Search Videos</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} align="center">
          <input
            type="text"
            value={query} // Display the current query in the input box
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title..."
            required
          />
          <center>
          <Button type="submit" filled>Search</Button>
          <Button type="button" onClick={handleVoiceSearch} filled>🎤 Voice Search</Button></center>
        </form>
        <br />
        <div className="videos-grid">
          {videos.length > 0 ? (
            videos.map((video) => (
              <VideoCard key={video.file_id} video={video} />
            ))
          ) : (
            <p>No videos found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
