require("dotenv").config();
const Blogs = require("./models/blogModel");
const Comments = require("./models/commentModel");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Connect to database & listening on port", process.env.PORT)
    );
  })
  .catch((error) => console.log(error));

// get all blogs
app.get("/blogs", async function getAllBlogs(req, res) {
  console.log("get all blogs");

  const blogs = await Blogs.find({}).sort({ createdAt: -1 });

  res.status(200).json(blogs);
});

// post a blog
app.post("/createBlog", async function createBlog(req, res) {
  console.log("post a blog");
  const { title, body, author } = req.body;
  if (!body || !title || !author)
    return res.status(400).json({ error: "Please fill all fields" });
  try {
    const blog = await Blogs.create({ title, body, author });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a blog
app.get("/blogs/:id", async function getBlog(req, res) {
  console.log("get a blog");

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blog" });
  }

  try {
    const blog = await Blogs.findById(id);
    if (!blog) return res.status(400).json({ error: "No such blog" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a blog
app.delete("/blogs/:id", async function deleteBlog(req, res) {
  console.log("delete a blog");

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid id" });

  try {
    const blog = await Blogs.findOneAndDelete({ _id: id });
    if (!blog)
      return res
        .status(400)
        .json({ error: "The blog which try to delete it is not exist" });
    res.status(200).json({ blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add comment to a blog
app.post("/createComment", async function createComment(req, res) {
  console.log("create a comment");
  const { blogId, body } = req.body;
  if (!body || !blogId)
    return res.status(400).json({ error: "error in comment body or blogId" });
  if (!mongoose.Types.ObjectId.isValid(blogId))
    return res.status(400).json({ error: "invalid id" });
  try {
    const comment = await Comments.create({ body, blogId });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get comments
app.get("/getComments", async function getComments(req, res) {
  console.log("getComments");
  const blogId = req.query.blogId;
  if (!mongoose.Types.ObjectId.isValid(blogId))
    return res.status(400).json({ error: "invalid id" });

  try {
    const comments = await Comments.find({ blogId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
