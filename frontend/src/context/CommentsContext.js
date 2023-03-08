import { createContext, useContext, useReducer } from "react";

export const CommentContext = createContext();

export const CommentReducer = (state, action) => {
  switch (action.type) {
    case "CREATE-COMMENT":
      return { comments: [action.payload, ...state.comments] };
    case "GET-COMMENTS":
      return { comments: action.payload };
    default:
      return state;
  }
};

export const CommentContextProvider = ({ children }) => {
  const [state, dispatchComments] = useReducer(CommentReducer, {
    comments: null,
  });

  return (
    <CommentContext.Provider value={{ ...state, dispatchComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (!context)
    throw Error("useCommentContext must be used in CommentContextProvider");

  return context;
};
