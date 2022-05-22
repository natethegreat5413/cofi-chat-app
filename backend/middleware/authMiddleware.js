const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log("protect", req.body.headers.Authorization);
    if (
        req.body.headers.Authorization &&
        req.body.headers.Authorization.startsWith("Bearer")
    ) {
        try {
            token = req.body.headers.Authorization.split(" ")[1];
            // console.log("token", token);

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };
