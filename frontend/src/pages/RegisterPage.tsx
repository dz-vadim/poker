import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../auth/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {register} = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");
      await register({name, surname, email, password, repeatPassword});

      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Register failed");
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
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="rounded border p-2"
          type="text"
          placeholder="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

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

        <input
          className="rounded border p-2"
          type="password"
          placeholder="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                type="submit">
          Register
        </button>

        <Link className="text-sm text-blue-500 hover:underline" to="/login">
          Login
        </Link>
      </form>
    </div>
  );
}

