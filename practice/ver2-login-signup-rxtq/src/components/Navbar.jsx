import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { APP_ROUTES } from "../utils/appRoutes";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    navigate(APP_ROUTES.LOGIN);
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">Auth Demo</h1>

      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <p className="text-slate-700">
            Hi, <span className="font-semibold">{user?.name}</span>
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;