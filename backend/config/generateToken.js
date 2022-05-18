const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.lsign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = generateToken;
