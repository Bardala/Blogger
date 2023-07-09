const asyncHandler = require("express-async-handler");

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

router.post("/space/:spaceId/addUser/:memberId", asyncHandler(addUser));
router.get("/getUserSpaces", asyncHandler(getUserSpaces));
router.get("/getDefaultSpace", asyncHandler(getDefaultSpace));
router.get("/getAllSpaces", asyncHandler(getAllSpaces));
router.post("/createSpace", asyncHandler(createSpace));
router.get("/getSpace/:id", asyncHandler(getSpace));
router.put("/updateSpace/:id", asyncHandler(updateSpace));
router.delete("/deleteSpace/:id", asyncHandler(deleteSpace));
router.post("/inviteToSpace/:id/invite", asyncHandler(inviteUser));
router.post("/space/:spaceId/join", asyncHandler(joinSpace));

module.exports = router;
