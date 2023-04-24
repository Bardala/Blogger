import { Link } from "react-router-dom";
import formatDistantToNow from "date-fns/formatDistanceToNow";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
            <p>written by {blog.author}</p>
            <p className="created-at">
              {formatDistantToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
