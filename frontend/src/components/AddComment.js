import React, { useState } from 'react';

const AddComment = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [likes, setLikes] = useState(0);
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert('Comment text is required');
      return;
    }

    const newComment = {
      text: text.trim(),
      author: author.trim() || 'Anonymous',
      likes: parseInt(likes) || 0,
      image: image.trim() || null 
    };

    onAdd(newComment);
    
    setText('');
    setAuthor('');
    setLikes(0);
    setImage('');
  };

  return (
    <div className="add-comment">
      <h3>Add New Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Comment:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            placeholder="Write your comment here..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="likes">Initial Likes:</label>
          <input
            type="number"
            id="likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            min="0"
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {image && (
            <div className="image-preview" style={{ marginTop: '10px' }}>
              <img 
                src={image} 
                alt="Preview" 
                style={{ 
                  maxWidth: '200px', 
                  maxHeight: '200px', 
                  objectFit: 'cover',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Add Comment</button>
          <button type="button" onClick={() => {
            setText('');
            setAuthor('');
            setLikes(0);
            setImage('');
          }} className="btn btn-secondary">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;