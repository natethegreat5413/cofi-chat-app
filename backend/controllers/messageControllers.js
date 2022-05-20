const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");
const Message = require("../Models/messageModel");

const fetchAllMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error("Something went wrong", error.message);
    }
});

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    console.log("USER", req.user);

    if (!content || !chatId) {
        console.log("invalid data passed into request", req.body);
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name");
        message = await message.populate("chat");

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error("Error sending message", error.message);
    }
});

module.exports = { fetchAllMessages, sendMessage };
