import { useAuthContext } from "./useAuthContext";
import { useBlogContext } from "./useBlogContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchBlogs } = useBlogContext();
  const logout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    dispatchBlogs({ type: "GET-ALL-BLOGS", payload: null });
  };
  return { logout };
};
