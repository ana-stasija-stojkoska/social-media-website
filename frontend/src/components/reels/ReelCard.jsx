import IconButton from "../IconButton";

const ReelCard = ({ image, isUpload = false, label }) => {
  return (
    <div className="shrink-0 w-45 h-64 rounded relative">
      <img
        src={image}
        alt={label || "Reel"}
        className="w-full h-full object-cover"
      />
      {isUpload ? (
        <div className="absolute bottom-3 left-3">
          <IconButton
            svgPath={
              <>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </>
            }
            svgViewBox="0 0 24 24"
            className="btn-primary"
            size="h-5 w-5"
            variant="primary"
          />
        </div>
      ) : (
        <span className="absolute bottom-2 left-3 text-white font-semibold">
          {label}
        </span>
      )}
    </div>
  );
};

export default ReelCard;
