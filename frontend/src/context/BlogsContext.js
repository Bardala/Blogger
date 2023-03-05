import { createContext, useReducer } from "react";

export const BlogsContext = createContext();

export const BlogsReducer = (state, action) => {
  switch (action.type) {
    case "CREATE-BLOG":
      return {
        blogs: [...state.blogs, action.payload],
      };
    case "GET-ALL-BLOGS":
      return {
        blogs: action.payload,
      };
    case "GET-BLOG":
      return {
        blog: action.payload,
      };
    default:
      return state;
  }
};

export const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BlogsReducer, {
    blogs: null,
  });

  return (
    <BlogsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};
