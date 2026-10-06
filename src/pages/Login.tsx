import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    // Check fields
    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // Demo account
    const correctEmail = "kj5057409@gmail.com";
    const correctPassword = "Lillykevin182$";

    if (
      cleanEmail === correctEmail &&
      password === correctPassword
    ) {
      // AuthContext will save:
      // username
      // email
      // login date/time
      login(
        "LilyKevin182",
        "kj5057409@gmail.com"
      );

      setLoading(false);

      // Go to dashboard/home
      navigate("/", { replace: true });

      return;
    }

    setLoading(false);
    setError("Invalid email or password.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0e11] px-4 py-8 text-white">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#f0b90b]">
            Binance
          </h1>

          <p className="mt-2 text-[#848e9c]">
            Log in to your account
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="rounded-2xl border border-[#2b3139] bg-[#181a20] p-6 shadow-2xl sm:p-8">

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#b7bdc6]">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#848e9c]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-[#2b3139] bg-[#0b0e11] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-[#5e6673] focus:border-[#f0b90b]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#b7bdc6]">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#848e9c]"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-[#2b3139] bg-[#0b0e11] py-3 pl-11 pr-12 text-white outline-none transition placeholder:text-[#5e6673] focus:border-[#f0b90b]"
                />

                {/* SHOW / HIDE PASSWORD */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-[#848e9c] transition hover:bg-[#2b3139] hover:text-white"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-lg border border-[#f6465d]/30 bg-[#f6465d]/10 px-4 py-3">
                <p className="text-sm text-[#f6465d]">
                  {error}
                </p>
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#f0b90b] py-3 font-semibold text-black transition hover:bg-[#f8d12f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Logging in..."
                : "Log In"}
            </button>
          </form>

          {/* DEMO LOGIN */}
          <div className="mt-6 rounded-lg border border-[#2b3139] bg-[#0b0e11] p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#848e9c]">
              Demo account
            </p>

            <div className="space-y-1 text-sm">
              <p className="text-[#b7bdc6]">
                Email:
                <span className="ml-2 text-white">
                  kj5057409@gmail.com
                </span>
              </p>

              <p className="text-[#b7bdc6]">
                Password:
                <span className="ml-2 text-white">
                  Lillykevin182$
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Login;