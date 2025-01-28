import { useState, useEffect } from 'react';
import { addComment } from '../services/campaignService';

export default function CommentSection({ campaign, user }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(campaign.comments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedComments = await addComment(campaign._id, newComment);
    setComments(updatedComments);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      {user && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Post Comment</button>
        </form>
      )}
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <small>
              {comment.user.name} - {new Date(comment.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}