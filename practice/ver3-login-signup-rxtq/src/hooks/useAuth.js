import { useSelector } from "react-redux"

const useAuth = (formData) => {
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return {
        user, 
        isLoggedIn,
    };
}

export default useAuth;