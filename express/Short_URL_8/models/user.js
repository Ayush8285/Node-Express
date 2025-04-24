//for Authentication and User Management
// This file defines the User model for the application using Mongoose.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    role:{
        type: String,
        required: true,
        default: "NORMAL",
    },
    password: {
    type: String,
    required: true,
    },
},{timestamps: true});


const User = mongoose.model('User', userSchema);

module.exports = User;