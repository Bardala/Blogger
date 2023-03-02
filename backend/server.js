require("dotenv").config();
const Blogs = require("./models/blogModel");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

  const blogs = await Blogs.find({});

  res.status(200).json(blogs);
});

// post a blog
app.post("/createBlog", async function createBlog(req, res) {
  console.log("post a blog");
  const { title, body, author } = req.body;
  let emptyFields = [];
  if (!body) emptyFields.push("body");
  if (!title) emptyFields.push("title");
  if (!author) emptyFields.push("author");
  if (emptyFields.length)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
    const blog = await Blogs.create({ title, body, author });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a blog
app.get("/:id", async function getBlog(req, res) {
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
app.delete("/:id", async function deleteBlog(req, res) {
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
