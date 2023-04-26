import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const BlogList = ({ blogs }) => {
  console.log(blogs);

  function formateComments(blog) {
    const authors = blog.comments.map((comment) => comment.author);
    const uniqueAuthors = [...new Set(authors)];

    switch (uniqueAuthors.length) {
      case 0:
        return "No comments";
      case 1:
        return `${uniqueAuthors[0]} commented`;
      case 2:
        return `${uniqueAuthors[0]} and ${uniqueAuthors[1]} commented`;
      default:
        return `${uniqueAuthors[0]} and ${
          uniqueAuthors.length - 1
        } others commented`;
    }
  }

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
                <Link to={`/blogs/${blog._id}`} className="blog-link" />
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
