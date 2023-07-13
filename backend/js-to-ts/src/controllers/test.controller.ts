import {
  BlogReq,
  BlogRes,
  CreateBlogReq,
  CreateBlogRes,
  CreateSpaceReq,
  CreateSpaceRes,
  SignUpReq,
  SignUpRes,
} from "../../api.types";
import { db } from "../../dataStore";
import {
  Blog,
  Handler,
  HandlerWithParams,
  Space,
  User,
} from "../../dataStore/types";
import { Errors } from "../../errors";
import crypto from "crypto";

export const getBlog: HandlerWithParams<
  { id: string },
  BlogReq,
  BlogRes
> = async (req, res) => {
  if (!req.params.id)
    return res.status(400).send({ error: Errors.POST_ID_MISSING });
  return res.send({ blog: await db.getBlog(req.params.id) });
};

export const createBlog: Handler<CreateBlogReq, CreateBlogRes> = async (
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
    userId: crypto.randomUUID(),
  };

  await db.createBlog(blog);
  return res.sendStatus(200);
};

export const createSpace: Handler<CreateSpaceReq, CreateSpaceRes> = async (
  req,
  res,
) => {
  const { name, status, description } = req.body;

  if (!name || !status || !description) throw new Error("All Fields Required");

  const space: Space = {
    status,
    name,
    description,
    ownerId: "2",
    id: crypto.randomUUID(),
  };
  await db.createSpace(space);

  return res.sendStatus(200);
};

export const createUser: Handler<SignUpReq, SignUpRes> = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) throw new Error("All Fields Required");

  const user: User = {
    email,
    password,
    username,
    id: crypto.randomUUID(),
  };

  await db.createUser(user);
  return res.sendStatus(200);
};

// export const getUser: ExpressHandler<>
