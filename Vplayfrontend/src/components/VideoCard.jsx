import React from 'react';
import './videoCard.css';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.filename}`);
  };

  return (
    <div className="videoCard" onClick={handleClick}>
      <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt={video.title} className="thumbnail" />
      <h3>{video.title}</h3>
      <p>{video.ownerName}</p>
    </div>
  );
};

export default VideoCard;
