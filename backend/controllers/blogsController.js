const User = require("../models/userModel");
const Blogs = require("../models/blogModel");
const Space = require("../models/spaceModel");
const Comments = require("../models/commentModel");
const mongoose = require("mongoose");

// get all blogs(checked)
const getAllBlogs = async function (req, res) {
  const blogs = await Blogs.find({}).populate("comments");
  res.status(200).json({ blogs });
};

// get blogs by username(checked)
const getBlogsByUsername = async function (req, res) {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    console.log(user._id);

    if (!user) return res.status(404).json({ error: "User not found" });

    const blogs = await Blogs.find({ authorId: user._id })
      .sort({
        createdAt: -1,
      })
      .populate("comments");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// post a blog(checked)
const createBlog = async function (req, res) {
  let { title, body, spaceId } = req.body;
  const user = req.user;
  const authorId = req.user._id;
  const author = req.user.username;
  spaceId = spaceId || "646c1929ebba035de6f2208c";
  if (!body || !title)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a blog(checked)
const getBlog = async function (req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blog" });
  }

  try {
    const blog = await Blogs.findById(id).populate("comments");
    if (!blog) return res.status(400).json({ error: "No such blog" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a blog(checked)
const deleteBlog = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid id" });

  try {
    const blog = await Blogs.findById(id);
    const space = await Space.findById(blog.spaceId);

    if (!blog)
      return res
        .status(400)
        .json({ error: "The blog which try to delete it is not exist" });

    if (JSON.stringify(blog.authorId) !== JSON.stringify(user._id))
      return res.status(403).json({ error: "You do not have permission" });

    await Blogs.findOneAndDelete({ _id: id });
    await Comments.deleteMany({ blogId: id });

    await space.blogs.pull(id);
    await space.save();

    await user.blogs.pull(id);
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.log("error in delete blog", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  getBlogsByUsername,
};
