const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter Your First Name"],
    },
    lastName: {
        type: String,
        required: [true, "Please Enter Your Last Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have atleast 8 chars"],
        select: false,
    },
    // phoneNumber: {
    //     type: String,
    //     required: [true, "Please Enter Your Phone Number"],
    //     validate: {
    //         validator: function (v) {
    //             return /^[0-9]{10}$/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid phone number! Please enter a 10-digit number without spaces or special characters.`,
    //     },
    // },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);