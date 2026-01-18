export default function SearchIcon({
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
      {...props}
    >
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}