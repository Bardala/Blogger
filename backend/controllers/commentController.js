const Comments = require("../models/commentModel");
const mongoose = require("mongoose");
const Blogs = require("../models/blogModel");

const createComment = async function (req, res) {
  const { blogId, body, author } = req.body;

  if (!body || !blogId || !author)
    return res.status(400).json({ error: "Please fill all fields" });
  if (!mongoose.Types.ObjectId.isValid(blogId))
    return res.status(400).json({ error: "invalid id" });
  try {
    const blog = await Blogs.findById(blogId);
    if (!blog) return res.status(400).json({ error: "blog is not exist" });
    const comment = await Comments.create({ body, blogId, author });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getComments = async function (req, res) {
  const blogId = req.query.blogId;
  if (!mongoose.Types.ObjectId.isValid(blogId))
    return res.status(400).json({ error: "invalid id" });

  try {
    const comments = await Comments.find({ blogId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
};
