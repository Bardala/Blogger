import { DataStoreDao } from "..";
import { User, Blog, Comment, Space, Like } from "../types";
import mysql from "mysql2/promise";

export class SqlDataStore implements DataStoreDao {
  private connection: mysql.Connection;

  async runDb() {
    this.connection = await mysql.createConnection({
      host: process.env.MY_SQL_DB_HOST,
      user: process.env.MY_SQL_DB_USER,
      database: process.env.MY_SQL_DB_DATABASE,
      password: process.env.MY_SQL_DB_PASSWORD,
    });

    return this;
  }

  async createUser(user: User): Promise<User | undefined> {
    await this.connection.query(
      `INSERT INTO users (id, username, password, email)
      VALUES
      (?,?,?,?)`,
      [user.id, user.username, user.password, user.email],
    );
    return;
  }

  getUserById(userId: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  async createBlog(blog: Blog): Promise<void> {
    await this.connection.query(
      `
      INSERT INTO blogs (id, title, content, userId, spaceId) 
      VALUES
      (?, ?, ?, ?, ?)
      `,
      [blog.id, blog.title, blog.content, blog.userId, blog.spaceId],
    );
  }

  getSpaceBlogs(spaceId: string): Promise<Blog[]> {
    throw new Error("Method not implemented.");
  }
  getBlog(blogId: string): Promise<Blog | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteBlog(blogId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  likeBlog(blogId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserBlogs(userId: string): Promise<Blog[]> {
    throw new Error("Method not implemented.");
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getComments(blogId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }

  async createSpace(space: Space): Promise<void> {
    await this.connection.query(
      `
      INSERT INTO spaces (description, id, name, ownerId, status)
      VALUES
      (?,?,?,?,?)
    `,
      [space.description, space.id, space.name, space.ownerId, space.status],
    );
  }

  getDefaultSpace(): Promise<Space | undefined> {
    throw new Error("Method not implemented.");
  }
  getSpace(spaceId: string): Promise<Space | undefined> {
    throw new Error("Method not implemented.");
  }
  updateSpace(spaceId: string): Promise<Space | undefined> {
    throw new Error("Method not implemented.");
  }
  joinSpace(memberId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteSpace(spaceId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getSpaces(userId: string): Promise<Space[]> {
    throw new Error("Method not implemented.");
  }
  createLike(like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

// private async runMigration() {
//   const migrationDir = path.join(__dirname, "migrations");

//   fs.readdirSync(migrationDir)
//     .sort()
//     .forEach((file) => {
//       const migrationFilePath = path.join(migrationDir, file);
//       const migrationSql = fs.readFileSync(migrationFilePath, "utf8");

//       this.connection.query(migrationSql, (err) => {
//         if (err) throw err;
//         console.log(`Migration applied: ${file}`);
//       });
//     });
// }
// private async runMigration() {
//   const migrationDir = path.join(__dirname, "migrations");

//   try {
//     // Start a transaction
//     await new Promise<void>((resolve, reject) => {
//       this.connection.beginTransaction((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     // Create a table to store the migration history
//     await new Promise<void>((resolve, reject) => {
//       this.connection.query(
//         "CREATE TABLE IF NOT EXISTS migrations (name VARCHAR(255) PRIMARY KEY, date DATETIME)",
//         (err) => {
//           if (err) reject(err);
//           else resolve();
//         },
//       );
//     });

//     // Read and execute the migration scripts
//     fs.readdirSync(migrationDir)
//       .sort()
//       .forEach(async (file) => {
//         const migrationFilePath = path.join(migrationDir, file);
//         const migrationSql = fs.readFileSync(migrationFilePath, "utf8");

//         // Check if the migration script has already been applied
//         const result = await new Promise((resolve, reject) => {
//           this.connection.query(
//             "SELECT * FROM migrations WHERE name = ?",
//             [file],
//             (err, rows) => {
//               if (err) reject(err);
//               else resolve(rows);
//             },
//           );
//         });

//         // If not, execute the script and insert a row into the migrations table
//         if (result.length === 0) {
//           await new Promise<void>((resolve, reject) => {
//             this.connection.query(migrationSql, (err) => {
//               if (err) reject(err);
//               else resolve();
//             });
//           });

//           await new Promise<void>((resolve, reject) => {
//             this.connection.query(
//               "INSERT INTO migrations (name, date) VALUES (?, NOW())",
//               [file],
//               (err) => {
//                 if (err) reject(err);
//                 else resolve();
//               },
//             );
//           });

//           console.log(`Migration applied: ${file}`);
//         } else {
//           console.log(`Migration skipped: ${file}`);
//         }
//       });

//     // Commit the transaction
//     await new Promise<void>((resolve, reject) => {
//       this.connection.commit((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });
//   } catch (error) {
//     // Catch any errors and log them
//     console.error(error);

//     // Rollback the transaction
//     await new Promise<void>((resolve, reject) => {
//       this.connection.rollback((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });
//   } finally {
//     // Close the connection
//     await new Promise<void>((resolve, reject) => {
//       this.connection.end((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });
//   }
// }

// async runDb() {
//   // Call the runMigration() method to perform the initial migration
//   await this.runMigration();
//   return this;
//   // Your other code logic here
// }
