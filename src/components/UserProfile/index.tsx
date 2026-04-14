import Icon from "../Icons";
import { Text, Heading, Img } from "./..";
import React from "react";

interface Props {
  className?: string;
  userImage?: string;
  countryName?: React.ReactNode;
  descriptionText?: React.ReactNode;
}

export default function UserProfile({
  userImage = "bangladeshFlag",
  countryName = "Bangladesh",
  descriptionText = "&lt;&gt;Event madness gathering &lt;br /&gt;innoies, & tech enthusiasts in Speced.&lt;/&gt;",
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center w-[24%] md:w-full px-2 py-4 bg-amber-a400 shadow-xs rounded-[14px]`}
    >
      <div className="mx-3.5 flex items-center gap-3 self-stretch">
        {/* <Img src={userImage} width={44} height={44} alt="Bangladesh" className="h-[44px]" /> */}
        <Icon name={userImage} className="w-[44px] h-[44px]" />
        <Heading
          size="textxs"
          as="p"
          className="text-[14.2px] font-medium !text-blue_gray-800"
        >
          {countryName}
        </Heading>
      </div>
      <div className="mt-1.5 h-[0.71px] self-stretch bg-gray-400_a5" />
      <Text
        as="p"
        className="mb-2 mt-2.5 w-[86%] text-[18px] font-normal leading-[33px] !text-black-900_02"
      >
        {descriptionText}
      </Text>
    </div>
  );
}
