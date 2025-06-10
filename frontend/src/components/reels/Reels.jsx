import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFeedReels, createReel } from "../../services/reelService";
import { getUserById } from "../../services/userService";
import { useEffect, useState } from "react";
import ReelCard from "./ReelCard";

const Reels = () => {
  const queryClient = useQueryClient();

  const { data: reels = [], isLoading, isError } = useQuery({
    queryKey: ["reels"],
    queryFn: getFeedReels,
  });

  const [reelsWithUser, setReelsWithUser] = useState([]);

  const { mutate: uploadReel } = useMutation({
    mutationFn: createReel,
    onSuccess: () => {
      queryClient.invalidateQueries(["reels"]);
    },
  });

  const handleUpload = (imageUrl) => {
    if (!imageUrl) return;
    uploadReel(imageUrl);
  };

  useEffect(() => {
    const fetchReelUsers = async () => {
      const results = await Promise.all(
        reels.map(async (reel) => {
          try {
            const user = await getUserById(reel.userid);
            return { ...reel, userName: user.name };
          } catch {
            return { ...reel, userName: "Unknown" };
          }
        })
      );
      setReelsWithUser(results);
    };

    if (reels.length) fetchReelUsers();
  }, [reels]);

  if (isError) return null;
  if (isLoading) return <div className="p-5">Loading reels...</div>;

  return (
    <div className="bg-base-100 rounded px-5 pb-2 pt-5 mb-6 mt-4 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {/* Upload Reel */}
        <ReelCard
          isUpload
          image="https://upload.wikimedia.org/wikipedia/commons/7/7c/USA_10096-7-8_HDR_Antelope_Canyon_Luca_Galuzzi_2007.jpg"
          onUpload={handleUpload}
        />

        {/* Reel List */}
        {reelsWithUser.map((reel) => (
          <ReelCard
            key={reel.reelid}
            image={reel.image}
            label={reel.userName}
          />
        ))}
      </div>
    </div>
  );
};

export default Reels;