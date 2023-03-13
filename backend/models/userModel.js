const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error("All fields must be fields");
  if (!validator.isEmail(email)) throw Error("Invalid Email");
  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");
  const exists = await this.findOne({ email });
  if (exists) throw Error("Email already exist");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields must be fields");
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password");
  return user;
};

module.exports = mongoose.model("User", UserSchema);
