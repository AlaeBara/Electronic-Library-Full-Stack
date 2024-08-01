const mongoose = require('mongoose');

// book table
const bookSchema = new mongoose.Schema({
  id_client: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  cover: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Adventure", "Romance", "Thriller", "Memoir", "Travel", "Health", "Poetry", "Cooking"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pdfUrl: {
    type: String,
    trim: true
  },
});

module.exports = mongoose.model('Book', bookSchema);
