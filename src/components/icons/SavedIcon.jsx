export default function SavedIcon({
  className = '',
  width = 20,
  height = 20,
  fill = 'none',
  ...props
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 4h12a1 1 0 011 1v12l-7-4-7 4V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}