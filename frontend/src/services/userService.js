import axios from "../axios";

export const getUserById = (userId) => {
  return axios.get(`/users/${userId}`);
};