import { Blog } from "../types";

export interface BlogDao {
  createBlog(blog: Blog): Promise<void>;
  getSpaceBlogs(spaceId: string): Promise<Blog[]>;
  getBlog(blogId: string): Promise<Blog | undefined | undefined>;
  deleteBlog(blogId: string): Promise<void>;
  likeBlog(blogId: string): Promise<void>;
  getUserBlogs(userId: string): Promise<Blog[]>;
}
