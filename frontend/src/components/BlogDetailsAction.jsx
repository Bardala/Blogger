import { useDeleteBlog } from "../hooks/blogsApis";
import LikeBlogButton from "./LikeButton";

const BlogDetailsAction = ({ blog, owner, user }) => {
  console.log("userActions", user);
  const { error: deleteError, handleDelete } = useDeleteBlog(
    blog._id,
    user,
    blog?.spaceId,
  );

  return (
    <>
      <LikeBlogButton blog={blog} />
      {owner && <button onClick={handleDelete}>Delete</button>}
      {deleteError && <p className="error">{deleteError}</p>}
    </>
  );
};

export default BlogDetailsAction;
