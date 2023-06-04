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
    if (!space.members.includes(user._id) && !space.state === "public")
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
    const space = await Space.findById(id);
    if (!space) return res.status(404).json({ error: "Space not found" });
    if (space.invitationKey !== invitationKey)
      return res.status(401).json({ error: "Invalid invitationKey" });
    if (space.expirationDate < new Date())
      return res.status(401).json({ error: "InvitationKey expired" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (space.members.includes(user._id))
      return res.status(409).json({ error: "User already a member" });

    space.members.push(user._id);
    user.spaces.push(space._id);

    await space.save();
    await user.save();

    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// join to public space
const joinSpace = async function (req, res) {
  const user = req.user;
  const { spaceId } = req.params;
  console.log("spaceId", spaceId);
  try {
    const space = await Space.findById(spaceId);
    if (!space) return res.status(401).json({ error: "Space not found" });
    console.log("space", space);

    if (space.members.includes(user._id))
      return res.status(409).json({ error: "User already a member" });

    space.members.push(user._id);
    user.spaces.push(space._id);

    await space.save();
    await user.save();

    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  const user = req.user;
  const { spaceId, memberId } = req.params;

  console.log("spaceId", spaceId);
  console.log("memberId", memberId);

  if (!memberId || !spaceId)
    return res
      .status(400)
      .json({ error: "Please provide a member id and a space id" });

  try {
    const newMember = await User.findById(memberId, "spaces _id");
    const space = await Space.findById(spaceId, "members adminId");

    if (!newMember) return res.status(404).json({ error: "User not found" });
    if (!space) return res.status(404).json({ error: "Space not found" });

    const admins = space.adminId.map((admin) => admin?.toString());
    const members = space.members.map((member) => member?.toString());

    if (!admins.includes(user._id.toString()))
      return res.status(403).json({ error: "You are not an admin" });
    if (members.includes(memberId))
      return res.status(409).json({ error: "User already a member" });

    space.members.push(memberId);
    await space.save();

    newMember.spaces.push(spaceId);
    await newMember.save();

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
  addUser,
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
