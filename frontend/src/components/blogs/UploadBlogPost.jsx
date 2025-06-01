import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";

const UploadBlogPost = () => {
  const { user } = useAuth();
  const [descr, setDescr] = useState("");
  const [image, setImage] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Clear form and refetch posts
      setDescr("");
      setImage("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleShare = () => {
    if (!descr.trim()) return;

    mutate({
      userid: user.userid,
      descr,
      image: image.trim(),
    });
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="grid grid-rows-2 gap-1 grid-cols-[auto_1fr] items-center">
        {/* User Avatar */}
        <div>
          <img
            src={user?.profilepicture}
            className="w-8 h-8 object-cover rounded-full mr-2"
          />
        </div>

        {/* Post Content */}
        <div>
          <textarea
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
            placeholder={"What's on your mind, " + user?.name + "?"}
            className="w-full m-0 focus:outline-none content-center"
          />
        </div>

        {/* Uploads */}
        <div className="col-span-2 row-start-2 ">
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL (optional)"
              className="input ml-1"
            />

            {/* Share */}
            <button
              onClick={handleShare}
              disabled={isLoading}
              className="btn btn-secondary ml-auto"
            >
              {isLoading ? "Posting..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBlogPost;
