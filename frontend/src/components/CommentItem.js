import React, { useState } from 'react';
import { format } from 'date-fns';
import EditComment from './EditComment'; 

const CommentItem = ({ comment, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want you want to delete this comment?')) {
      try {
        await onDelete(comment._id);
      } catch (error) {
        alert('Error deleting comment');
      }
    }
  };

  const handleUpdate = async (updatedComment) => {
    try {
      await onUpdate(comment._id, updatedComment);
      setIsEditing(false);
    } catch (error) {
      alert('Error updating comment');
    }
  };

  if (isEditing) {
    return (
      <EditComment
        comment={comment}
        onSave={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.author}</span>
        <span className="comment-date">
          {format(new Date(comment.date), 'MMM dd, yyyy \'at\' h:mm a')}
        </span>
      </div>
      
      <div className="comment-text">
        {comment.text}
      </div>
      
      {comment.images && comment.images.length > 0 && (
        <div className="comment-images">
          {comment.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`Comment attachment ${index + 1}`}
              className="comment-image"
            />
          ))}
        </div>
      )}
      
      <div className="comment-footer">
        <span className="comment-likes">👍 {comment.likes}</span>
        <div className="comment-actions">
          <button 
            onClick={() => setIsEditing(true)}
            className="btn btn-edit"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="btn btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;