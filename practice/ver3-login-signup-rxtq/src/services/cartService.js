import { API_ROUTES } from "../utils/apiRoutes"

export const cartItems = async () => {
    const response = await fetch(`${API_ROUTES.CARTS}`);

    if(!response.ok) {
        throw new Error ("Failed to fetch cart items");
    }

    const result = await response.json();

    const data = result.carts.slice(0, 10);
    return data;
}