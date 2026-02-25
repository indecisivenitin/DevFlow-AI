import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      method: "GET",
      credentials: "include", // 🔥 REQUIRED
    })
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return null;

  return isAuth ? children : <Navigate to="/login" replace />;
}