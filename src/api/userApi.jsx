import axios from "axios";

const USERS_API = "https://dummyjson.com/users";
const PRODUCTS_API = "https://dummyjson.com/products";

export const fetchActiveUsers = async () => {
  try {
    const response = await axios.get(USERS_API);
    console.log(response.data.users);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching active users:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${USERS_API}/${userId}`, updatedData);
    console.log(`User ${userId} updated successfully:`, response.data);
    return response.data; // Return updated user data
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

export const fetchPurchases = async () => {
  try {
    const response = await axios.get(PRODUCTS_API);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products (Purchases):", error);
    throw error;
  }
};

export const fetchLikes = async () => {
  try {
    const response = await axios.get(PRODUCTS_API);
    const likedProducts = response.data.products.map((product) => ({
      product: product.name,
      likes: Math.floor(Math.random() * 1000),
    }));
    return likedProducts;
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw error;
  }
};

export const fetchClicks = async () => {
  try {
    const response = await axios.get(PRODUCTS_API);
    const clickEvents = response.data.products.map((product) => ({
      product: product.name,
      clicks: Math.floor(Math.random() * 500),
    }));
    return clickEvents; // Return simulated click events data
  } catch (error) {
    console.error("Error fetching click events:", error);
    throw error;
  }
};
