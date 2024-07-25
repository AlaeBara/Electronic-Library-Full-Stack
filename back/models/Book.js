const mongoose = require('mongoose');

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
  }
});

module.exports = mongoose.model('Book', bookSchema);
