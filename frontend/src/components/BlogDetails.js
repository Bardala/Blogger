import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import { useBlogContext } from "../hooks/useBlogContext";
import { useCommentContext } from "../hooks/useCommentContext";
import formatDistantToNow from "date-fns/formatDistanceToNow";

const BlogDetails = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { blog, dispatch } = useBlogContext();
  const { comments, dispatchComments } = useCommentContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();

  const blogsURL = `http://localhost:4000/blogs/${id}`;
  const commentsURL = `http://localhost:4000/getComments?blogId=${id}`;

  useEffect(() => {
    const getBlog = async () => {
      try {
        setIsPending(true);
        const response = await fetch(blogsURL);
        if (!response.ok) throw new Error(response.statusText);
        else console.log("Response of getBlog");
        const data = await response.json();
        dispatch({ type: "GET-BLOG", payload: data });
        setIsPending(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    };
    getBlog();
  }, [blogsURL, dispatch]);

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(commentsURL, {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      if (response.ok) console.log("Response of getComments");
      else return console.log(data.error);
      dispatchComments({ type: "GET-COMMENTS", payload: data });
    };

    getComments();
  }, [commentsURL, dispatchComments, id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(blogsURL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      });
      if (!response.ok) console.log(response.json().error);
      else console.log("the blog is deleted");
    } catch (error) {
      console.log(error);
    } finally {
      nav("/");
    }
  };

  return (
    <div className="blog-details">
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {blog && (
        <div>
          <div className="blog-content">
            <article>
              <h2>{blog.title}</h2>
              <div>
                Written by <strong>{blog.author}</strong>
              </div>
              <p className="blog-body">{blog.body}</p>
              <p className="created-at">
                {formatDistantToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </article>
            <button onClick={handleDelete}>Delete</button>
          </div>

          <div className="blog-comments">
            <CreateComment blogId={id} />

            <div className="comments">
              <p>Comments</p>
              {comments &&
                comments.map((comment) => (
                  <div className="comment" key={comment._id}>
                    <p className="comment-body">{comment.body}</p>
                    <p className="created-at">
                      {formatDistantToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
