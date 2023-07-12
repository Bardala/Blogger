import { RequestHandler } from "express";

export interface Blog {
  id: string;
  title: string;
  content: string;
  userId: string;
  spaceId: string;
  timestamp?: string;
}

export interface Comment {
  id: string;
  content: string;
  blogId: string;
  authorId: string;
  timestamp?: string;
}

export interface Space {
  id: string;
  name: string;
  status: string;
  description: string;
  ownerId: string;
  timestamp?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  timestamp?: string;
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

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>
>;