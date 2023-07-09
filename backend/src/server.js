require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const spaceRoutes = require("./routes/space");
const commentsRouts = require("./routes/comments");
const blogRouts = require("./routes/blog");
const userRoutes = require("./routes/user");
const middleware = require("./routes/middleware");
const asyncHandler = require("express-async-handler");
const { errorHandler } = require("./middleware/errorHandler");
// const likesRoutes = require("./routes/likes");
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Connect to database & listening on port", process.env.PORT),
    );
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method, req.body, req.params, res.statusCode);
  next();
});

app.use("/api", authRoutes);
app.use(middleware);
// app.use("/api", asyncHandler(likesRoutes));
app.use("/api", spaceRoutes);
app.use("/api", blogRouts);
app.use("/api", commentsRouts);
app.use("/api", userRoutes);
app.use("/api", userRoutes);

app.use(errorHandler);
