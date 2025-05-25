import { useState } from "react";

import Likes from "../Likes";

const Comment = () => {
  const [numLikes, setNumLikes] = useState(0);
  const [liked, toggleLiked] = useState(false);

  const handleLiked = () => {
    const newLiked = !liked;
    toggleLiked(newLiked);
    setNumLikes((prev) => prev + (newLiked ? 1 : -1));
  };
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-row mb-2">
        <img
          src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740"
          className="w-8 h-8 object-cover rounded-full mr-2"
        />
        <span className="font-semibold mr-2">Mike Glugh</span>
        <span className="text-gray-500">a few seconds ago</span>
      </div>
      <div className="mb-2">
        Bla bla bla Bla bla bla Bla bla bla Bla bla bla Bla bla bla
      </div>
      <div>
        <Likes liked={liked} handleLiked={handleLiked} numLikes={numLikes} />
      </div>
    </div>
  );
};

export default Comment;
