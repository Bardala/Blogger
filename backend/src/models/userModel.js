const Space = require("./spaceModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    spaces: [{ type: Schema.Types.ObjectId, ref: "Space" }],
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

UserSchema.statics.signup = async function (username, email, password) {
  if (!email || !password || !username)
    throw Error("All fields must be filled");
  if (!validator.isAlphanumeric(username)) throw Error("Invalid Username");
  if (!validator.isEmail(email)) throw Error("Invalid Email");
  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");
  const exists = await this.findOne({ email });
  const existsUsername = await this.findOne({ username });
  if (exists) throw Error("Email is in use, please try another one");
  if (existsUsername) throw Error("Username is in use, please try another one");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });
  await addUserToDefaultSpace(user);
  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled");
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password");
  return user;
};

async function addUserToDefaultSpace(user) {
  const space = await Space.findByIdAndUpdate(
    "646c1929ebba035de6f2208c",
    { $push: { members: user._id } },
    { new: true },
  );

  if (!space) throw Error("Default space not found");

  user.spaces.push(space._id);
  await user.save();
}
module.exports = mongoose.model("User", UserSchema);
