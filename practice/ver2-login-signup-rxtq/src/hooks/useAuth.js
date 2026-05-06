import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return {
    user,
    isLoggedIn,
  };
};

export default useAuth;

//This is just a helper hook so we don’t repeatedly write useSelector.

/*
Instead of writing:

useSelector((state) => state.auth.user)

we can write:

const { user, isLoggedIn } = useAuth();
*/