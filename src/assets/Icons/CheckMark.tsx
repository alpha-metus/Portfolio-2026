const CheckMark = ({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.1136 8.71781V9.50504C18.1125 11.3502 17.515 13.1457 16.4102 14.6236C15.3054 16.1014 13.7524 17.1826 11.9829 17.7058C10.2135 18.229 8.32226 18.1661 6.5914 17.5267C4.86055 16.8872 3.38277 15.7054 2.37846 14.1574C1.37416 12.6095 0.89714 10.7783 1.01855 8.93714C1.13996 7.09593 1.85329 5.3433 3.05216 3.94063C4.25102 2.53795 5.87119 1.56039 7.67103 1.15374C9.47087 0.747095 11.3539 0.933143 13.0394 1.68414"
        stroke={color}
        strokeWidth="1.71136"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1141 2.66016L9.55727 11.2255L6.99023 8.65846"
        stroke={color}
        strokeWidth="1.71136"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckMark;
