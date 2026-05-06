import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "./api";
import { setLoggedInUser, logout } from "./authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser, //loginUser comes from api.js
    //email and password are validated in this api.js file
    // mutationFn: loginUser (means => Use this function as the login request) (?)

    onSuccess: (data) => {
      dispatch(setLoggedInUser(data));
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
    e.preventDefault(); //Don’t refresh page

    loginMutation.mutate(formData);
    //this line means: 
    // Start the TanStack login request now, and send this form data to loginUser
    /*
        So if form data is:

        {
            email: "test@gmail.com",
            password: "123456"
        }

        Then TanStack Query internally does:
        loginUser(formData)
    */

        //mutate means Run the function now.
  };

  if (isLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>Login Successful</h1>

        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Token: {user.token}</p>

        <button onClick={() => dispatch(logout())}>Logout</button>
        {/*dispatch(logout()); means Send this logout action to 
        Redux store so the reducer can run and update the state. */}
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {loginMutation.isError && (
        <p style={{ color: "red" }}>{loginMutation.error.message}</p>
      )}

      <p style={{ marginTop: "20px" }}>
        Test email: <b>test@gmail.com</b>
        <br />
        Test password: <b>123456</b>
      </p>
    </div>
  );
};

export default Login;

/*

    useQuery     → GET data
    useMutation  → POST / PUT / DELETE / login / signup

    ------------------------------------------------------------

    This : 
    const loginMutation = useMutation({
      mutationFn: loginUser,
    });

    means :
      TanStack Query, when I tell you to start, please run the loginUser function.


      So why use TanStack Query?

      Because TanStack Query gives you ready-made handling for:

      loading state
      error state
      success callback
      retry behavior
      request status
      clean async structure

      Instead of manually writing:

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      try {
        setLoading(true);
        setError(null);
        const data = await loginUser(formData);
        dispatch(setLoggedInUser(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

      TanStack Query gives you:

      loginMutation.isPending
      loginMutation.isError
      loginMutation.error
      loginMutation.isSuccess

      -----------------------------------------

      dispatch(setLoggedInUser(data));

      That creates and sends an action like:

      {
        type: "auth/setLoggedInUser",
        payload: data
      }

      Then Redux sees the action type and runs the matching reducer:

      setLoggedInUser: (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      }

      logout() = creates instruction
      dispatch(logout()) = sends instruction to Redux
*/