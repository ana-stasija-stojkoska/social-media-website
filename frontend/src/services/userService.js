import axios from "../axios";

export const getUserById = async (userId) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (updatedData) => {
  const response = await axios.put("/users", updatedData, { withCredentials: true });
  return response.data;
};