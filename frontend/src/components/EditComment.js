import React, { useState } from 'react';

const EditComment = ({ comment, onSave, onCancel }) => {
  const [text, setText] = useState(comment.text);
  const [author, setAuthor] = useState(comment.author);
  const [likes, setLikes] = useState(comment.likes);
  const [images, setImages] = useState(comment.images?.join('\n') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert('Comment text is required');
      return;
    }

    const updatedComment = {
      text: text.trim(),
      author: author.trim(),
      likes: parseInt(likes) || 0,
      images: images.split('\n').filter(img => img.trim()).map(img => img.trim())
    };

    onSave(updatedComment);
  };

  return (
    <div className="edit-comment">
      <h3>Edit Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Comment:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="likes">Likes:</label>
          <input
            type="number"
            id="likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">Images (one URL per line):</label>
          <textarea
            id="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            rows="3"
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComment;