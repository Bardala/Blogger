const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "Authorization token required" });
  // console.log(authorization);
  const token = authorization.split(" ")[1];
  // console.log("token = ", token);
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id });
    // console.log("requireAuth req.user = ", req.user);
    next();
  } catch (error) {
    res.status(400).json({ error: "Request is not authorized" });
  }
};

module.exports = { requireAuth };
