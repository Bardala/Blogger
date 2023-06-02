const {
  createSpace,
  getSpace,
  updateSpace,
  deleteSpace,
  inviteUser,
  joinSpace,
  getAllSpaces,
  getDefaultSpace,
  getUserSpaces,
} = require("../controllers/spaceController");

const express = require("express");
const router = express.Router();

router.get("/getUserSpaces", getUserSpaces);
router.get("/getDefaultSpace", getDefaultSpace);
router.get("/getAllSpaces", getAllSpaces);
router.post("/createSpace", createSpace);
router.get("/getSpace/:id", getSpace);
router.put("/updateSpace/:id", updateSpace);
router.delete("/deleteSpace/:id", deleteSpace);
router.post("/inviteToSpace/:id/invite", inviteUser);
router.post("/joinToSpace/", joinSpace);

module.exports = router;
