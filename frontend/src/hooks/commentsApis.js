import { useState, useEffect } from "react";
import { useCommentContext } from "./useCommentContext";

export const useGetComments = (blogId, user) => {
  const { dispatchComments, comments } = useCommentContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/getComments?blogId=${blogId}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );

        const data = await response.json();
        if (response.ok) {
          dispatchComments({ type: "GET-COMMENTS", payload: data });
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Connection Error: " + error.message);
      }
      setIsLoading(false);
    };

    if (user) {
      fetchComments();
    }
  }, [blogId, dispatchComments, user]);

  return { error, isLoading, comments };
};

export const useCreateComment = (blogId, user) => {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatchComments } = useCommentContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    if (commentBody.trim() === "") {
      setError(
        "Please fill the comment field, you can't post an empty comment",
      );
      setCommentBody("");
      setIsPending(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/createComment", {
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
        setCommentBody("");
        dispatchComments({ type: "CREATE-COMMENT", payload: data });
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Connection Error: " + error.message);
    }
    setIsPending(false);
  };

  return { commentBody, setCommentBody, error, isPending, handleSubmit };
};
