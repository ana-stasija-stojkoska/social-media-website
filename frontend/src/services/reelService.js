import axios from "../axios";

export const getAllReels = async () => {
  const result = await axios.get("/reels");
  return result.data;
};

export const createReel = async (imageUrl) => {
  const result = await axios.post("/reels", { image: imageUrl });
  return result.data;
};