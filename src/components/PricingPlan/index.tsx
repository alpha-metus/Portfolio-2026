import CheckMark from "@/assets/Icons/CheckMark";
import { Button, Heading, Img } from "./..";
import React from "react";
import { trackEvent } from "@/lib/fbPixel";

interface PricingPlanProps {
  duration: string;
  sessions: string;
  tournaments: string;
  assignments: string;
  dashboard: string;
  isBestseller?: boolean;
  className?: string;
}

export default function PricingPlan({
  duration,
  sessions,
  tournaments,
  assignments,
  dashboard,
  isBestseller,
  className = "",
}: PricingPlanProps) {
  const handleClick = (plan: string) => {
    trackEvent("Enroll_Event", {
      content_name: "Enroll Button",
      content_category: "Pricing Plan",
      source: "pricing_section",
      plan_name: plan,
      method: "calendly",
    });

    window.location.href = `${process.env.NEXT_PUBLIC_CALENDLY_APPOINTMENT_BOOK_URL}`;
  };
  return (
    <div
      className={`${className} relative w-full flex flex-col md:w-full p-[22px] sm:p-2.5 border-[3px] border-solid rounded-[30px] ${
        isBestseller ? "bg-yellow-400 border-yellow-400" : ""
      } ${isBestseller ? "text-black-900_01 " : "text-white-a700"}`}
    >
      {isBestseller && (
        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-black px-3 py-2 rounded-full bg-white-a700 text-xs font-bold border-t-2 border-t-black-900 z-10">
          BESTSELLER
        </div>
      )}
      <div className="relative mt-3 flex flex-col gap-2 items-center self-stretch">
        <div
          className={`self-start text-[24px] font-bold text-center w-full tracking-[-0.24px]`}
        >
          {duration}
        </div>
        <div className="mt-3 flex items-center gap-[9px] self-stretch">
          {isBestseller ? (
            <CheckMark color="black" />
          ) : (
            <Img
              width={20}
              height={20}
              src="img_checkmark.svg"
              alt="1 Course"
              className={`h-[20px]`}
            />
          )}
          <div
            className={`!font-nunitosans text-6 sm:text-[11px] font-bold tracking-[-0.20px] ${
              isBestseller ? "text-black-900_01 " : "text-white-a700"
            }`}
          >
            {sessions}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-[9px] self-stretch">
          {isBestseller ? (
            <CheckMark color="black" />
          ) : (
            <Img
              width={20}
              height={20}
              src="img_checkmark.svg"
              alt="1 Course"
              className={`h-[20px]`}
            />
          )}
          <div
            className={`!font-nunitosans text-6 sm:text-[11px] font-bold tracking-[-0.20px] ${
              isBestseller ? "text-black-900_01 " : "text-white-a700"
            }`}
          >
            {tournaments}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-[9px] self-stretch">
          {isBestseller ? (
            <CheckMark color="black" />
          ) : (
            <Img
              width={20}
              height={20}
              src="img_checkmark.svg"
              alt="1 Course"
              className={`h-[20px]`}
            />
          )}
          <div
            className={`!font-nunitosans text-6 sm:text-[11px] font-bold tracking-[-0.20px] ${
              isBestseller ? "text-black-900_01 " : "text-white-a700"
            }`}
          >
            {assignments}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-[9px] self-stretch">
          {isBestseller ? (
            <CheckMark color="black" />
          ) : (
            <Img
              width={20}
              height={20}
              src="img_checkmark.svg"
              alt="1 Course"
              className={`h-[20px]`}
            />
          )}
          <div
            className={`!font-nunitosans text-6 sm:text-[11px] font-bold tracking-[-0.20px] ${
              isBestseller ? "text-black-900_01 " : "text-white-a700"
            }`}
          >
            {dashboard}
          </div>
        </div>
        {isBestseller ? (
          <div
            onClick={() => handleClick(duration)}
            className={`flex w-fll justify-center mt-10 sm:my-2 cursor-pointer sm:w-[80%] items-center mx-[30px] sm:mx-auto bg-amber-a400_01 h-[54px] px-[34px] text-[20px] self-stretch rounded-[26px] border-[4px] border-solid border-black-900 font-quicksand font-bold tracking-[-0.20px] sm:px-5`}
          >
            Enroll
          </div>
        ) : (
          <Button
            onClick={() => handleClick(duration)}
            color="white_A700"
            size="md"
            variant="fill"
            className={`lg:mx-[30px] sm:mx-auto mt-10 sm:my-2 self-stretch rounded-[26px] border border-solid border-white-a700 sm:w-[80%] px-[33px] font-quicksand font-bold tracking-[-0.20px] sm:px-5`}
          >
            Enroll
          </Button>
        )}
      </div>
    </div>
  );
}
