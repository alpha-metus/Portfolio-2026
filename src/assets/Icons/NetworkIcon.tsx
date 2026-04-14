const NetworkIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect opacity="0.15" width="54" height="54" rx="10" fill="#2FB8E3" />
      <path
        d="M27 39V24"
        stroke="#04AADD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 39V15"
        stroke="#04AADD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 39V33"
        stroke="#04AADD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NetworkIcon;
