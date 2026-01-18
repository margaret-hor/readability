export default function ErrorIcon({
  className = '',
  width = 20,
  height = 20,
  ...props
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4M10 13v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}