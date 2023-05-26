const express = require("express");
const {
  getUsers,
  getUserByUsername,
  followUser,
  unfollowUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:username", getUserByUsername);
router.put("/users/:username/follow", followUser);
router.put("/users/:username/unfollow", unfollowUser);

module.exports = router;
