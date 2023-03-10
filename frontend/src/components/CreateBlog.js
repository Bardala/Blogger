import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const blog = { title, body, author };
  const [isPending, setIsPending] = useState(false);
  const url = "http://localhost:4000/createBlog";
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPending(true);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(blog),
    }).then(() => {
      setIsPending(false);
      nav("/");
      console.log("new blog added");
    });
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
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default CreateBlog;
