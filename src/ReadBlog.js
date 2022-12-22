import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const ReadBlog = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);

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
    </div>
  );
};

export default ReadBlog;
