import axios from "../axios";

export const getFollowers = async (userId) => {
  const result = await axios.get(`/follows/followers/${userId}`);
  return result.data;
};

export const followUser = async (followeduserid) => {
  const result = await axios.post("/follows", { followeduserid });
  return result.data;
};

export const unfollowUser = async (followeduserid) => {
  const result = await axios.delete(`/follows/${followeduserid}`);
  return result.data;
};
