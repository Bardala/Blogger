import { useParams } from "react-router-dom";

const ReadBlog = () => {
  const { id } = useParams();

  return (
    <div className="blog-details">
      <h2>Blog details - {id}</h2>
    </div>
  );
};

export default ReadBlog;
