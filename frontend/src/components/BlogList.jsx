import "../styles/blogList.css";

import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <div className="blog-content">
            <Link to={`/blogs/${blog._id}`} className="blog-link">
              <div className="blog-header">
                <h2>{blog.title}</h2>
                <div className="blog-meta">
                  <p className="author">
                    By <strong>{blog.author}</strong>
                  </p>
                  <p className="comments-count">
                    {blog.comments.length} comments
                  </p>
                  <p className="likes-count">{blog.likes} likes</p>
                  <p className="created-at">
                    {formatDistanceToNow(new Date(blog.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
            <div className="blog-excerpt">
              {blog.body.slice(0, 100) + "..."}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
