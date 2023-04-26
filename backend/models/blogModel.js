const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    // state:{
    //   type: String,
    //   required: true,
    // },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
