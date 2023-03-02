import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ReadBlog = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  const api = `http://localhost:4000/${id}`;

  useEffect(() => {
    const getBlog = async () => {
      try {
        setIsPending(true);
        const response = await fetch(api);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setBlog(data);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    };
    getBlog()
      .then(() => console.log("Success"))
      .catch((err) => console.log(err.message));
  }, [api]);

  const handleDelete = () => {
    fetch(api, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
      })
      .then(() => nav("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="blog-details">
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <div>Written by {blog.author}</div>
          <p>{blog.body}</p>
        </article>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ReadBlog;
