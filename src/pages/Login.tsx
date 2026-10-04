 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      email === "kj5057409@gmail.com" &&
      password === "LilyKevin182$"
    ) {
      
      login("LilyKevin182", email);

      navigate("/", { replace: true });

      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0e11] px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-[#2b3139] bg-[#181a20] p-8">

        <h1 className="mb-2 text-3xl font-bold">
          Binance
        </h1>

        <p className="mb-8 text-[#848e9c]">
          Log in to your account
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Email"
            className="w-full rounded-lg border border-[#2b3139] bg-[#0b0e11] px-4 py-3 text-white outline-none focus:border-[#f0b90b]"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Password"
            className="w-full rounded-lg border border-[#2b3139] bg-[#0b0e11] px-4 py-3 text-white outline-none focus:border-[#f0b90b]"
          />

          {error && (
            <p className="text-sm text-[#f6465d]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#f0b90b] py-3 font-semibold text-black hover:bg-[#f8d12f]"
          >
            Log In
          </button>
        </form>

        
      </div>
    </main>
  );
}

export default Login;