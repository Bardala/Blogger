import { db, initDb } from "./dataStore";
import { UserController } from "./src/controllers/user.controller";
import { requireAuth } from "./src/middleware/authMiddleware";
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

  // *Auth Routes
  app.post("/api/v0/signup", asyncHandler(userController.signup));
  app.post("/api/v0/login", asyncHandler(userController.login));

  app.use(requireAuth);

  // *User Routes
  app.get("/api/v0/getUserCard/:id", asyncHandler(userController.getUserCard));
  app.post("/api/v0/followUser/:id", asyncHandler(userController.createFollow));
  app.delete(
    "/api/v0/unFollowUser/:id",
    asyncHandler(userController.deleteFollow),
  );
  app.get(
    "/api/v0/getFollowers/:id",
    asyncHandler(userController.getFollowers),
  );
  app.get("/api/v0/usersList", asyncHandler(userController.getUsersList));
  app.get("/api/v0/getUserCard/:id", asyncHandler(userController.getUserCard));

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
