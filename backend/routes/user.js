const express = require("express");
const { getUsers, getUser } = require("../controllers/userController");
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);

module.exports = router;
