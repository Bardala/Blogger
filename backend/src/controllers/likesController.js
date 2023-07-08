const likes = require("../models/likesModel");
const blogs = require("../models/blogModel");

const postOrDeleteLike = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user._id;

  const blog = await blogs.findById(blogId);
  if (!blog) {
    return res.status(404).json({ error: "blog not found" });
  }
  const like = await likes.findOne({ userId, blogId });
  if (like) {
    await likes.findByIdAndDelete(like._id);
  } else {
    await likes.create({
      blogId,
      userId,
    });
  }
  res.sendStatus(200);
};

module.exports = { postOrDeleteLike };
