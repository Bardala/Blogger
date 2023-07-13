import { Blog } from "../types";

export interface BlogDao {
  createBlog(blog: Blog): Promise<void>;
  getBlogs(spaceId: string): Promise<Blog[]>;
  getBlog(blogId: string): Promise<Blog | undefined>;
  deleteBlog(blogId: string): Promise<void>;
  // likeBlog(like: Like): Promise<void>;
  getUserBlogs(userId: string): Promise<Blog[]>;
}
