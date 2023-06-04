import "../styles/createSpace.css";

import { useState } from "react";
import { useCreateSpace } from "../hooks/spaceApis";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateSpace = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [state, setState] = useState("public");
  const { error, isPending, createSpace } = useCreateSpace();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) createSpace(title, state, user);
  };

  return (
    <div className="create-space">
      <h1>Create Space</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="state">State</label>
        <select
          className="space-state"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <button disabled={isPending}>Create</button>
      </form>
    </div>
  );
};

export default CreateSpace;
