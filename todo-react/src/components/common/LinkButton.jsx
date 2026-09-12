import { Link } from "react-router-dom";
import "./Button.css";

export const LinkButton = ({
  className = "",
  to,
  size = "medium",
  variant = "primary",
  btnName,
}) => {
  return (
    <Link
      to={to}
      className={`button button--${variant} button--${size} ${className}`}
    >
      {btnName}
    </Link>
  );
};
