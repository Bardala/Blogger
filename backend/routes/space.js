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
  addUser,
} = require("../controllers/spaceController");

const express = require("express");
const router = express.Router();

router.post("/space/:spaceId/addUser/:memberId", addUser);
router.get("/getUserSpaces", getUserSpaces);
router.get("/getDefaultSpace", getDefaultSpace);
router.get("/getAllSpaces", getAllSpaces);
router.post("/createSpace", createSpace);
router.get("/getSpace/:id", getSpace);
router.put("/updateSpace/:id", updateSpace);
router.delete("/deleteSpace/:id", deleteSpace);
router.post("/inviteToSpace/:id/invite", inviteUser);
router.post("/space/:spaceId/join", joinSpace);

module.exports = router;
