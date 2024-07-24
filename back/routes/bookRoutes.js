const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

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

// Get books by category
router.get('/categories/:category', async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (err) { 
    res.status(500).json({ message: err.message });
  }
});

// Add a new book
router.post('/:category', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    cover: req.body.cover,
    category: req.params.category
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book
router.patch('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
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