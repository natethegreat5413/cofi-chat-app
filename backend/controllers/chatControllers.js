const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");

const fetchChats = asyncHandler(async (req, res) => {
    Chat.find()
        .then((chat) => {
            res.status(200).send(chat);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Chats",
            });
        });
});

const fetchChatById = asyncHandler(async (req, res) => {
    Chat.findById(req.params.id)
        .then((chat) => {
            if (!chat) {
                return res.status(404).send({
                    message: "Chat not found with id " + req.params.id,
                });
            }
            res.send(chat);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Chat not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Error retrieving chat with id " + req.params.id,
            });
        });
});

const createNewChat = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "Please Fill all the fields" });
    }
    try {
        const newChat = await Chat.create({
            chatName: req.body.name,
        });

        newChat.save().then((data) => {
            res.send(data);
        });
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = { createNewChat, fetchChats, fetchChatById };
