const AnnouncementIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="54" height="54" rx="10" fill="#806DF2" fillOpacity="0.15" />
      <path
        d="M12.5 23.5L39.5 16V34L12.5 28V23.5Z"
        stroke="#BC7AF2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.4001 32.2C25.2425 32.7712 24.9739 33.3059 24.6097 33.7733C24.2455 34.2408 23.7928 34.6319 23.2775 34.9244C22.7621 35.2169 22.1942 35.4051 21.6061 35.4781C21.018 35.5511 20.4213 35.5076 19.8501 35.35C19.2788 35.1924 18.7442 34.9238 18.2768 34.5596C17.8093 34.1954 17.4181 33.7427 17.1256 33.2274C16.8331 32.712 16.645 32.1441 16.572 31.556C16.499 30.9679 16.5425 30.3712 16.7001 29.8"
        stroke="#BC7AF2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AnnouncementIcon;
