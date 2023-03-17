import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const CreateBlog = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const url = "http://localhost:4000/createBlog";
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    let emptyFields = [];
    if (title.trim() === "") emptyFields.push("title");
    if (body.trim() === "") emptyFields.push("body");
    if (emptyFields.length > 0) {
      setError(`Please fill : ${emptyFields.join(", ")}`);
      setIsPending(false);
      return;
    }

    const postBlog = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          mode: "cors",
          body: JSON.stringify({ title, body, author: user.username }),
        });
        const data = await res.json();

        if (res.ok) {
          setIsPending(false);
          console.log("new blog added");
          nav("/");
        } else {
          setError(data.error);
          console.log(data.error);
          setIsPending(false);
        }
      } catch (error) {
        setError("Connection Error: " + error.message);
      }
    };

    if (user) postBlog();
  };

  return (
    <div className="create">
      <h4>Add a New Blog</h4>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          // required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog body:</label>
        <textarea
          // required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button disabled={isPending}>Add Blog</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
