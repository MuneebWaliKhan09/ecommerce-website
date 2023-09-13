const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');


exports.isAuthenticated = expressAsyncHandler(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({
            msg: "You are not logged in to access this page",
            success: false
        })
    }

    const decoded = jwt.verify(token, process.env.Jwt_Secret_Key);

    const user = await User.findById(decoded.id);

    req.user = user;

    next();


})