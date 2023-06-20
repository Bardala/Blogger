const mongoose = require("mongoose");
const crypto = require("crypto");
const date = new Date();
const Schema = mongoose.Schema;

const spaceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // state is a string that can be either "public" or "private"
  state: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adminId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  ],
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  invitationKey: {
    type: String,
    default: () => {
      return crypto.randomBytes(16).toString("hex");
    },
  },
  expirationDate: {
    type: Date,
    default: () => {
      date.setDate(date.getDate() + 3);
      return date;
    },
  },
});

spaceSchema.pre("save", function (next) {
  if (!this.adminId.includes(this.ownerId)) this.adminId.push(this.ownerId);
  next();
});

spaceSchema.pre("save", function (next) {
  for (let admin of this.adminId) {
    if (!this.members.includes(admin)) this.members.push(admin);
  }
  next();
});

module.exports = mongoose.model("Space", spaceSchema);
