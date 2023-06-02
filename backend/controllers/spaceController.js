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

const getAllSpaces = async function (req, res) {
  try {
    const spaces = await Space.find({});
    res.status(200).json(spaces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSpace = async function (req, res) {
  const { title, state } = req.body;
  const user = req.user;

  if (!title || !state)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
    if (state === "public") await checkoutIsTitleExist(title);
    const space = await Space.create({ title, state, ownerId: user._id });

    await user.spaces.push(space._id);
    await user.save();

    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDefaultSpace = async function (req, res) {
  try {
    const space = await Space.findById("646c1929ebba035de6f2208c").populate(
      "blogs",
    );
    if (!space)
      return res
        .status(404)
        .json({ error: "Server Error: Default Space not found" });
    res.status(200).json(space);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSpace = async function (req, res) {
  const user = req.user;
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Please provide an id" });

  try {
    const space = await Space.findById(
      id,
      "-invitationKey -expirationDate",
    ).populate("blogs");

    if (!space) return res.status(404).json({ error: "Space not found" });
    if (!space.members.includes(user._id))
      return res.status(403).json({ error: `You don't have access` });

    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
  const user = req.user;
  console.log(user);
  const { invitationKey } = req.body;
  if (!invitationKey)
    return res.status(400).json({ error: "Please provide an invitationKey" });
  try {
    const space = await Space.findOne({ invitationKey });
    if (!space) return res.status(401).json({ error: "Invalid invitationKey" });
    if (space.expirationDate < new Date())
      return res.status(401).json({ error: "InvitationKey expired" });

    // get the current user from the request and check if they are already a member

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

const getUserSpaces = async (req, res) => {
  const user = req.user;
  const spacesIds = [...user.spaces];
  try {
    const spacesTitles = await Promise.all(
      spacesIds.map(async (spaceId) => {
        const spaceTitle = await Space.findById(spaceId, "title _id");
        return spaceTitle;
      }),
    );
    res.status(200).send({ ...spacesTitles });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  getUserSpaces,
  getDefaultSpace,
  getAllSpaces,
  createSpace,
  getSpace,
  updateSpace,
  deleteSpace,
  inviteUser,
  joinSpace,
};
