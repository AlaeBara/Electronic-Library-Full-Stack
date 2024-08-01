const mongoose = require('mongoose');

// The users mongo db schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String },
    address: { type: String},
    country: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
