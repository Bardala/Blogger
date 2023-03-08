import { useState } from "react";
import { useCommentContext } from "../context/CommentsContext";

const CreateComment = (props) => {
  const { blogId } = props;
  const [commentBody, setCommentBody] = useState();
  const { dispatchComments } = useCommentContext();
  const url = `http://localhost:4000/createComment`;

  const postComment = async (e) => {
    e.preventDefault();

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
        <button className="add-comment">Add comment</button>
      </form>
    </div>
  );
};
export default CreateComment;
