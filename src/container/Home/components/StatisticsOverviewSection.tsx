import UserStatistics from "@/components/UserStatistics";
import React from "react";
import { userEngagementList } from "../config";

export default function StatisticsOverviewSection() {
  return (
    <>
      {/* statistics overview section */}
      <div className="pt-6 flex justify-center">
        <div className="container-xs flex justify-center md:px-5">
          <div className="flex w-full lg:justify-between md:grid md:grid-cols-2 md:gap-8 sm:grid-cols-2">
            {userEngagementList.map((d, index) => (
              <UserStatistics {...d} key={"listshoppingbag" + index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
