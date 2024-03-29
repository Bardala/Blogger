const User = require("../models/userModel");
const Blogs = require("../models/blogModel");
const Space = require("../models/spaceModel");
const Comments = require("../models/commentModel");
const Likes = require("../models/likesModel");
const mongoose = require("mongoose");

// get all blogs(checked)
const getAllBlogs = async function (req, res) {
  const blogs = await Blogs.find({}).populate("comments");
  res.status(200).json({ blogs });
};

const getBlogsByUsername = async function (req, res) {
  const username = req.params.username;

  const user = await User.findOne({ username });
  console.log(user._id);

  if (!user) return res.status(404).json({ error: "User not found" });

  const blogs = await Blogs.find({ authorId: user._id })
    .sort({
      createdAt: -1,
    })
    .populate("comments");

  res.status(200).json(blogs);
};

const createBlog = async function (req, res) {
  let { title, body, spaceId } = req.body;
  const user = req.user;
  const authorId = req.user._id;
  const author = req.user.username;
  spaceId = spaceId || "646c1929ebba035de6f2208c";
  if (!body || !title)
    return res.status(400).json({ error: "Please fill all fields" });

  let space = await Space.findById(spaceId);

  if (!space) return res.status(400).json({ error: "No such space" });
  if (!space.members.includes(authorId))
    return res.status(403).json({ error: "You do not have permission" });

  const blog = await Blogs.create({ title, body, authorId, author, spaceId });

  space.blogs.push(blog._id);
  await space.save();

  user.blogs.push(blog._id);
  await user.save();

  res.status(200).json({ blog });
};

// get a blog(checked)
const getBlog = async function (req, res) {
  const { id } = req.params;

  const blog = await Blogs.findById(id).populate("comments");
  if (!blog) return res.status(400).json({ error: "No such blog" });
  res.status(200).json(blog);
  /**
     const blog = await Blogs.findById(id);
    if (!blog) return res.status(400).json({ error: "No such blog" });

    const [likes, comments] = await Promise.all([
      Likes.find({ blogId: id }),
      Comments.find({ blogId: id }),
    ]);

    res.status(200).json({ ...blog._doc, comments, likes });
     */
};

// delete a blog(checked)
const deleteBlog = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const blog = await Blogs.findById(id);
  if (!blog)
    return res
      .status(400)
      .json({ error: "The blog which try to delete it is not exist" });

  const space = await Space.findById(blog.spaceId);
  if (JSON.stringify(blog.authorId) !== JSON.stringify(user._id))
    return res.status(403).json({ error: "You do not have permission" });

  await Blogs.findOneAndDelete({ _id: id });
  await Comments.deleteMany({ blogId: id });

  await space.blogs.pull(id);
  await space.save();

  await user.blogs.pull(id);
  await user.save();

  res.status(200).json({});
};

const likeBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blogs.findById(id);
  if (!blog) return res.status(400).json({ error: "No such blog" });
  blog.likes += 1;
  await blog.save();
  res.status(200).json(blog);
};

module.exports = {
  likeBlog,
  getAllBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  getBlogsByUsername,
};
