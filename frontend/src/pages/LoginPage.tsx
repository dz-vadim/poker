import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");
      await login({email, password});

      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Login failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex w-80 flex-col gap-3 rounded bg-white p-6 shadow"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          className="rounded border p-2"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="rounded border p-2"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>

        <Link className="text-sm text-blue-500 hover:underline" to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}
