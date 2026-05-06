import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { APP_ROUTES } from "../utils/appRoutes";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;