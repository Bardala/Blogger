require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Blogs = require("../models/blogModel");
const Comments = require("../models/commentModel");
const Space = require("../models/spaceModel");
// helper functions
const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });

// async function getBlogsAndComments(user) {
//   const blogs = await Blogs.find({ userId: user._id });
//   const comments = await Comments.find({ author: user.username });
//   return { ...user.toObject(), blogs, comments };
// }

// controllers
const signup = async function (req, res) {
  const { email, password, username } = req.body;
  const user = await User.signup(username, email, password);
  const token = createToken(user._id);
  res.status(200).json({ username, email, _id: user._id, token });
  console.log("Success signup");
};

const login = async function (req, res) {
  const { email, password } = req.body;
  const user = await User.login(email, password);
  const token = createToken(user._id);
  res
    .status(200)
    .json({ username: user.username, email, _id: user._id, token });
};

const getUsers = async (req, res) => {
  const users = await User.find({}, "-password -updatedAt")
    .populate("blogs")
    .populate("comments");
  res.status(200).json(users);
};

const getUserByUsername = async (req, res) => {
  const user = await User.findOne(
    { username: req.params.username },
    "-password -updatedAt",
  )
    .populate("blogs")
    .populate("comments")
    .populate("spaces", "title _id");

  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id, "-password -updatedAt");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
};

//checked
const followUser = async (req, res) => {
  let currentUser = req.user;

  if (currentUser.username === req.params.username) {
    return res.status(400).json({ error: "You cannot follow yourself" });
  }

  let userToFollow = await User.findOne({ username: req.params.username });
  if (!userToFollow) return res.status(404).json({ error: "User not found" });
  if (currentUser.following.includes(userToFollow._id)) {
    return res.status(400).json({ error: "You already follow this user" });
  }

  userToFollow = await User.findOneAndUpdate(
    { username: userToFollow.username },
    { $addToSet: { followers: currentUser._id } },
    { new: true }, // return the updated user
  );

  currentUser = await User.findOneAndUpdate(
    { username: currentUser.username },
    { $addToSet: { following: userToFollow._id } },
    { new: true },
  );

  res.status(200).json({ currentUser, userToFollow });
};

const unfollowUser = async (req, res) => {
  let currentUser = req.user;

  let userToUnfollow = await User.findOne({
    username: req.params.username,
  });
  if (!userToUnfollow) return res.status(404).json({ error: "User not found" });
  if (!currentUser.following.includes(userToUnfollow._id)) {
    return res.status(400).json({ error: "You don't follow this user" });
  }

  currentUser = await User.findOneAndUpdate(
    { username: currentUser.username },
    { $pull: { following: userToUnfollow._id } },
    { new: true },
  );

  userToUnfollow = await User.findOneAndUpdate(
    { username: userToUnfollow.username },
    { $pull: { followers: currentUser._id } },
    { new: true },
  );

  res.status(200).json({ currentUser, userToUnfollow });
};

// Inefficient way because it will iterate through all the spaces members in db
// Just for DEV purposes
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (user.blogs.length > 0) await Blogs.deleteMany({ userId: user._id });
  if (user.comments.length > 0)
    await Comments.deleteMany({ author: user.username });

  if (user.spaces.length > 0)
    if (user.followers.length > 0 || user.following.length > 0)
      await User.updateMany(
        { $or: [{ followers: user._id }, { following: user._id }] },
        { $pull: { followers: user._id, following: user._id } },
      );

  await Space.updateMany(
    { members: user._id },
    { $pull: { members: user._id } },
  );

  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  deleteUser,
  getUserById,
  signup,
  login,
  getUsers,
  getUserByUsername,
  followUser,
  unfollowUser,
};
