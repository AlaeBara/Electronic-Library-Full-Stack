const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: 'djux9krem', 
    api_key: '639144162891629', 
    api_secret: 'cqldqET6lDIs4iM9WAkf5DV4Adg' 
  });
  
  router.get('/signature', (req, res) => {
    const timestamp = Math.round((new Date).getTime()/1000);
    const signature = cloudinary.utils.api_sign_request({
      timestamp: timestamp,
      folder: 'user_uploads'
    }, cloudinary.config().api_secret);
    res.json({ timestamp, signature });
  });


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username:username,  email:email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };

router.get('/profile', authMiddleware, async (req, res) => {
try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
    return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

router.put('/profile', authMiddleware, async (req, res) => {
const { username, phone, address, country, profileImage } = req.body;

try {
    let user = await User.findById(req.user.id);
    if (!user) {
    return res.status(404).json({ msg: 'User not found' });
    }

    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.country = country || user.country;
    user.profileImage = profileImage || user.profileImage;

    await user.save();
    res.json(user);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;