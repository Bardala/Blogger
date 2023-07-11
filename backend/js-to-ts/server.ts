import {
  CreateBlogReq,
  CreateBlogRes,
  CreateSpaceReq,
  CreateSpaceRes,
  SignUpReq,
  SignUpRes,
} from "./api.types";
import { dataStore, initDb } from "./dataStore";
import { Blog, ExpressHandler, Space, User } from "./dataStore/types";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
import express from "express";
import asyncHandler from "express-async-handler";

(async () => {
  dotenv.config();
  await initDb();

  const app = express();
  const port = 4001;

  app.use(express.json());

  const createBlog: ExpressHandler<CreateBlogReq, CreateBlogRes> = async (
    req,
    res,
  ) => {
    const { content, title, spaceId } = req.body;

    if (!content || !title || !spaceId) return res.sendStatus(400);

    const blog: Blog = {
      content,
      title,
      spaceId,
      id: "1",
      userId: "2",
    };

    await dataStore.createBlog(blog);
    res.sendStatus(200);
  };

  const createSpace: ExpressHandler<CreateSpaceReq, CreateSpaceRes> = async (
    req,
    res,
  ) => {
    const { name, status, description } = req.body;

    if (!name || !status || !description)
      throw new Error("All Fields Required");

    const space: Space = {
      status,
      name,
      description,
      ownerId: "2",
      id: "1",
    };
    await dataStore.createSpace(space);

    return res.sendStatus(200);
  };

  const createUser: ExpressHandler<SignUpReq, SignUpRes> = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      throw new Error("All Fields Required");

    const user: User = {
      email,
      password,
      username,
      id: "2",
    };

    await dataStore.createUser(user);
    res.sendStatus(200);
  };

  app.post("/v0/user", asyncHandler(createUser));
  app.post("/v0/space", asyncHandler(createSpace));
  app.post("/v0/blog", asyncHandler(createBlog));

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
