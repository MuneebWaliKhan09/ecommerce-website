const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 5,
        maxlength: 50
    
    },

    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 4,
        select: false
    },

    role: {
        type: String,
        default: "user"
    },

    avatar: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }


        }
    ],

    CreatedAt:{
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordTokenExpire: Date

    


})





module.exports = mongoose.model('users', UserSchema);