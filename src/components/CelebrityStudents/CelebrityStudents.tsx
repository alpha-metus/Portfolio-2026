import Image from "next/image";
import { celebrities } from "./config";

export default function CelebrityStudents() {
  return (
    <section id="about" className="pb-16 px-4 bg-black-900 text-white scroll-mt-20">
      <h2 className="text-3xl md:text-[47px] leading-normal sm:leading-none  lg:text-[55px] lg:mb-20 font-bold text-white-a700 text-center mb-12">
        Our Celebrity Students
      </h2>
      <div className="grid sm:grid-cols-2 place-items-center md:grid-cols-5 lg:grid-cols-5 gap-y-10 gap-x-4 max-w-6xl mx-auto">
        {celebrities.map((celeb, index) => (
          <div key={index} className="flex flex-col items-center text-center px-1">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden">
              <Image
                src={celeb.imageUrl}
                alt={celeb.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="mt-3 text-sm md:text-base text-white-a700 font-semibold">
              {celeb.name}
            </h3>
            <p className="text-xs text-gray-400">{celeb.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
