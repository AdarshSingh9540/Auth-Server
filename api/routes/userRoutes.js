const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');
const validateSignup = require('../middleware/validatesSignup');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', validateSignup, signup);
router.post('/login', login);


router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Profile data',
        user: req.user
    });
});

module.exports = router;