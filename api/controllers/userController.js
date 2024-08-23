const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 
const bcrypt = require('bcrypt');


const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: "User is already registered"
            });
        }

     
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: 'User created successfully',
            token,
        });
    } catch (error) {
        console.error(error);  
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

     
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(404).json({
                error: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }
        const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports = {
    signup,
    login
};
