import Reels from "../../components/reels/Reels";
import BlogPost from "../../components/blogs/BlogPost";

const Home = () => {
  return (
    <>
      {/* Reel List */}
      <Reels />

      {/* Blog Post List */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-base-100 rounded p-5 mb-4 overflow-hidden">
          <BlogPost/>
        </div>
      ))}
    </>
  );
};

export default Home;
