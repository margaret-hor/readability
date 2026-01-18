export default function CloseIcon({
  className = '',
  width = 18,
  height = 18,
  ...props
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}