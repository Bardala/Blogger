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
    if (user) {
      const blogs = await Blogs.find({ authorId: user._id }).sort({
        createdAt: -1,
      });
      const blogsWithComments = await Promise.all(
        blogs.map(async (blog) => {
          const comments = await Comments.find({ blogId: blog._id });
          return { ...blog.toObject(), comments };
        }),
      );
      res.status(200).json(blogsWithComments);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// post a blog(checked)
const createBlog = async function (req, res) {
  const { title, body, spaceId } = req.body;
  if (!body || !title || !spaceId)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
    const authorId = req.user._id;
    const space = await Space.findById(spaceId);

    if (!space) return res.status(400).json({ error: "No such space" });
    if (!space.members.includes(authorId))
      return res.status(403).json({ error: "You do not have permission" });

    const blog = await Blogs.create({ title, body, authorId, spaceId });

    space.blogs.push(blog._id);
    await space.save();

    res.status(200).json(blog);
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
  const userId = req.user._id;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid id" });

  try {
    const blog = await Blogs.findById(id);
    if (!blog)
      return res
        .status(400)
        .json({ error: "The blog which try to delete it is not exist" });

    if (JSON.stringify(blog.authorId) !== JSON.stringify(userId))
      return res.status(403).json({ error: "You do not have permission" });

    await Blogs.findOneAndDelete({ _id: id });
    await Comments.deleteMany({ blogId: id });
    res.status(200).json({ blog });
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
  // getBlogsByUserId,
  getBlogsByUsername,
};
