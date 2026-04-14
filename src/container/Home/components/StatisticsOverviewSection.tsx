import UserStatistics from "@/components/UserStatistics";
import React from "react";
import { userEngagementList } from "../config";

export default function StatisticsOverviewSection() {
  return (
    <>
      {/* statistics overview section */}
      <div className="pt-6 flex justify-center">
        <div className="container-xs flex justify-center md:px-5">
          <div className="flex w-full lg:justify-between md:flex-col">
            {userEngagementList.map((d, index) => (
              <UserStatistics {...d} key={"listshoppingbag" + index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
