// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function ProtectedRoute({ children }) {
//   const [isAuth, setIsAuth] = useState(null);

//   useEffect(() => {
//      fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
//       credentials: "include",
//     })
//       .then(res => setIsAuth(res.ok))
//       .catch(() => setIsAuth(false));
//   }, []);

//   if (isAuth === null) return null;

//   return isAuth ? children : <Navigate to="/login" />;
// }

import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? children : <Navigate to="/login" />;
}