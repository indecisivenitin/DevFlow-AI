// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleLogin = async () => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) navigate("/dashboard");
//     else alert("Invalid credentials");
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">

//       {/* Glow Graphics */}
//       <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
//       <div className="absolute w-[400px] h-[400px] bg-purple-500/30 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-[400px] text-white"
//       >
//         <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>
//         <p className="text-gray-300 mb-8">
//           Continue building with DevFlow AI
//         </p>

//         {/* Email */}
//         <div className="relative mb-5">
//           <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//         </div>

//         {/* Password */}
//         <div className="relative mb-6">
//           <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type={show ? "text" : "password"}
//             placeholder="Password"
//             className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           <span
//             onClick={() => setShow(!show)}
//             className="absolute right-3 top-3 cursor-pointer text-gray-400"
//           >
//             {show ? <EyeOff size={18} /> : <Eye size={18} />}
//           </span>
//         </div>

//         <button
//           onClick={handleLogin}
//           className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-xl font-medium hover:scale-105 transition duration-300 shadow-lg shadow-indigo-500/30"
//         >
//           Login
//         </button>

//         <p className="mt-6 text-sm text-gray-300 text-center">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-400 hover:text-white transition"
//           >
//             Register
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }











import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!form.email || !form.password) return;

  setLoading(true);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    // Cookie is stored → AuthProvider will detect it
    navigate("/dashboard", { replace: true });

  } catch (err) {
    console.error(err);
    alert("Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-[400px] text-white"
      >
        <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-gray-300 mb-8">
          Continue building with DevFlow AI
        </p>

        <div className="relative mb-5">
          <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="relative mb-6">
          <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/20"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 cursor-pointer text-gray-400"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-xl font-medium hover:scale-105 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-white transition"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}