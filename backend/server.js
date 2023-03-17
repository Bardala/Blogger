require("dotenv").config();
const Blogs = require("./models/blogModel");
const Comments = require("./models/commentModel");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });

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

// Authentications
app.post("/signup", async function signup(req, res) {
  console.log("signup");
  const { email, password, username } = req.body;
  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id);
    res.status(200).json({ username, email, token });
    console.log("Success signup");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async function login(req, res) {
  console.log("login");
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ username: user.username, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// require Authentication
// middleware
app.use(async function requireAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "Authorization token required" });
  // console.log(authorization);
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select({ _id });
    next();
  } catch (error) {
    res.status(400).json({ error: "Request is not authorized" });
  }
});

// get all blogs
app.get("/blogs", async function getAllBlogs(req, res) {
  console.log("get all blogs");
  // remember: make private and public blogs
  // const userId = req.user._id;
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
    const userId = req.user._id;
    const blog = await Blogs.create({ title, body, author, userId });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a blog
app.get("/blogs/:id", async function getBlog(req, res) {
  console.log("get a blog");

  const { id } = req.params;
  // const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blog" });
  }

  try {
    const blog = await Blogs.findById(id);
    if (!blog) return res.status(400).json({ error: "No such blog" });

    // make private and public blogs
    // if (blog.userId != userId)
    //   return res
    //     .status(403)
    //     .json({ error: "You do not have the permission to access this data" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a blog
app.delete("/blogs/:id", async function deleteBlog(req, res) {
  console.log("delete a blog");

  const userId = req.user._id;
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
    res.status(400).json({ error: error.message });
  }
});

// add comment to a blog
app.post("/createComment", async function createComment(req, res) {
  console.log("create a comment");
  const { blogId, body, author } = req.body;

  if (!body || !blogId || !author)
    return res.status(400).json({ error: "Please fill all fields" });
  if (!mongoose.Types.ObjectId.isValid(blogId))
    return res.status(400).json({ error: "invalid id" });
  try {
    const comment = await Comments.create({ body, blogId, author });
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
