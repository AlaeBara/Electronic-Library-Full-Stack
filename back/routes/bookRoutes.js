const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Token is not valid' });
  }
};


// Get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single book by category and id
router.get('/categories/:category/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ category: req.params.category, _id: req.params.id });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Add a new book
router.post('/:category', authMiddleware,async (req, res) => {
  const book = new Book({
    id_client:req.user.id,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    cover: req.body.cover,
    category: req.body.category
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Delete a book
router.delete('/categories/:category/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ category: req.params.category, _id: req.params.id });
    if (deletedBook) {
      res.json({ message: 'Book deleted', book: deletedBook });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;