import React, { useState, useEffect } from 'react';
import { commentAPI } from '../services/api';
import CommentItem from './CommentItem';
import AddComment from './AddComment';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await commentAPI.getAllComments();
      setComments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (commentData) => {
    try {
      const newComment = await commentAPI.createComment(commentData);
      setComments([newComment, ...comments]);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const handleUpdateComment = async (id, commentData) => {
    try {
      const updatedComment = await commentAPI.updateComment(id, commentData);
      setComments(comments.map(comment => 
        comment._id === id ? updatedComment : comment
      ));
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await commentAPI.deleteComment(id);
      setComments(comments.filter(comment => comment._id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  if (loading) return <div className="loading">Loading comments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="comment-list">
      <h2>Comments ({comments.length})</h2>
      
      <AddComment onAdd={handleAddComment} />
      
      {comments.length === 0 ? (
        <div className="no-comments">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="comments">
          {comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;