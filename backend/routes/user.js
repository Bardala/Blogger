const express = require("express");
const {
  getUsers,
  getUserByUsername,
  followUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:username", getUserByUsername);
router.post("/users/:username/follow", followUser);

module.exports = router;
