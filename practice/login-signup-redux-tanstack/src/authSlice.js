import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isLoggedIn : false,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        // state means the >>current<< Redux data of this slice.
        //action is the message sent to Redux. 
        //      If we send extra data with that message, 
        //      the data comes inside action.payload.
        setLoggedInUser : (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },

        logout : (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});

export const {setLoggedInUser, logout} = authSlice.actions;
//    actions = commands components can send
export default authSlice.reducer;
//    whereas reducer = the actual state-changing logic the store uses


//In Redux Toolkit, this is called a slice named auth.

// /We are creating one Redux section called auth. 
// Its starting data is initialState. '
// These reducer functions are allowed to change it.

// FYI : user is not a string. 
// It is initially null, but later it becomes an object.


/*
Before login:

user: null

After login:

user: {
  id: 1,
  name: "Test User",
  email: "test@gmail.com",
  token: "fake-jwt-token-123"
}
*/

/*

what is action?

    actions = commands components can send

    dispatch(setLoggedInUser(data));
    Here data becomes:
    action.payload


    So this:

    dispatch(setLoggedInUser({
    id: 1,
    name: "Test User",
    email: "test@gmail.com"
    }));

    goes into reducer like this:

    setLoggedInUser: (state, action) => {
    state.user = action.payload;
    }

    So action.payload is the user object.

    >>>>
    action.payload is not the email/password entered by the user. 
    It is the successful user data returned from the fake API.
    <<<<<
*/