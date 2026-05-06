import {configureStore} from "@reduxjs/toolkit"

import authReducer from "./authSlice"
//authSlice.reducer

export const store = configureStore({
    reducer : {
        auth : authReducer,
    },
});

//Create a Redux store. Inside that store, 
// create one section called auth. 
// The logic for managing that section comes from authReducer.

/**
    So your global Redux state shape becomes:

    {
        auth: {
            user: null,
            isLoggedIn: false
        }
    }

    That is why in Login.jsx, we read like this:
        const user = useSelector((state) => state.auth.user);
        const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 */