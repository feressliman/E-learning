// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'etudiant', 'formateur'],
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    photoprofile: {
        type: String,
        default: 'default-avatar.png'
    },
    
});

module.exports = mongoose.model('User', UserSchema);
