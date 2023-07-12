// import {
//   createBlog,
//   createSpace,
//   createUser,
//   getBlog,
// } from "./controllers/test.controller";
import { db, initDb } from "./dataStore";
import { UserController } from "./src/controllers/user.controller";
import { errorHandler } from "./src/middleware/errorHandler";
import dotenv from "dotenv";
import express from "express";
import asyncHandler from "express-async-handler";

(async () => {
  dotenv.config();
  await initDb();

  const app = express();
  const port = 4001;

  app.use(express.json());

  const userController = new UserController(db);

  app.post("/v0/user", asyncHandler(userController.signUp));
  // app.post("/v0/space", asyncHandler(createSpace));
  // app.post("/v0/blog", asyncHandler(createBlog));
  // app.get("/v0/blog/:id", asyncHandler(getBlog));

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
