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

router.get("/blogs", getAllBlogs);
router.get("/personalBlogs/:username", getBlogsByUsername);
router.post("/createBlog", createBlog);
router.get("/blogs/:id", getBlog);
router.delete("/blogs/:id/delete", deleteBlog);

module.exports = router;
