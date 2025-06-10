import axios from "../axios";

export const getLatestActivities = async () => {
  const response = await axios.get(`/activities`);
  return response.data;
};