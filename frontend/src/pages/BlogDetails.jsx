import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import formatDistantToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDeleteBlog, useGetBlog } from "../hooks/blogsApis";

const BlogDetails = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { owner, isPending, error, blog } = useGetBlog(id, user);
  const { error: deleteError, handleDelete } = useDeleteBlog(
    id,
    user,
    blog?.spaceId,
  );
  if (isPending) return <p className="loading">Loading...</p>;
  console.log(blog);

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
              <ReactMarkdown className="blog-body">{blog.body}</ReactMarkdown>
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
            {owner && <button onClick={handleDelete}>Delete</button>}
            {deleteError && <p className="error">{deleteError}</p>}
          </div>

          <Comments blogId={id} user={user} />
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
