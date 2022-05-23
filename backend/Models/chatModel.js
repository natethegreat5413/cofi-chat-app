const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
