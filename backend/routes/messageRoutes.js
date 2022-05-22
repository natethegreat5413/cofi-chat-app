const express = require("express");
const {
    sendMessage,
    fetchAllMessages,
} = require("../controllers/messageControllers");

const router = express.Router();

router.route("/").post(sendMessage);
router.route("/:chatId").get(fetchAllMessages);

module.exports = router;
