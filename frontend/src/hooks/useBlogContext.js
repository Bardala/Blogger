import { useContext } from "react";
import { BlogsContext } from "../context/BlogsContext";

export const useBlogContext = () => {
  const context = useContext(BlogsContext);

  if (!context)
    throw Error("useBlogContext must be used in BlogsContextProvider");

  return context;
};
