const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Index Route
router.get('/', async(req, res) => {
    const posts = await Post.find().sort({ createdAt: 'desc' });
    res.render('posts/index', { posts });
});

// New Post Route
router.get('/new', (req, res) => {
    res.render('posts/new');
});

// Create Post Route
router.post('/', async(req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });

    try {
        await newPost.save();
        res.redirect('/posts');
    } catch (err) {
        res.render('posts/new', { post: newPost, error: err.message });
    }
});

module.exports = router;