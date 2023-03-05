import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";

const ReadBlog = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [comments, setComments] = useState([]);
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
        setBlog(data);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    };
    getBlog();
  }, [blogsURL]);

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(commentsURL, {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      if (response.ok) console.log("Response of getComments");
      else return console.log(data.error);
      setComments(data);
    };

    getComments();
  }, [commentsURL, id]);

  const handleDelete = () => {
    // remember you need to delete its comments also
    fetch(blogsURL, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) setError(res.json().error);
      })
      .then(() => nav("/"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="blog-details">
        {error && <p>{error}</p>}
        {isPending && <p>Loading...</p>}
        {blog && (
          <div>
            <article>
              <h2>{blog.title}</h2>
              <div>Written by {blog.author}</div>
              <p>{blog.body}</p>
            </article>
            <button onClick={handleDelete}>Delete</button>
            <CreateComment blogId={id} />

            <div className="comments">
              <p>Comments</p>
              {comments.length > 0 && (
                <div>
                  {comments.map((comment) => (
                    <div className="comment" key={comment._id}>
                      <p>{comment.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadBlog;
