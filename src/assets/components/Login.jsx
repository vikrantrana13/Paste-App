// src/assets/components/Login.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Clipboard } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(login({ email }));
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white grid place-items-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-xl p-8 shadow">
        <div className="flex flex-col items-center mb-6">
          <Clipboard size={40} className="text-blue-500 mb-2" />
          <h1 className="text-2xl font-bold tracking-wide">PASTE APP</h1>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-neutral-800 text-white border border-white/10 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded bg-neutral-800 text-white border border-white/10 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded py-2 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-neutral-400 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
