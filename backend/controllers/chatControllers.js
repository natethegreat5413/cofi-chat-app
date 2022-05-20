const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

// const fetchChats = asyncHandler(async (req, res) => {
//     try {
//         Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
//             .populate('Users", "-password')
//             .populate("latestMessage")
//             .sort({ updatedAt: -1 })
//             .then(async (res) => {
//                 res = await User.populate(results, {
//                     path: "latestMessage.sender",
//                     select: "name email",
//                 });
//                 res.status(200).send(res);
//             });
//     } catch (error) {
//         res.status(400);
//         throw new Error(error.message);
//     }
// });

const fetchChats = asyncHandler(async (req, res) => {
    Chat.find()
        .then((chat) => {
            res.send(chat);
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
    if (!req.body.name || !req.body.messages) {
        return res.status(400).send({ message: "Please Fill all the fields" });
    }
    console.log("Hello world", req.body);

    // var users = JSON.parse(req.body.users);

    // users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            // users: users,
            messages: [],
        });

        groupChat.save().then((data) => {
            res.send(data);
        });

        // const fullGroupChat = await Chat.findOne({
        //     _id: groupChat._id,
        // }).populate("users", "-password");
        // res.status(200).json(fullGroupChat);
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = { createNewChat, fetchChats, fetchChatById };
