const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.registerUser = asyncHandler (async(req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                msg: "User already exists",
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        res.status(200).json({
            msg: "user created successfully",
            success: true,
            newUser
        })

    } catch (error) {
        console.log(error)
    }
})