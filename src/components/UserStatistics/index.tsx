import React from "react";
import { Text, Heading, Button } from "./..";
import Icon from "../Icons";

interface Props {
  className?: string;
  userCount?: React.ReactNode;
  sectionTitle?: React.ReactNode;
  descriptionText?: React.ReactNode;
  iconName?: string;
}

export default function UserStatistics({
  userCount = "80k",
  sectionTitle = "Our buyers",
  descriptionText = "Follow a hashtag growth total posts, videos and images.",
  iconName = "shoppingBag",
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center md:w-full sm:rounded-2xl sm:p-4`}
      style={{ border: "1px solid transparent" }}
    >
      <div className="flex w-[44%] flex-col items-center gap-3.5 sm:w-full sm:gap-2">
        <div className="ml-1.5 flex flex-col items-center gap-0.5 self-stretch">
          <Button
            shape="round"
            className="w-[54px] rounded-[12px] !border px-3 sm:w-[42px] sm:!rounded-[10px]"
          >
            <Icon name={iconName} className="w-[30px] h-[30px] sm:w-[22px] sm:h-[22px]" />
          </Button>
          <Heading size="h2" as="h1" className="text-[65px] font-semibold sm:text-[40px]">
            {userCount}
          </Heading>
        </div>
      </div>
      <Heading
        as="h2"
        className="text-[24px] self-stretch text-center font-semibold sm:text-[16px]"
      >
        {sectionTitle}
      </Heading>
      <Text
        as="p"
        className="relative mt-[-2px] self-stretch text-center text-[18px] font-normal leading-[33px] sm:text-[12px] sm:leading-[20px] sm:mt-1"
      >
        {descriptionText}
      </Text>
    </div>
  );
}
