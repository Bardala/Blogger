import { Comment } from "../types";

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  getComments(blogId: string): Promise<Comment[]>;
}
