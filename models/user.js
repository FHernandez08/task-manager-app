// model used for connecting to mongoDB - used for when someone login, checks database to see if user exists

const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
        required: true,
        unique: true
    },
    jwtSecret: {
        type: String,
        required: true,
        default: () => crypto.randomBytes(64).toString('hex');
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;