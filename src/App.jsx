// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/components/Home";
import Paste from "./assets/components/Paste";
import ViewPaste from "./assets/components/ViewPaste";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import { useSelector } from "react-redux";

const withNav = (el) => (
  <div className="min-h-screen w-screen bg-black text-white">
    <Navbar />
    <div className="w-screen min-h-[calc(100vh-56px)] px-5 lg:px-8 py-6">{el}</div>
  </div>
);

// Route guards
function Protected({ children }) {
  const { user } = useSelector((s) => s.auth);
  return user ? withNav(children) : <Navigate to="/login" replace />;
}

function PublicOnly({ children }) {
  const { user } = useSelector((s) => s.auth);
  return user ? <Navigate to="/" replace /> : children;
}

export default function App() {
  const router = createBrowserRouter([
    // Public
    { path: "/login", element: <PublicOnly><Login /></PublicOnly> },
    { path: "/register", element: <PublicOnly><Register /></PublicOnly> },

    // Protected
    { path: "/", element: <Protected><Home /></Protected> },
    { path: "/pastes", element: <Protected><Paste /></Protected> },
    { path: "/pastes/:id", element: <Protected><ViewPaste /></Protected> },

    // Fallback
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return <RouterProvider router={router} />;
}
