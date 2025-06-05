import { Link } from "react-router-dom";

const IconButton = ({
  svgPath,
  svgViewBox = "0 0 24 24",
  indicator = false,
  children,
  className = "",
  size = "h-5 w-5",
  label,
  onClick,
  swap,
  hiddenOn = "md",
  variant = "ghost",
  to
}) => {
  const baseClasses = `btn btn-${variant} btn-circle ${
    hiddenOn ? `hidden ${hiddenOn}:flex` : ""
  } ${className}`;

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${size}`}
      fill="none"
      viewBox={svgViewBox}
      stroke="currentColor"
      strokeWidth="2"
    >
      {svgPath}
    </svg>
  );

  const content = swap ? (
    <label className="swap swap-rotate">{children}</label>
  ) : indicator ? (
    <div className="indicator">
      {icon}
      {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
    </div>
  ) : (
    icon
  );

  return to ? (
    <Link to={to} className={baseClasses} aria-label={label} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <button className={baseClasses} onClick={onClick} aria-label={label}>
      {content}
    </button>
  );
};

export default IconButton;