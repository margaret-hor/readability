export default function FilterIcon({
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
      <path d="M3 6h14M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}