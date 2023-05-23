const mongoose = require("mongoose");
const Space = require("../models/spaceModel");
const User = require("../models/userModel");
const Blog = require("../models/blogModel");

// helper functions
async function checkoutIsTitleExist(title) {
  const space = await Space.findOne({ title });
  if (space)
    throw Error(
      `There is another public space with the same title :( please chose another title`,
    );
}

// get all spaces(checked)
const getAllSpaces = async function (req, res) {
  try {
    const spaces = await Space.find({});
    res.status(200).json(spaces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create a new space(checked)
const createSpace = async function (req, res) {
  const { title, state, ownerId } = req.body;
  if (!title || !state || !ownerId)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
    if (state === "public") await checkoutIsTitleExist(title);
    const space = await Space.create({ title, state, ownerId });
    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single space by id(checked)
const getSpace = async function (req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Please provide an id" });
  try {
    const space = await Space.findById(id)
      .populate("adminId")
      .populate("blogs")
      .populate("members");
    if (!space) return res.status(404).json({ error: "Space not found" });
    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a space by id(checked)
const updateSpace = async function (req, res) {
  const { id } = req.params;
  const { title, state } = req.body;
  if (!id) return res.status(400).json({ error: "Please provide an id" });
  if (!title && !state)
    return res.status(400).json({ error: "Please provide a title or a state" });
  try {
    const space = await Space.findByIdAndUpdate(
      id,
      { title, state },
      { new: true },
    );
    // new means return the updated document not the old one
    if (!space) return res.status(404).json({ error: "Space not found" });
    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// invite a user to join a space by email and invitationKey(checked)
const inviteUser = async function (req, res) {
  const { id } = req.params;
  const { email, invitationKey } = req.body;
  if (!id) return res.status(400).json({ error: "Please provide an id" });
  if (!email || !invitationKey)
    return res
      .status(400)
      .json({ error: "Please provide an email and an invitationKey" });
  try {
    // find the space and check the invitationKey and expirationDate
    const space = await Space.findById(id);
    if (!space) return res.status(404).json({ error: "Space not found" });
    if (space.invitationKey !== invitationKey)
      return res.status(401).json({ error: "Invalid invitationKey" });
    if (space.expirationDate < new Date())
      return res.status(401).json({ error: "InvitationKey expired" });

    // find the user by email and check if they are already a member
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (space.members.includes(user._id))
      return res.status(409).json({ error: "User already a member" });

    // add the user to the space members and the space to the user spaces
    space.members.push(user._id);
    user.spaces.push(space._id);

    // save the updated documents
    await space.save();
    await user.save();

    // send a success response with the updated space
    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// join a space by id and invitationKey(checked)
const joinSpace = async function (req, res) {
  const { invitationKey } = req.body;
  if (!invitationKey)
    return res.status(400).json({ error: "Please provide an invitationKey" });
  try {
    const space = await Space.findOne({ invitationKey });
    if (!space) return res.status(401).json({ error: "Invalid invitationKey" });
    if (space.expirationDate < new Date())
      return res.status(401).json({ error: "InvitationKey expired" });

    // get the current user from the request and check if they are already a member

    const user = req.user;
    console.log(user);
    console.log(user._id);
    console.log(user.spaces);
    if (space.members.includes(user._id))
      return res.status(409).json({ error: "User already a member" });

    // add the user to the space members and the space to the user spaces
    space.members.push(user._id);
    user.spaces.push(space._id);

    // save the updated documents
    await space.save();
    await user.save();

    // send a success response with the updated space
    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a space by id(checked)
const deleteSpace = async function (req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Please provide an id" });
  try {
    const space = await Space.findByIdAndDelete(id);
    if (!space) return res.status(404).json({ error: "Space not found" });
    // delete all blogs and remove references from users
    await Blog.deleteMany({ _id: { $in: space.blogs } }); // $in operator to check if a value is in an array
    await User.updateMany(
      { _id: { $in: space.members } },
      { $pull: { spaces: id } },
    );
    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllSpaces,
  createSpace,
  getSpace,
  updateSpace,
  deleteSpace,
  inviteUser,
  joinSpace,
};
