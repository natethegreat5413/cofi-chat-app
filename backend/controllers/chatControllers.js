const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");

// const accessChat = asyncHandler(async (req, res) => {
//     const { userId } = req.body;

//     if (!userId) {
//         console.log("UserId param not sent with request");
//         return res.sendStatus(400);
//     }
// });

// const fetchChats = asyncHandler(async (req, res) => {
//     try {
//         Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).then(
//             (result) => res.send(result)
//         );
//     } catch (error) {}
// });

const createNewChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    var users = JSON.parse(req.body.users);

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
        });

        const fullGroupChat = await Chat.findOne({
            _id: groupChat._id,
        }).populate("users", "-password");
        res.status(200).json(fullGroupChat);
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = { createNewChat };
