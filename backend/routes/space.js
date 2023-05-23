const {
  createSpace,
  getSpace,
  updateSpace,
  deleteSpace,
  inviteUser,
  joinSpace,
  getAllSpaces,
} = require("../controllers/spaceController");

const express = require("express");
const router = express.Router();

router.get("/getAllSpaces", getAllSpaces);
router.post("/createSpace", createSpace);
router.get("/getSpace/:id", getSpace);
router.put("/updateSpace/:id", updateSpace);
router.delete("/deleteSpace/:id", deleteSpace);
router.post("/inviteToSpace/:id/invite", inviteUser);
router.post("/joinToSpace/", joinSpace);

module.exports = router;
