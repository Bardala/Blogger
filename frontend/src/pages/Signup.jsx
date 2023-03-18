import { useState } from "react";
import { useSignup } from "../hooks/authHooks";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isPending } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await signup(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Signup</h3>
      <label>username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isPending}>signup</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
