import Icon from "../Icons";
import { Text, Heading } from "./..";
import React from "react";

interface Props {
  className?: string;
  sessionTitle?: React.ReactNode;
  sessionDescription?: React.ReactNode;
  iconName?: string;
  color?: string;
}

export default function MarketingSession({
  iconName = "groupIcon",
  color = "teal_300_26",
  sessionTitle = "Group session",
  sessionDescription = "Follow a hashtag total posts, videos ",
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex  items-center self-stretch md:ml-0 `}
    >
      <div className="flex flex-col items-start justify-center rounded-[20px] bg-white-a700 py-7 h-full w-full shadow-xs sm:py-5">
        <div className={`bg-${color}`}>
          <Icon
            name={iconName}
            className="sm:w-[18px] sm:h-[18px] sm:ml-4 md:w-[45px] md:h-[45px] ml-4"
          />
        </div>
        <div className="w-full px-4 mt-4">
          <Heading
            size="headingsm"
            as="h4"
            className="font-semibold !text-black-900_02"
          >
            {sessionTitle}
          </Heading>
          <Text
            as="p"
            className="w-full self-end sm:text-[9.5px] md:text-[18px] lg:text-[18px] font-normal sm:leading-4 md:leading-[33px] !text-blue_gray-400"
          >
            {sessionDescription}
          </Text>
        </div>
      </div>
    </div>
  );
}
