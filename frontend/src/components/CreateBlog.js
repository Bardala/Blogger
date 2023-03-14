import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const CreateBlog = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const blog = { title, body, author };
  const [isPending, setIsPending] = useState(false);
  const url = "http://localhost:4000/createBlog";
  const nav = useNavigate();

  useEffect(() => {
    if (!user) {
      setError("You must me logged in");
      nav("/NotFound");
      return;
    }
  }, [nav, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      mode: "cors",
      body: JSON.stringify(blog),
    })
      .then(() => {
        setIsPending(false);
        nav("/");
        console.log("new blog added");
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="create">
      <h4>Add a New Blog</h4>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label>Blog author:</label>
        <textarea
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></textarea>
        <button disabled={isPending}>Add Blog</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
