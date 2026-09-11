import './Button.css';
export const Button = ({
  className = "",
  type = "button",
  size = "medium",
  variant = "primary",
  btnName,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={`button button--${variant} button--${size} ${className}`}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {btnName}
    </button>
  );
};
