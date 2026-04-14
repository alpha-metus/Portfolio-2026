import React from "react";

const sizes = {
  h2: "tracking-[-0.48px] font-quicksand text-[48px] font-bold md:text-[44px] sm:text-[38px]",
  h3: "text-[55px] font-semibold md:text-[47px] sm:text-[41px]",
  heading: "text-[55px] font-semibold md:text-[47px] sm:text-[28px]",
  headingsm: "sm:text-[12.5px] lg:text-[24px] font-semibold md:text-[22px]",
  body_test: "tracking-[-0.20px] font-nunitosans text-[20px] font-bold",
  textxs: "text-[14px] font-medium",
  texts: "text-[20px] font-medium",
  headingxs: "text-[13px] font-semibold",
  headings: "text-[15px] font-semibold",
  headingmd: "text-[20px] font-bold",
  headinglg: "text-[24px] font-semibold md:text-[22px]",
  headingxl: "text-[39px] font-semibold md:text-[37px] sm:text-[35px]",
  heading2xl: "text-[40px] font-semibold md:text-[38px] sm:text-[36px]",
  heading3xl: "text-[49px] font-semibold md:text-[45px] sm:text-[39px]",
};

export type HeadingProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = "",
  size = "headingxs",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component
      className={`text-white-a700 font-poppins ${className} ${
        sizes[size] as keyof typeof sizes
      }`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };
