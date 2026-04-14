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
      className={`${props.className} flex flex-col items-center md:w-full`}
    >
      <div className="flex w-[44%] flex-col items-center gap-3.5">
        <div className="ml-1.5 flex flex-col items-center gap-0.5 self-stretch">
          <Button
            shape="round"
            className="w-[54px] rounded-[12px] !border px-3"
          >
            <Icon name={iconName} className="w-[30px] h-[30px]" />
          </Button>
          <Heading size="h2" as="h1" className="text-[65px] font-semibold">
            {userCount}
          </Heading>
        </div>
      </div>
      <Heading
        as="h2"
        className="text-[24px] self-stretch text-center font-semibold"
      >
        {sectionTitle}
      </Heading>
      <Text
        as="p"
        className="relative mt-[-2px] self-stretch text-center text-[18px] font-normal leading-[33px]"
      >
        {descriptionText}
      </Text>
    </div>
  );
}
