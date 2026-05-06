import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { loginUser } from "../services/authService";
import { setLoggedInUser } from "../store/slices/authSlice";
import { APP_ROUTES } from "../utils/appRoutes";
import { formStyles } from "../styles/formStyles";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      dispatch(setLoggedInUser(data));
      navigate(APP_ROUTES.DASHBOARD);
    },

    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    loginMutation.mutate(formData);
  };

  return (
    <div className={formStyles.pageWrapper}>
      <div className={formStyles.card}>
        <h1 className={formStyles.title}>Login</h1>
        <p className={formStyles.subtitle}>
          Login request handled using TanStack Query
        </p>

        <form onSubmit={handleLogin} className={formStyles.form}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={formStyles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={formStyles.input}
            required
          />

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={formStyles.primaryButton}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {loginMutation.isError && (
          <p className={formStyles.error}>{loginMutation.error.message}</p>
        )}

        <div className="bg-slate-100 rounded-lg p-3 mt-5 text-sm text-slate-600">
          <p className="font-semibold">Test credentials:</p>
          <p>Email: test@gmail.com</p>
          <p>Password: 123456</p>
        </div>

        <p className={formStyles.linkText}>
          Don&apos;t have an account?{" "}
          <Link to={APP_ROUTES.SIGNUP} className={formStyles.link}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;