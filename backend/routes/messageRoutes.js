const express = require("express");
const {
    sendMessage,
    fetchAllMessages,
} = require("../controllers/messageControllers");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(fetchAllMessages);

module.exports = router;
