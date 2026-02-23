import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then(res => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return null;

  return isAuth ? children : <Navigate to="/login" />;
}