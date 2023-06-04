import "../styles/createBlog.css";
import Markdown from "markdown-to-jsx";
import { useCreateBlog } from "../hooks/blogsApis";
import { useEffect } from "react";

const CreateBlog = () => {
  const {
    handleSubmit,
    title,
    setTitle,
    setSpaceTitle,
    spaceTitle,
    spaces,
    body,
    setBody,
    error,
    isPending,
  } = useCreateBlog();

  useEffect(() => console.log(spaceTitle), [spaceTitle]);

  return (
    <div className="create">
      <h4>Add a New Blog</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="title-label">Blog Title:</label>

        <input
          className="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="body-label">Blog body:</label>
        <Markdown>{body}</Markdown>

        <textarea
          className="body-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label className="space-label">select Space</label>
        <select
          className="space-list"
          value={spaceTitle}
          onChange={(e) => {
            setSpaceTitle(e.target.value);
            // setSpaceTitle(e.target.options[e.target.selectedIndex].text);
          }}
        >
          {spaces &&
            Object.keys(spaces).map((key) => (
              <option key={spaces[key]._id} value={spaces[key].title}>
                {spaces[key].title}
              </option>
            ))}
        </select>

        <button disabled={isPending}>Add Blog</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
