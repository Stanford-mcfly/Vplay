import React, { useState, useEffect } from 'react';
import './watchVideo.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WatchVideo = () => {
  const { filename } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, [filename]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/video/${filename}`);
      setVideo(response.data);
    } catch (error) {
      console.error('Failed to load video:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/${filename}`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      await axios.post(`http://localhost:5000/subscribe/${video.ownerId}`, {}, { withCredentials: true });
      setSubscribeStatus('Subscribed successfully!');
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post(`http://localhost:5000/comments/${filename}`, { text: newComment }, { withCredentials: true });
      fetchComments();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <div className="watchContainer">
      {video && (
        <div>
          <video controls src={`http://localhost:5000/video/${filename}`}></video>
          <h1>{video.title}</h1>
          <p>{video.description}</p>
          <button onClick={handleSubscribe}>Subscribe</button>
          <p>{subscribeStatus}</p>
          <div>
            <h2>Comments</h2>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.username}</strong>: {comment.text}
                </li>
              ))}
            </ul>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchVideo;
