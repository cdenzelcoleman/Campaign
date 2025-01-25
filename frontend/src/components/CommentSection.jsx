import React, { useState } from 'react';
import { commentCampaign } from '../services/campaignService';

const CommentSection = ({ campaignId, comments }) => {
    const [comments, setComments] = useState('');
    const [currentComments, setCurrentComments] = useState(comments);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return;

        try{
            const response = await commentCampaign(campaignId, comment, token);
            setCurrentComments([response.data.comment]);
            setComment('');
        } catch (err) {
            setError('Failed to comment');
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            {currentComments.map((c) => (
                <div key={c.id}>
                    <p><strong>{c.user.username}:</strong>{c.comment}</p>
        </div>
    ))}
    {token ? (
        <form onSubmit={handleSubmit}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment' 
            required
            />
            <button type="submit">Submit</button>
        </form>
    ) : (
        <p>Login to comment</p>
    )}
    {error && <p style={{ color: 'red' }}>{error}</p>}
</div>

);
};

export default CommentSection;