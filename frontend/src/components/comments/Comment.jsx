import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";

import Likes from "../Likes";

const Comment = ({ comment }) => {
  const [author, setAuthor] = useState(null);
  const [numLikes, setNumLikes] = useState(0);
  const [liked, toggleLiked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      try {
        const userData = await getUserById(comment.userid);
        if (isMounted) setAuthor(userData);
      } catch (err) {
        if (isMounted) setAuthor(null);
      }
    }

    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [comment.userid]);

  const handleLiked = () => {
    const newLiked = !liked;
    toggleLiked(newLiked);
    setNumLikes((prev) => prev + (newLiked ? 1 : -1));
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-row mb-2">
        <img
          src={author?.profilepicture}
          className="w-8 h-8 object-cover rounded-full mr-2"
        />
        <span className="font-semibold mr-2">{author?.name || "Unknown User"}</span>
        <span className="text-gray-500">
          {new Date(comment.timecreated).toLocaleString("en-US", {
            timeZone: "Europe/Skopje",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="mb-2">
        {comment.descr}
      </div>
      <div>
        <Likes liked={liked} handleLiked={handleLiked} numLikes={numLikes} />
      </div>
    </div>
  );
};

export default Comment;