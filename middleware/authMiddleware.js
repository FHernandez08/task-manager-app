const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided!'});
    };

    try {
        // decodes the token to get user ID
        const decodedUnverified = jwt.decode(token);
        if (!decodedUnverified || !decodedUnverified._id) {
            return res.status(403).json({ message: 'Invalid token payload' });
        }

        // finds user by ID
        const user = await User.findById(decodedUnverified._id);
        if (!user || !user.jwtSecret) {
            return res.status(403).json({ message: 'User not found or missing secret' });
        }

        // verifies token using user's unique secret
        const decoded = jwt.verify(token, user.jwtSecret);

        // attach the request
        req.user = decoded;
        next();
    }
    
    catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Invalid or expired token!' });
    }
}

module.exports = { authMiddleware };