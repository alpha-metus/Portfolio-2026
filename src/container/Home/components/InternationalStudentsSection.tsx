import { Heading, Img } from "@/components";
import UserProfile from "@/components/UserProfile";
import React, { Suspense } from "react";

const eventLocationsList = [
  {
    userImage: "bangladeshFlag",
    countryName: "Bangladesh",
    descriptionText: (
      <>
        Event madness gathering <br />
        innoies, & tech enthusiasts in Speced.
      </>
    ),
  },
  {
    userImage: "americaFlag",
    countryName: "United States",
    descriptionText: (
      <>
        Event madness gathering <br />
        innoies, & tech enthusiasts in Speced.
      </>
    ),
  },
  {
    userImage: "australiaFlag",
    countryName: "Australia",
    descriptionText: (
      <>
        Event madness gathering <br />
        innoies, & tech enthusiasts in Speced.
      </>
    ),
  },
  {
    userImage: "chinaFlag",
    countryName: "China",
    descriptionText: (
      <>
        Event madness gathering <br />
        innoies, & tech enthusiasts in Speced.
      </>
    ),
  },
];

export default function InternationalStudentsSection() {
  return (
    <>
      {/* international students section */}
      <div>
        <div className="flex justify-center bg-black-900 py-7 mt-20 lg:mt-0  sm:py-5">
          <div className="container-xs mb-[26px] flex justify-center px-14 md:px-5">
            <div className="flex w-full flex-col items-center md:w-full">
              <Heading
                as="h2"
                className="text-center sm:text-[29px] sm:leading-[40px] text-[55px] md:text-[47px] font-semibold"
              >
                <>
                  Trusted by students
                  <br />
                  across the globe
                </>
              </Heading>
              <p className="mt-4 text-[16px] text-white-a700_bf text-center max-w-[600px]">
                From India to the US, UK, Australia, Bangladesh, China and beyond — KwinBee coaches students in 10+ countries
              </p>
              <Img
                src="map2.svg"
                width={994}
                height={566}
                alt="Map"
                className="mt-14 h-full w-full md:h-auto"
              />
              {/* <div className="mx-[34px] mt-9 flex gap-4 self-stretch md:mx-0 md:flex-col">
                <Suspense fallback={<div>Loading feed...</div>}>
                  {eventLocationsList.map((d, index) => (
                    <UserProfile {...d} key={"listbangladesh" + index} />
                  ))}
                </Suspense>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
