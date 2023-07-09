import { Blog, Like, Space, User } from "../types";

export interface UserDao {
  createUser(user: User): Promise<User | undefined>;
  getUserById(userId: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
}

export interface BlogDao {
  createBlog(blog: Blog): Promise<void>;
  getSpaceBlogs(spaceId: string): Promise<Blog[]>;
  getBlog(blogId: string): Promise<Blog | undefined | undefined>;
  deleteBlog(blogId: string): Promise<void>;
  likeBlog(blogId: string): Promise<void>;
  getUserBlogs(userId: string): Promise<Blog[]>;
}

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  getComments(blogId: string): Promise<Comment[]>;
}

export interface LikeDao {
  createLike(like: Like): Promise<void>;
}

export interface SpaceDao {
  createSpace(space: Space): Promise<void>;
  getDefaultSpace(): Promise<Space | undefined>;
  getSpace(spaceId: string): Promise<Space | undefined>;
  updateSpace(spaceId: string): Promise<Space | undefined>;
  joinSpace(memberId: string): Promise<void>;
  // addUser(memberId: string): Promise<void>
  deleteSpace(spaceId: string): Promise<void>;
  getSpaces(userId: string): Promise<Space[]>;
}
