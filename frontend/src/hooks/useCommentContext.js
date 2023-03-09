import { useContext } from "react";
import { CommentContext } from "../context/CommentsContext";

export const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (!context)
    throw Error("useCommentContext must be used in CommentContextProvider");

  return context;
};
