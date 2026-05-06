import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../services/authService";
import { APP_ROUTES } from "../utils/appRoutes";
import { formStyles } from "../styles/formStyles";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupMutation = useMutation({
    mutationFn: signupUser,

    onSuccess: () => {
      alert("Signup successful. Please login.");
      navigate(APP_ROUTES.LOGIN);
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

  const handleSignup = (e) => {
    e.preventDefault();

    signupMutation.mutate(formData);
  };

  return (
    <div className={formStyles.pageWrapper}>
      <div className={formStyles.card}>
        <h1 className={formStyles.title}>Create Account</h1>
        <p className={formStyles.subtitle}>
          Signup using API request handled by TanStack Query
        </p>

        <form onSubmit={handleSignup} className={formStyles.form}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={formStyles.input}
            required
          />

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
            disabled={signupMutation.isPending}
            className={formStyles.primaryButton}
          >
            {signupMutation.isPending ? "Creating account..." : "Signup"}
          </button>
        </form>

        {signupMutation.isError && (
          <p className={formStyles.error}>{signupMutation.error.message}</p>
        )}

        <p className={formStyles.linkText}>
          Already have an account?{" "}
          <Link to={APP_ROUTES.LOGIN} className={formStyles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;