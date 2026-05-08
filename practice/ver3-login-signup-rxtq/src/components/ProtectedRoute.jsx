import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { APP_ROUTES } from "../utils/appRoutes";

const ProtectedRoute = ({children}) => {

    const {isLoggedIn} = useAuth();

    if(!isLoggedIn) {
        return <Navigate to={APP_ROUTES.LOGIN} replace/>;
    }

    return children;
}

export default ProtectedRoute;

// <Navigate /> tag is like a guard protecting a gate
//          it is a React Router component and used inside 
//          JSX/return to redirect based on a condition. 

// useNavigate() is like a tourist guide
//          it is a React Router hook which can be used 
//          inside success callback, or normal JavaScript 
//          functions. Can only be used in a react component.
