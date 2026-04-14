import React from "react";

const shapes = {
  circle: "rounded-[50%]",
  round: "rounded-[12px]",
} as const;
const variants = {
  fill: {
    amber_A400_01: "bg-amber-a400_01 shadow-sm text-black-900_02",
    deep_purple_A200_26: "bg-deep_purple-a200_26",
    teal_300_26: "bg-teal-300_26",
    yellow_800_26: "bg-yellow-800_26",
    cyan_400_26: "bg-cyan-400_26",
    white_A700: "bg-white-a700 text-black-900_02",
    white_A700_33: "bg-white-a700_33",
    bg_black: "bg-black-900 text-white-a700",
  },
  outline: {
    amber_A400_01:
      "border-amber-a400_01 border-[3.85px] border-solid text-white-a700",
    black_900_02:
      "border-black-900_02 border-[3px] border-solid text-black-900_02",
    blue_gray_400_59: "border-blue_gray-400_59 border border-solid",
  },
} as const;
const sizes = {
  xs: "h-[50px] px-[34px] text-[15px]",
  md: "h-[54px] px-[34px] text-[20px]",
  sm: "h-[54px] px-3",
} as const;

type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> &
  Partial<{
    className: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
    shape: keyof typeof shapes;
    variant: keyof typeof variants | null;
    size: keyof typeof sizes;
    color: string;
  }>;
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "outline",
  size = "sm",
  color = "blue_gray_400_59",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${
        shape && shapes[shape]
      } ${size && sizes[size]} ${
        variant &&
        variants[variant]?.[color as keyof (typeof variants)[typeof variant]]
      }`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
