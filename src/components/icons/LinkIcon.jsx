export default function LinkIcon({
  className = '',
  width = 16,
  height = 16,
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
      <path d="M12 8.667V12a1.333 1.333 0 01-1.333 1.333H4A1.333 1.333 0 012.667 12V5.333A1.333 1.333 0 014 4h3.333M9.333 2.667h4v4M6.667 9.333l6.666-6.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}