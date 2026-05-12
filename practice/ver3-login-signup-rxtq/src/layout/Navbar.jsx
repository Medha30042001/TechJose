import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../utils/appRoutes";
import { navStyles } from "../styles/navStyles";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoggedIn } = useAuth();

  const handleLogout = (e) => {
    dispatch(logout());
    navigate(APP_ROUTES.LOGIN);
  };

  return (
    <>
      <nav className={navStyles.navWrapper}>
        <div className={navStyles.navContainer}>

          <p className={navStyles.navTitle}>
            <span className={navStyles.userName}>{user?.name}'s</span> dashboard
          </p>

          <button onClick={handleLogout} className={navStyles.logoutBtn}>
            Logout
          </button>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
