import useAuth from "../hooks/useAuth"
import { API_ROUTES } from "../utils/apiRoutes";

export const signupUser = async (formData) => {

    const existingUserResponse = await fetch(`${API_ROUTES.USERS}?email=${formData.email}`); //get request

    const existingUsers = await existingUserResponse.json(); //array

    if(existingUsers.length > 0) {
        throw new Error ("User with this email already existing");
    }

    //post request
    const response = await fetch ( API_ROUTES.USERS, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(formData),
    });

    if(!response.ok) {
        throw new Error ("Signup failed");
    }

    const data = await response.json();

    return data;

}

export const loginUser = async (formData) => {
    const response = await fetch(`${API_ROUTES.USERS}?email=${formData.email}`);

    if(!response.ok) {
        throw new Error ("Login request failed");
    }

    const users = await response.json(); //array

    if(users.length === 0) {
        throw new Error ("Invalid user credentials");
    }

    const loggedInUser = users[0]; //object

    if(String(loggedInUser.password) !== String(formData.password)) {
        throw new Error ("Invalid email or password");
    }

    return {
        id : loggedInUser.id,
        name : loggedInUser.name,
        email : loggedInUser.email,
    };
};