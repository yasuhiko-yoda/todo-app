export const Button = ({
  btnColor,
  btnBgColor,
  type,
  size,
  btnName,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={size}
      style={{
        color: btnColor,
        backgroundColor: btnBgColor,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {btnName}
    </button>
  );
};
