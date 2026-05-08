import useAuth from "../hooks/useAuth"
import { API_ROUTES } from "../utils/apiRoutes";

export const signupUser = async (formData) => {

    const existingUserResponse = await fetch(`${API_ROUTES.USERS}?email=${formData.email}`);

    const existingUsers = await existingUserResponse.json();

    if(existingUsers.length > 0) {
        throw new Error ("User with this email already existing");
    }

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
    const response = await fetch(`${API_ROUTES.USERS}?email=${formData.email}&password=${formData.password}`);

    if(!response.ok) {
        throw new Error ("Login request failed");
    }

    const users = await response.json();

    if(users.length === 0) {
        throw new Error ("Invalid user credentials");
    }

    const loggedInUser = users[0];

    return {
        id : loggedInUser.id,
        name : loggedInUser.name,
        email : loggedInUser.email,
    };
};