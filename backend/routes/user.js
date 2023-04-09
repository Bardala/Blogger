const express = require("express");
const {
  getUsers,
  getUser,
  getUserByUsername,
} = require("../controllers/userController");
const router = express.Router();

router.get("/users", getUsers);
// router.get("/users/:id", getUser);
router.get("/users/:username", getUserByUsername);

module.exports = router;
