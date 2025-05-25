const UploadBlogPost = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="grid grid-rows-2 gap-1 grid-cols-[auto_1fr] items-center">
        {/* User Avatar */}
        <div>
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="w-8 h-8 object-cover rounded-full mr-2"
          />
        </div>

        {/* Post Content */}
        <div>
          <textarea
            placeholder="What's on your mind, Jane?"
            className="w-full m-0 focus:outline-none content-center"
          />
        </div>

        {/* Uploads */}
        <div className="col-span-2 row-start-2 ">
          <div className="flex items-center gap-1">
            {/* Image */}
            <button className="btn btn-ghost flex items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
            </button>

            {/* Location */}
            <button className="btn btn-ghost flex items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                <circle cx="12" cy="10" r="3" />
              </svg>
            </button>

            {/* Tag Friends */}
            <button className="btn btn-ghost flex items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </button>

            {/* Share */}
            <button className="btn btn-primary ml-auto">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBlogPost;
