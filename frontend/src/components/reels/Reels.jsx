import ReelCard from "./ReelCard";

const Reels = () => {
  return (
    <div className="bg-base-100 rounded px-5 pb-2 pt-5 mb-6 mt-4 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {/* Upload Reel */}
        <ReelCard
          isUpload
          image="https://upload.wikimedia.org/wikipedia/commons/7/7c/USA_10096-7-8_HDR_Antelope_Canyon_Luca_Galuzzi_2007.jpg"
        />

        {/* Reel List */}
        {[...Array(8)].map((_, i) => (
          <ReelCard
            key={i}
            image="https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg"
            label="Johannah Doe"
          />
        ))}
      </div>
    </div>
  );
};

export default Reels;
