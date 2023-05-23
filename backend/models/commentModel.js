const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      validate: {
        validator: (val) => val >= 0,
        message: "Like values can't be negative",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
