// src/assets/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const links = [
  { title: "Home", path: "/" },
  { title: "All Pastes", path: "/pastes" },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-screen h-[56px] flex items-center justify-between px-4 bg-neutral-900 text-white">
      <div className="flex gap-x-5">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-400"
                : "text-white/80 hover:text-white"
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
      >
        Logout
      </button>
    </div>
  );
}
