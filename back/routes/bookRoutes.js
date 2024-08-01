const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const {jwtMiddleware} = require('../middelware/jwt');


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
router.get('/:category/:id', async (req, res) => {
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
router.post('/addbook', jwtMiddleware,async (req, res) => {
  const book = new Book({
    id_client:req.user.id,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    cover: req.body.cover,
    category: req.body.category,
    pdfUrl: req.body.pdfUrl
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Delete a book
router.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({_id: req.params.id });
    if (deletedBook) {
      res.json({ message: 'Book deleted', book: deletedBook });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// seach bar
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// fetshing exact user book for shing them in profile
router.get('/user-books', jwtMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ id_client: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;  
