import formatDistantToNow from "date-fns/formatDistanceToNow";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useCreateComment, useGetComments } from "../hooks/commentsHooks";

const Comments = (props) => {
  const { blogId, user } = props;
  const { comments, error, isLoading } = useGetComments(blogId, user);
  const {
    commentBody,
    setCommentBody,
    handleSubmit,
    error: createCommentError,
    isPending,
  } = useCreateComment(blogId, user);

  return (
    <div className="blog-comments">
      <form onSubmit={handleSubmit} className="create-comment">
        <p>Create Comment</p>
        <textarea
          placeholder="write your comment"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        ></textarea>
        <button className="add-comment" disabled={isPending}>
          Add comment
        </button>
      </form>
      {createCommentError && <p className="error">{createCommentError}</p>}
      {error && <p className="error">{error}</p>}

      <div className="comments">
        <p>Comments</p>
        {isLoading ? (
          <p>Loading comments...</p>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment._id}>
              <ReactMarkdown className="comment-body">
                {comment.body}
              </ReactMarkdown>
              <p className="comment-author">{comment.author}</p>
              <p className="created-at">
                {formatDistantToNow(new Date(comment.createdAt))} ago
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
