export default function ListIcon({
  className = '',
  width = 24,
  height = 24,
  ...props
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 5h.01" /><path d="M3 12h.01" />
      <path d="M3 19h.01" /><path d="M8 5h13" />
      <path d="M8 12h13" /><path d="M8 19h13" />
    </svg>
  );
}