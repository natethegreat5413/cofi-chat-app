const express = require("express");
const dotenv = require("dotenv");
// const { chats } = require("./data/data");

const chats = [
    {
        users: [
            {
                name: "John Doe",
                email: "john@example.com",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
            },
        ],
        _id: "617a077e18c25468bc7c4dd4",
        chatName: "John Doe",
    },
    {
        users: [
            {
                name: "Guest User",
                email: "guest@example.com",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
            },
        ],
        _id: "617a077e18c25468b27c4dd4",
        chatName: "Guest User",
    },
    {
        users: [
            {
                name: "Anthony",
                email: "anthony@example.com",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
            },
        ],
        _id: "617a077e18c2d468bc7c4dd4",
        chatName: "Anthony",
    },
    {
        users: [
            {
                name: "John Doe",
                email: "jon@example.com",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
            },
            {
                name: "Guest User",
                email: "guest@example.com",
            },
        ],
        _id: "617a518c4081150716472c78",
        chatName: "Friends",
    },
    {
        users: [
            {
                name: "Jane Doe",
                email: "jane@example.com",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
            },
        ],
        _id: "617a077e18c25468bc7cfdd4",
        chatName: "Jane Doe",
    },
    {
        users: [
            {
                name: "John Doe",
                email: "jon@example.com",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
            },
            {
                name: "Guest User",
                email: "guest@example.com",
            },
        ],
        _id: "617a518c4081150016472c78",
        chatName: "Chill Zone",
    },
];

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is Running");
});

app.get("/api/chat", (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
