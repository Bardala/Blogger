import { useState } from "react";
import { useCommentContext } from "../context/CommentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateComment = (props) => {
  const { user } = useAuthContext();
  const { blogId } = props;
  const [commentBody, setCommentBody] = useState();
  const [error, setError] = useState(null);
  const { dispatchComments } = useCommentContext();
  const url = `http://localhost:4000/createComment`;

  const postComment = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must me logged in");
      return;
    }
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ body: commentBody, blogId }),
    });

    const data = await response.json();

    if (response.ok) {
      dispatchComments({ type: "CREATE-COMMENT", payload: data });
      setCommentBody("");
      console.log("Success: new comment added");
    } else return response.statusText;
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
        {error && <p className="error">{error}</p>}
        <button className="add-comment">Add comment</button>
      </form>
    </div>
  );
};
export default CreateComment;
