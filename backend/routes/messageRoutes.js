const express = require("express");
const {
    sendMessage,
    fetchAllMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(fetchAllMessages);

module.exports = router;
