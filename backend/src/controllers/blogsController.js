const User = require("../models/userModel");
const Blogs = require("../models/blogModel");
const Space = require("../models/spaceModel");
const Comments = require("../models/commentModel");
const Likes = require("../models/likesModel");

async function getBlogs() {
  return Blogs.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "blogId",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "blogId",
        as: "comments",
      },
    },
  ]);
}

// done1
const getAllBlogs = async function (req, res) {
  await Blogs.updateMany({}, { $unset: { comments: 1 } });

  const blogs = await getBlogs();
  res.status(200).json({ blogs });
};

// done1
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

// done1
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

// done1
const getBlog = async function (req, res) {
  const { id } = req.params;

  try {
    // const blog = await Blogs.findById(id).populate("comments");
    // if (!blog) return res.status(400).json({ error: "No such blog" });
    // res.status(200).json(blog);
    const blog = await Blogs.findById(id);
    if (!blog) return res.status(400).json({ error: "No such blog" });

    const [likes, comments] = await Promise.all([
      Likes.find({ blogId: id }),
      Comments.find({ blogId: id }),
    ]);

    res.status(200).json({ ...blog._doc, comments, likes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// done1
const deleteBlog = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const blog = await Blogs.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ error: "The blog which try to delete it is not exist" });

    const space = await Space.findById(blog.spaceId);

    if (JSON.stringify(blog.authorId) !== JSON.stringify(user._id))
      return res.status(403).json({ error: "You do not have permission" });

    await Blogs.findOneAndDelete({ _id: id });
    await Comments.deleteMany({ blogId: id });

    await space.blogs.pull(id);
    await space.save();

    await user.blogs.pull(id);
    await user.save();

    res.status(200).json({});
  } catch (error) {
    console.log("error in delete blog", error);
    res.status(400).json({ error: error.message });
  }
};

// done1
const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blogs.findById(id);
    if (!blog) return res.status(400).json({ error: "No such blog" });
    blog.likes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.log("error in like blog", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  likeBlog, // done1
  getAllBlogs, // done1
  createBlog, // done1
  getBlog, // done1
  deleteBlog, // done1
  getBlogsByUsername, // done1
};
