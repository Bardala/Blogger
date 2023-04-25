import Markdown from "markdown-to-jsx";
import { useCreateBlog } from "../hooks/blogsApis";

const CreateBlog = () => {
  const { handleSubmit, title, setTitle, body, setBody, error, isPending } =
    useCreateBlog();

  return (
    <div className="create">
      <h4>Add a New Blog</h4>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog body:</label>
        <Markdown>{body}</Markdown>

        <textarea
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
