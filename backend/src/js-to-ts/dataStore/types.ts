import { RequestHandler } from "express";

// done
export interface Blog {
  id: string;
  title: string;
  content: string;
  userId: string;
  spaceId: string;
  // comments: string[]
  timestamp: any;
}

// done
export interface Comment {
  id: string;
  content: string;
  blogId: string;
  authorId: string;
  timestamp: any;
}

// done
export interface Space {
  id: string;
  name: string;
  status: string;
  description: string;
  ownerId: string;
  timestamp: any;
  // admins: Pick<User, "username">[];
  // members: Pick<User, "username">[];
  // blogsId: string[];
}

//done
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
