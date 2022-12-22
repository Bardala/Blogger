import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const ReadBlog = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);
  const nav = useNavigate();

  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => nav("/"));
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
