const express = require("express");
const {
    createNewChat,
    fetchChats,
    fetchChatById,
} = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").get(fetchChats);
router.route("/:id").get(fetchChatById);
router.route("/chat").post(createNewChat);

module.exports = router;
