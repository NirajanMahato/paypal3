import { Eye } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const enteredEmail = email.trim();
    const enteredPassword = password.trim();

    if (
      enteredEmail === "Hamzahabibi707@gmail.com" &&
      enteredPassword === "1@abhi@"
    ) {
      localStorage.setItem("loggedIn", "true");
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
            alt="PayPal"
            className="h-12"
          />
        </div>

        {/* Feedback */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-5 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <a
              href="#"
              className="text-sm text-blue-700 font-bold hover:underline"
            >
              Use phone number instead
            </a>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-5 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-6 text-gray-500"
            >
              <Eye size={20} />
            </button>
          </div>

          <div className="text-left">
            <a
              href="#"
              className="text-sm text-blue-700 font-bold hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Log In */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full text-lg font-bold hover:opacity-90 transition"
          >
            Log In
          </button>

          {/* Sign Up */}
          <button
            type="button"
            className="w-full border border-gray-300 text-black py-3 rounded-full text-lg font-bold hover:bg-gray-100 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
