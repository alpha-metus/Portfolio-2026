import { Heading } from "@/components";
import InteractiveMap from "@/components/InteractiveMap";
import React from "react";

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
        <div className="flex justify-center bg-black-900 py-10 mt-16 md:mt-10 lg:mt-0 sm:py-8">
          <div className="container-xs mb-6 flex justify-center px-8 md:px-5 sm:px-4">
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
              <InteractiveMap />
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
