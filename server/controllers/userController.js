const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, password , avatar} = req.body;

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                msg: "User already exists",
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = User.create({
            username,
            email,
            password: hashPassword,
            avatar: {
                public_id: "picture",
                url: "pic url",
            }
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