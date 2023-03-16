import { useState, useEffect } from "react";
import { useCommentContext } from "../context/CommentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistantToNow from "date-fns/formatDistanceToNow";

const Comments = (props) => {
  const { user } = useAuthContext();
  const { blogId } = props;
  const [commentBody, setCommentBody] = useState();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { comments, dispatchComments } = useCommentContext();

  const url = `http://localhost:4000/createComment`;
  const commentsURL = `http://localhost:4000/getComments?blogId=${blogId}`;

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(commentsURL, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatchComments({ type: "GET-COMMENTS", payload: data });
        console.log("Response of getComments");
      } else console.log(data.error);
    };

    if (!error) getComments();
  }, [commentsURL, dispatchComments, user, error]);

  const postComment = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    if (commentBody.trim() === "") {
      setError(
        "Please fill the comment field, you can't post an empty comment"
      );
      setCommentBody("");
      setIsPending(false);
      return;
    }

    if (!user) {
      setError("You must me logged in");
      setIsPending(false);
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        body: commentBody,
        blogId,
        author: user.username,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsPending(false);
      dispatchComments({ type: "CREATE-COMMENT", payload: data });
      setCommentBody("");
      console.log("Success: new comment added");
    } else {
      setIsPending(false);
      setError(data.error);
      console.log(data.error);
    }
  };

  return (
    <div className="blog-comments">
      <form onSubmit={postComment} className="create-comment">
        <p>Create Comment</p>
        <textarea
          placeholder="write your comment"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        ></textarea>
        <button className="add-comment" disabled={isPending}>
          Add comment
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="comments">
        <p>Comments</p>
        {comments &&
          comments.map((comment) => (
            <div className="comment" key={comment._id}>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-author">{comment.author}</p>
              <p className="created-at">
                {formatDistantToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Comments;
