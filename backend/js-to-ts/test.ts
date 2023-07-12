import mysql, { RowDataPacket } from "mysql2";
import { Pool } from "mysql2/promise";

(async () => {
  const pool: Pool = mysql.createPool({}).promise();

  async function getBlogs(_spaceId: string) {
    const [blogs] = await pool.query<RowDataPacket[]>("");
    return blogs;
  }

  const blogs = await getBlogs("1");
  console.log(blogs);
})();
