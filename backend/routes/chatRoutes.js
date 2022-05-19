const express = require("express");
const { createNewChat } = require("../controllers/chatControllers");

const router = express.Router();

// router.route('/').post(accessChat)
// router.get('/').post(fetchChats)
router.route("/group").post(createNewChat);

module.exports = router;
