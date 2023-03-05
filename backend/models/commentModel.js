const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
  },
  { timesTamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);
