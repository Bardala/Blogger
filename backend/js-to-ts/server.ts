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

  app.post("/api/v0/signup", asyncHandler(userController.signup));
  app.post("/api/v0/login", asyncHandler(userController.login));
  app.get("/api/v0/getUsersList", asyncHandler(userController.getUsersList));

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
