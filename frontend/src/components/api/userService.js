import axiosInstance from "./axiosConfig";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token); // Save token to localStorage
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update user by ID
export const updateUserById = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete user by ID
export const deleteUserById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
