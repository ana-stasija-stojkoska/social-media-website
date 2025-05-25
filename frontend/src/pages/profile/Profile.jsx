import BlogPost from "../../components/blogs/BlogPost";
import UploadBlogPost from "../../components/blogs/UploadBlogPost";

const Profile = () => {
  return (
    <>
      <div className="bg-base-100 rounded px-5 py-7 mb-6 mt-4 overflow-hidden">
        <div className="flex flex-col items-center">
          <img
            className="w-46 h-46 mb-3 rounded-full shadow-md"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium">Jane Doe</h5>
          <span className="text-sm text-gray-500 mb-3">Location</span>
          <span className="text-l max-w-180 text-center">
            About me About me About me About me About me About me About me About
            me About me About me About me About me About me About me About me
            About me
          </span>
          <div className="flex mt-4 md:mt-6 gap-3">
            <button className="btn btn-primary">Add friend</button>
            <button className="btn btn-secondary">Message</button>
          </div>
        </div>
      </div>

      <div className="bg-base-100 rounded p-5 mb-4">
        <UploadBlogPost />
      </div>

      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-base-100 rounded p-5 mb-4 overflow-hidden">
          <BlogPost />
        </div>
      ))}
    </>
  );
};

export default Profile;
