const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
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

dotenv.config();

connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is Running");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
