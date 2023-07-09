import "../styles/blogList.css";
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import LikeBlogButton from "./LikeButton";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <div className="blog-content">
            <Link to={`/blogs/${blog._id}`} className="blog-link">
              <div className="blog-header">
                <h2>{blog.title}</h2>
              </div>
            </Link>

            <div className="blog-meta">
              <p className="author">
                <strong>{blog.author}</strong>
              </p>
              <p className="comments-count">{blog.comments.length} comments</p>

              <LikeBlogButton blog={blog} />

              <p className="created-at">
                {formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div className="blog-excerpt">
              <Markdown>{blog.body.slice(0, 600) + "..."}</Markdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
