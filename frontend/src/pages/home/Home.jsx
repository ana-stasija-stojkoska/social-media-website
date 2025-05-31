import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/postService";

import Reels from "../../components/reels/Reels";
import BlogPost from "../../components/blogs/BlogPost";

const Home = () => {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  return (
    <>
      {/* Reel List */}
      <Reels />

      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => (
            <div className="bg-base-100 rounded p-5 mb-4 overflow-hidden">
              <BlogPost Post={post} key={post.postid} />
            </div>
          ))}
    </>
  );
};

export default Home;
