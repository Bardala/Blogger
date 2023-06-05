// import "../styles/blogDetails.css";

import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import formatDistantToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import Markdown from "markdown-to-jsx";
import BlogDetailsAction from "../components/BlogDetailsAction";
import { useGetBlog } from "../hooks/blogsApis";

const BlogDetails = () => {
  const { user } = useAuthContext();
  console.log("user", user);
  const { id } = useParams();
  const { owner, isPending, error, blog } = useGetBlog(id, user);

  if (isPending) return <p className="loading">Loading...</p>;
  console.log(blog);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="blog-details">
      {error && <p className="error">{error}</p>}
      {blog && (
        <div>
          <div className="blog-content">
            <article>
              <h2>{blog.title}</h2>
              <div className="author-name">
                Written by{" "}
                <Link to={`/users/${blog.author}`}>
                  <strong>{blog.author}</strong>
                </Link>
              </div>
              <Markdown className="blog-body">{blog.body}</Markdown>

              <div className="blog-meta">
                <p className="created-at">
                  {formatDistantToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </p>

                <p className="comments-counts">
                  {" "}
                  {blog.comments.length} comments
                </p>
              </div>
            </article>

            <BlogDetailsAction blog={blog} owner={owner} user={user} />
          </div>

          {user && <Comments blogId={id} user={user} />}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
