import { RequestHandler } from "express";

export interface Blog {
  id: string;
  title: string;
  content: string;
  userId: string;
  spaceId: string;
}

export interface Comment {
  id: string;
  content: string;
  blogId: string;
  authorId: string;
}

export interface Space {
  id: string;
  name: string;
  status: string;
  description: string;
  ownerId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface Like {
  id: string;
  blogId: string;
  userId: string;
}

export interface JwtObject {
  userId: string;
}

type WithError<T> = T & { error: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
