import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`/blogs/${blog._id}`} className="blog-link">
            <div className="blog-header">
              <h2>{blog.title}</h2>
              <div className="blog-meta">
                <p className="author">
                  By <strong>{blog.author}</strong>
                </p>
                <p className="comments-count">{formateComments(blog)}</p>
                <p className="created-at">
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

function formateComments(blog) {
  const commentsLength = blog.comments.length;
  switch (commentsLength) {
    case 0:
      return "No comments";
    case 1:
      return `1 comment`;
    default:
      return `${commentsLength} comments`;
  }
}
