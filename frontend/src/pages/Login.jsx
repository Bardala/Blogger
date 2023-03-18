import { useState } from "react";
import { useLogin } from "../hooks/authHooks";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <h3>Login</h3>
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
      <button disabled={isPending}>login</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
