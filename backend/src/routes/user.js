const asyncHandler = require("express-async-handler");

const express = require("express");
const {
  deleteUser,
  getUsers,
  getUserByUsername,
  followUser,
  unfollowUser,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();

router.delete("/users/:id", asyncHandler(deleteUser));
router.get("/users", asyncHandler(getUsers));
router.get("/users/:username", asyncHandler(getUserByUsername));
router.get("/users/:id/getById", asyncHandler(getUserById));
router.put("/users/:username/follow", asyncHandler(followUser));
router.put("/users/:username/unfollow", asyncHandler(unfollowUser));

module.exports = router;
