

export const loginUser = async (loginData) => {
    const {email, password} = loginData;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if(email === "test@gmail.com" && password === "123456"){
        return {
            id : 1,
            name : "Test User",
            email : "test@gmail.com",
            token : "fake-jwt-token-123",
        };
    }

    throw new Error("Invalid email or password");
};

/*

api.js
Fake backend login function

authSlice.js
Redux rules for storing/removing logged-in user

store.js
Creates Redux global store and registers auth slice

main.jsx
Wraps app with Redux Provider and TanStack Query Provider

App.jsx
Shows Login component

Login.jsx
UI + form + useMutation + dispatch to Redux

-------------------------------------------------------

In main.jsx, we wrap the app with Redux Provider and TanStack Query’s 
QueryClientProvider. The Redux provider makes useDispatch and useSelector
 work, and the Query provider makes useMutation and useQuery work.

In authSlice.js, we create an auth slice with initial state containing 
user: null and isLoggedIn: false. The reducers define how this state can 
change. setLoggedInUser stores the returned user object in Redux and 
sets isLoggedIn to true. logout clears the user and sets isLoggedIn back 
to false. We export the actions for components to dispatch, and we export
 the reducer for the store to register.

In store.js, we create the Redux store and register the auth reducer 
under the name auth, so we can access the values as state.auth.user and 
state.auth.isLoggedIn.

In Login.jsx, the form stores email and password locally. When the form 
is submitted, loginMutation.mutate(formData) starts the TanStack Query 
mutation and sends the form data to the loginUser function from api.js. 
If the login succeeds, onSuccess receives the returned user data and 
dispatches setLoggedInUser(data) to Redux. Then the UI reads isLoggedIn 
from Redux and shows the welcome screen. Logout works by dispatching the 
logout() action to Redux.

*/