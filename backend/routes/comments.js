const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// getall comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get single comment
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add a new comment
router.post('/', async (req, res) => {
  try {
    const { text, author = 'Anonymous', likes = 0, image = '' } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const comment = new Comment({
      text,
      author,
      likes,
      image,
      date: new Date()
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// edit comment
router.put('/:id', async (req, res) => {
  try {
    const { text, author, likes, image } = req.body;
    
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (text !== undefined) comment.text = text;
    if (author !== undefined) comment.author = author;
    if (likes !== undefined) comment.likes = likes;
    if (image !== undefined) comment.image = image;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;