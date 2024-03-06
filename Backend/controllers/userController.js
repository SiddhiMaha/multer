const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/sendToken');

// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    const { firstName, lastName, email, password } = req.body;

    const user = await User.create({
        firstName, 
        lastName,
        email,
        password,
        // phoneNumber
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 201, res);
});