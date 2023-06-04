import { usePostLike } from "../hooks/blogsApis";

const LikeBlogButton = ({ blog }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { error, postLike, isPending, likes } = usePostLike();

  const handleLikeButton = (e, blogId) => {
    e.preventDefault();
    postLike(blogId, user);
    console.log("Like button clicked");
  };

  return (
    <>
      {error && <p className="error">{error}</p>}
      <button
        className="likes-count"
        onClick={(e) => handleLikeButton(e, blog._id)}
        disabled={isPending}
      >
        {likes || blog.likes} likes
      </button>
    </>
  );
};

export default LikeBlogButton;
