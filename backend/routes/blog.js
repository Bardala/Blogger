const {
  getAllBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  // getBlogsByUserId,
  getBlogsByUsername,
  addAuthorName,
} = require("../controllers/blogsController");
const express = require("express");
const router = express.Router();

// get all blogs
router.get("/blogs", getAllBlogs);
// router.get("/personalBlogs/:id", getBlogsByUserId);
router.get("/personalBlogs/:username", getBlogsByUsername);
// post a blog
router.post("/createBlog", createBlog);
// get a blog
router.get("/blogs/:id", getBlog);
// delete a blog
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
