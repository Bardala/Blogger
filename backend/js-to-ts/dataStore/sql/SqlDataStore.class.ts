import { DataStoreDao } from "..";
import { User, Blog, Comment, Space, Like } from "../types";
import mysql, { RowDataPacket } from "mysql2";
import { Pool } from "mysql2/promise";

export class SqlDataStore implements DataStoreDao {
  private pool!: Pool;

  async runDB() {
    this.pool = mysql
      .createPool({
        host: process.env.MY_SQL_DB_HOST,
        user: process.env.MY_SQL_DB_USER,
        database: process.env.MY_SQL_DB_DATABASE,
        password: process.env.MY_SQL_DB_PASSWORD,
      })
      .promise();

    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.pool.query<RowDataPacket[]>(
      "INSERT INTO users SET id=?, username=?, password=?, email=?",
      [user.id, user.username, user.password, user.email],
    );
  }

  async getUserById(userId: string): Promise<User | undefined> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE id = ?`,
      [userId],
    );
    return rows[0] as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );

    return rows[0] as User;
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    return rows[0] as User;
  }

  async createBlog(blog: Blog): Promise<void> {
    await this.pool.query(
      "INSERT INTO blogs SET id=?, title=?, content=?, userId=?, spaceId=?",
      [blog.id, blog.title, blog.content, blog.userId, blog.spaceId],
    );
  }

  async getSpaceBlogs(spaceId: string): Promise<Blog[]> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "SELECT * FROM blogs WHERE spaceId = ?",
      [spaceId],
    );
    return rows as Blog[];
  }

  async getBlog(blogId: string): Promise<Blog | undefined> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "SELECT * FROM blogs WHERE id=?",
      [blogId],
    );
    return rows[0] as Blog;
  }

  async deleteBlog(blogId: string): Promise<void> {
    await this.pool.query<RowDataPacket[]>("DELETE FROM blogs WHERE id=?", [
      blogId,
    ]);
  }

  async getUserBlogs(userId: string): Promise<Blog[]> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "SELECT * FROM blogs WHERE userId = ?",
      [userId],
    );
    return rows[0] as Blog[];
  }

  async createComment(comment: Comment): Promise<void> {
    await this.pool.query<RowDataPacket[]>(
      "INSERT INTO comments SET id=?, blogId=?, userId=?, content=?",
      [comment.id, comment.blogId, comment.authorId, comment.content],
    );
  }

  async getComments(blogId: string): Promise<Comment[]> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "SELECT * FROM comments WHERE blogId = ?",
      [blogId],
    );
    return rows[0] as Comment[];
  }

  async createSpace(space: Space): Promise<void> {
    await this.pool.query(
      "INSERT INTO spaces SET description=?, id=?, name=?, ownerId=?, status=?",
      [space.description, space.id, space.name, space.ownerId, space.status],
    );
  }

  getDefaultSpace(): Promise<Space | undefined> {
    throw new Error("Method not implemented.");
  }

  async getSpace(spaceId: string): Promise<Space | undefined> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "SELECT * FROM spaces WHERE id = ?",
      [spaceId],
    );
    return rows[0] as Space;
  }

  async updateSpace(space: Space): Promise<Space | undefined> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "UPDATE spaces SET name=?, status=?, description=? WHERE id=?",
      [space.name, space.status, space.description, space.id],
    );
    return rows[0] as Space;
  }

  async joinSpace(spaceId: string, memberId: string): Promise<void> {
    await this.pool.query<RowDataPacket[]>(
      "UPDATE spaces SET members = members + ? WHERE id = ?",
      [memberId, spaceId],
    );
  }

  async deleteSpace(spaceId: string): Promise<void> {
    await this.pool.query<RowDataPacket[]>("DELETE FROM spaces WHERE id=?", [
      spaceId,
    ]);
  }

  async getSpaces(userId: string): Promise<Space[]> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      "SELECT * FROM spaces WHERE userId = ?",
      userId,
    );
    return rows[0] as Space[];
  }

  async createLike(like: Like): Promise<void> {
    await this.pool.query<RowDataPacket[]>(
      "INSERT INTO likes id=?, blogId=?, userId=?",
      [like.id, like.blogId, like.userId],
    );
  }
}
