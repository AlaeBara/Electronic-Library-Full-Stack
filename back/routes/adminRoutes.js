const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const { jwtMiddleware } = require('../middelware/jwt');


// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// Get all users
router.get('/users', jwtMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user
router.delete('/users/:id', jwtMiddleware, isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted', user: deletedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get summary data
router.get('/summary', jwtMiddleware, isAdmin, async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments();
    res.json({ totalBooks, totalUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
