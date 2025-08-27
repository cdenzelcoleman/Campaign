import { useState, useEffect, useCallback, memo } from 'react';
import { getComments, addComment } from '../services/campaignService';
import './CommentSection.css';

const CommentSection = memo(({ campaignId, token }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(campaignId);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to load comments:', error);
        setError('Failed to load comments.');
      }
    };
    fetchComments();
  }, [campaignId]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await addComment(campaignId, { text: commentText }, token);
      setComments([...comments, response.data]);
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      setError('Failed to add comment.');
    }
  }, [campaignId, commentText, token, comments]);

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
});

CommentSection.displayName = 'CommentSection';

export default CommentSection;
