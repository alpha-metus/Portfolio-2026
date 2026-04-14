import React from "react";

const sizes = {
  p: "text-[16px] font-normal",
};

export type TextProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  as,
  size = "p",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-white-a700 font-poppins ${className} ${
        sizes[size as keyof typeof sizes]
      } `}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
