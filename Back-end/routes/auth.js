const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/authController');
const router = express.Router();
// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    authController.register
);
// @route   POST /api/auth/login
// @desc    Authenticate user and start session
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    authController.login
);
// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: 'Not authenticated' });
    }
    User.findById(req.session.userId)
        .select('-password')
        .then(user => res.json(user))
        .catch(err => {
            console.error(err.message);
            res.status(500).send('Server error');
        });
});
// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out, please try again.');
        }
        res.json({ msg: 'Logged out successfully' });
    });
});
module.exports = router;