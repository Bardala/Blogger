require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Blogs = require("../models/blogModel");
const Comments = require("../models/commentModel");
// helper functions
const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });

async function getBlogsAndComments(user) {
  const blogs = await Blogs.find({ userId: user._id });
  const comments = await Comments.find({ author: user.username });
  return { ...user.toObject(), blogs, comments };
}

// controllers
const signup = async function (req, res) {
  const { email, password, username } = req.body;
  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id);
    res.status(200).json({ username, email, token });
    console.log("Success signup");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ username: user.username, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -updatedAt");

    const usersWithActivities = await Promise.all(
      users.map((user) => {
        console.log(user);
        return getBlogsAndComments(user);
      }),
    );

    res.status(200).json(usersWithActivities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password -updatedAt",
    );
    console.log(user);

    const usersWithActivities = await getBlogsAndComments(user);

    console.log(usersWithActivities);
    res.status(200).json(usersWithActivities);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  getUsers,
  getUserByUsername,
};
