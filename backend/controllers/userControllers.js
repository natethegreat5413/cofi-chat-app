const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../Models/userModel");

////  REGISTER THE USER ////
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).send({ message: "Please enter all of the fields." });
    }

    // Query DB to see if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).send({ message: "User already exists" });
    }

    // If user doesn't exist create one
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).send({ message: "Failed to Create new User" });
    }
});

//// AUTHENTICATE THE USER ////
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).send({ message: "Invalid Email or Password" });
    }
});

module.exports = { registerUser, authUser };
