import { Link } from "react-router-dom";

const NavbarDropdownButton = ({ text, to="#", className, onClick, children }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`btn btn-ghost btn-block place-content-start ${className || ""}`}
    >
      {children}
      {text}
    </Link>
  );
};

export default NavbarDropdownButton;
