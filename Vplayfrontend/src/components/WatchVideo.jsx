import React, { useState, useEffect } from 'react';  
import './watchVideo.css';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
axios.defaults.withCredentials = true;

const WatchVideo = () => {
  const { filename } = useParams();
  
  const [video, setVideo] = useState(null); // State to hold video data
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likeCount, setLikeCount] = useState(0); // State for like count
  const [likedByUser, setLikedByUser] = useState(false); // State for like status

  useEffect(() => {
    fetchVideo(); // Fetch video data on component mount
  }, [filename]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/video1/${filename}`);
      setVideo(response.data); 
      setLikeCount(response.data.likeCount); // Set the like count
      setLikedByUser(response.data.likedByUser); // Set if the user liked the video

      await checkSubscription(response.data.ownerId);
      await fetchComments(response.data.commentIDs); 
    } catch (error) {
      console.error('Failed to load video:', error.response ? error.response.data : error.message);
    }
  };

  const checkSubscription = async (ownerId) => {
    try {
      const currentUserIdResponse = await axios.get('http://localhost:5000/current_user_id');
      const currentUserId = currentUserIdResponse.data.userId;

      const response = await axios.get(`http://localhost:5000/users/${ownerId}`);
      const owner = response.data;

      // Check if the current user ID is in the owner's followers array
      if (owner.followers.includes(currentUserId)) {
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Failed to check subscription status:', error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (likedByUser) {
        // Unlike the video
        await axios.post(`http://localhost:5000/unlike_video/${filename}`);
        setLikeCount(likeCount - 1);
        setLikedByUser(false);
      } else {
        // Like the video
        await axios.post(`http://localhost:5000/like_video/${filename}`);
        setLikeCount(likeCount + 1);
        setLikedByUser(true);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubscribeToggle = async () => {
    const currentUserIdResponse = await axios.get('http://localhost:5000/current_user_id');
    const currentUserId = currentUserIdResponse.data.userId;

    try {
      if (isSubscribed) {
        // Unsubscribe
        await axios.post(`http://localhost:5000/unsubscribe/${video.ownerId}`, { userId: currentUserId });
        setIsSubscribed(false);
      } else {
        // Subscribe
        await axios.post(`http://localhost:5000/subscribe/${video.ownerId}`, { userId: currentUserId });
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Subscription action failed:', error);
    }
  };

  const fetchComments = async (commentIDs) => {
    try {
      const fetchedComments = await Promise.all(
        commentIDs.map(async (commentID) => {
          const commentResponse = await axios.get(`http://localhost:5000/comments/${commentID}`);
          const commentData = commentResponse.data;
          const userResponse = await axios.get(`http://localhost:5000/users2/${commentData.userID}`);
          const userData = userResponse.data;
          return {
            text: commentData.commentText,
            profilePicture: userData.profilePicture,
            username: userData.name,
            commentID: commentID // Include commentID for rendering
          };
        })
      );

      setComments(fetchedComments);
    } catch (error) {
      console.error('Failed to fetch comments:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddComment = async () => {
    const currentUserIdResponse = await axios.get('http://localhost:5000/current_user_id');
    const currentUserId = currentUserIdResponse.data.userId;

    const commentID = uuidv4(); // Generate a new comment ID
    const newCommentData = {
      commentID: commentID,
      userID: currentUserId,
      text: newComment,
      video_filename: filename, 
    };

    try {
      // Store the new comment in the comments collection
      await axios.post('http://localhost:5000/comments', newCommentData);
      // Optionally, update the video document with the new comment ID
      const response1 = await axios.get(`http://localhost:5000/video1/${filename}`);
      await fetchComments(response1.data.commentIDs); 
      // Clear the comment input
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    
    <div className="abc">
      
    <div className="watchContainer">
      {video ? (
        <div>
          <video controls src={`http://localhost:5000/video/${filename}`}></video>
          <h1>{video.title}</h1>
          <p>{video.description}</p>

          {/* Like button */}
          <button onClick={handleLikeToggle}>
            {likedByUser ? 'Unlike' : 'Like'} ({likeCount})
          </button>

          {/* Subscription button */}
          <button onClick={handleSubscribeToggle}>
            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>

          {/* Comments section */}
          <div className="commentsSection">
            <h2>Comments:</h2>
            {comments.map((comment) => (
              <div key={comment.commentID} className="comment">
                <img src={`data:image/png;base64,${comment.profilePicture}`} alt="Profile" className="commentProfilePicture" />
                <div>
                  <strong>{comment.username}</strong>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div></div>
  );
};

export default WatchVideo;
