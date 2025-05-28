import axios from "../axios";

export const login = (credentials) => {
  return axios.post("/auth/login", credentials);
};

export const register = (data) => {
  return axios.post("/auth/register", data);
};

export const logout = () => {
  return axios.post("/auth/logout");
};