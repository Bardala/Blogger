import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "../components/Comments";
import { useBlogContext } from "../hooks/useBlogContext";
import formatDistantToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const BlogDetails = () => {
  const { user } = useAuthContext();

  const nav = useNavigate();
  const { id } = useParams();
  const { blog, dispatch } = useBlogContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  const blogsURL = `http://localhost:4000/blogs/${id}`;

  useEffect(() => {
    const getBlog = async () => {
      try {
        setIsPending(true);
        const response = await fetch(blogsURL, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "GET-BLOG", payload: data });
          console.log("Response of getBlog");
        } else {
          setError(data.error);
          console.log(data.error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    };
    getBlog();
  }, [blogsURL, dispatch, user]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must me logged in");
      return;
    }
    try {
      const response = await fetch(blogsURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        mode: "cors",
      });
      const data = response.json();
      if (response.ok) console.log("the blog is deleted");
      else console.log(data.error);
    } catch (error) {
      console.log(error);
    } finally {
      nav("/");
    }
  };

  return (
    <div className="blog-details">
      {error && <p className="error">{error}</p>}
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

          <Comments blogId={id} />
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
