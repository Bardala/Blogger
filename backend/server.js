require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { requireAuth } = require("./middleware/requireAuth");

const userRouts = require("./routes/user");
const commentsRouts = require("./routes/comments");
const blogRouts = require("./routes/blog");
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Connect to database & listening on port", process.env.PORT)
    );
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", userRouts);
app.use(requireAuth);
app.use("/api", blogRouts);
app.use("/api", commentsRouts);
