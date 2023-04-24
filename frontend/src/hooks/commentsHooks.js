import { useState, useEffect } from "react";

export const useGetComments = (blogId, user) => {
  const [comments, setComments] = useState([]);
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
          setComments(data);
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
  }, [blogId, user]);

  return { comments, error, isLoading };
};

export const useCreateComment = (blogId, user) => {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

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
