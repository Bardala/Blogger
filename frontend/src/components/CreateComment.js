import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateComment = (props) => {
  const { blogId } = props;
  const [commentBody, setCommentBody] = useState();
  const url = `http://localhost:4000/createComment`;
  const nav = useNavigate();

  const postComment = async () => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: commentBody, blogId }),
    });
    if (!response.ok) return response.statusText;
    else console.log("Success: new comment added");
    nav(`/blogs/${blogId}`);
  };

  return (
    <div className="create-comment">
      <form onSubmit={postComment}>
        <p>Create Comment</p>
        <textarea
          required
          placeholder="write your comment"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        ></textarea>
        <button className="add-comment">Add comment</button>
      </form>
    </div>
  );
};
export default CreateComment;
