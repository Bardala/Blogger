const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const likesSchema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Likes", likesSchema);
