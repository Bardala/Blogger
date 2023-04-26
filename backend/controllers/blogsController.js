const Blogs = require("../models/blogModel");
const Comments = require("../models/commentModel");
const mongoose = require("mongoose");

// get all blogs
const getAllBlogs = async function (req, res) {
  // remember: make private and public blogs

  const blogs = await Blogs.find({}).sort({ createdAt: -1 });
  const blogsWithComments = await Promise.all(
    blogs.map(async (blog) => {
      const comments = await Comments.find({ blogId: blog._id });
      return { ...blog.toObject(), comments };
    }),
  );
  res.status(200).json(blogsWithComments);
};

const getBlogsByUserId = async function (req, res) {
  const userId = req.params.id;
  console.log("userId", userId);
  try {
    const blogs = await Blogs.find({ userId }).sort({ createdAt: -1 });
    const blogsWithComments = await Promise.all(
      blogs.map(async (blog) => {
        const comments = await Comments.find({ blogId: blog._id });
        return { ...blog.toObject(), comments };
      }),
    );

    res.status(200).json(blogsWithComments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBlogsByUsername = async function (req, res) {
  try {
    const blogs = await Blogs.find({ author: req.params.username }).sort({
      createdAt: -1,
    });
    const blogsWithComments = await Promise.all(
      blogs.map(async (blog) => {
        const comments = await Comments.find({ blogId: blog._id });
        return { ...blog.toObject(), comments };
      }),
    );

    res.status(200).json(blogsWithComments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// post a blog
const createBlog = async function (req, res) {
  const { title, body, author } = req.body;
  if (!body || !title || !author)
    return res.status(400).json({ error: "Please fill all fields" });
  try {
    const userId = req.user._id;
    const blog = await Blogs.create({ title, body, author, userId });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a blog
const getBlog = async function (req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blog" });
  }

  try {
    const blog = await Blogs.findById(id);
    if (!blog) return res.status(400).json({ error: "No such blog" });
    const comments = await Comments.find({ blogId: blog._id });
    res.status(200).json({ ...blog.toObject(), comments });
    // todo: make private and public blogs
    // if (blog.userId != userId)
    //   return res
    //     .status(403)
    //     .json({ error: "You do not have the permission to access this data" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a blog
const deleteBlog = async (req, res) => {
  const userId = req.user._id;
  console.log(" ");
  console.log("deleteBlog userId", userId);
  console.log("deleteBlog req.user", req.user);
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid id" });

  try {
    const blog = await Blogs.findById(id);
    if (blog.userId != userId)
      return res.status(403).json({ error: "You do not have permission" });

    await Blogs.findOneAndDelete({ _id: id });
    await Comments.deleteMany({ blogId: id });
    if (!blog)
      return res
        .status(400)
        .json({ error: "The blog which try to delete it is not exist" });
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
  getBlogsByUserId,
  getBlogsByUsername,
};
