import React, { useState, useEffect } from 'react';
import { getComments, addComment } from '../services/campaignService';
import './CommentSection.css';

const CommentSection = ({ campaignId, token }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(campaignId);
        setComments(response.data);
      } catch (err) {
        setError('Failed to load comments.');
      }
    };
    fetchComments();
  }, [campaignId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await addComment(campaignId, { text: commentText }, token);
      setComments([...comments, response.data]);
      setCommentText('');
    } catch (err) {
      setError('Failed to add comment.');
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {error && <p className="error-message">{error}</p>}
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment._id}>
            <p><strong>{comment.user.username}:</strong> {comment.text}</p>
          </li>
        ))}
      </ul>
      {token && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
      {!token && <p>Please log in to add comments.</p>}
    </div>
  );
};

export default CommentSection;
