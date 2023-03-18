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
  const [owner, setOwner] = useState(false);
  const blogsURL = `http://localhost:4000/api/blogs/${id}`;

  useEffect(() => {
    const getBlog = async () => {
      try {
        setIsPending(true);
        const response = await fetch(blogsURL, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "GET-BLOG", payload: data });
          if (data.author === user.username) setOwner(true);
          // console.log(data, user);
          // console.log("Response of getBlog");
        } else {
          setError(data.error);
          // console.log(data.error);
        }
      } catch (error) {
        setError("Connection Error: " + error.message);
      } finally {
        setIsPending(false);
      }
    };

    if (user) getBlog();
  }, [blogsURL, dispatch, user]);

  const handleDelete = async (e) => {
    e.preventDefault();

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
      if (response.ok) {
        console.log("the blog is deleted");
        nav("/");
      } else {
        setError(data.error);
        console.log(data.error);
      }
    } catch (error) {
      setError("Connection Error: " + error.message);
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
            {owner && <button onClick={handleDelete}>Delete</button>}
          </div>

          <Comments blogId={id} user={user} />
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
