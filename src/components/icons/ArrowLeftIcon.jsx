export default function ArrowLeftIcon({
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
      {...props}>
      <path d="M6 8L2 12L6 16" />
      <path d="M2 12H22" />
    </svg>
  );
}