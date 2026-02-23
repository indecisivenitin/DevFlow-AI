import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) navigate("/login");
    else alert("Registration failed");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black overflow-hidden">

      {/* Glow Graphics */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/30 blur-3xl rounded-full top-[-100px] right-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 blur-3xl rounded-full bottom-[-100px] left-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-[420px] text-white"
      >
        <h2 className="text-3xl font-semibold mb-2">Create Account</h2>
        <p className="text-gray-300 mb-8">
          Start your AI developer journey
        </p>

        {/* Name */}
        <div className="relative mb-5">
          <User size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 cursor-pointer text-gray-400"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 py-3 rounded-xl font-medium hover:scale-105 transition duration-300 shadow-lg shadow-purple-500/30"
        >
          Register
        </button>

        <p className="mt-6 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-white transition"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}