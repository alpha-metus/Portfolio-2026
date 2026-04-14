import Link from "next/link";
import { Img } from "@/components";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-black-900 overflow-hidden">
      <div className="h-full w-full bg-[radial-gradient(circle_at_35%_35%,rgba(250,204,0,0.9)_0%,rgba(13,4,4,0)_70%)] px-4 pt-6 relative">
        <div className="w-full max-w-[1440px] m-auto relative h-full">
          <div className="flex w-full justify-between flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-0">
            <Link href="/">
              <Img
                src="img_header_logo.png"
                width={120}
                height={34}
                alt="Headerlogo"
                className="h-[34px] w-[120px] object-contain cursor-pointer"
              />
            </Link>
            <div className="flex flex-col gap-8 leading-tight text-center lg:text-left">
              <div className="text-white-a700 font-bold leading-none text-[48px] sm:text-[72px] md:text-[100px] lg:text-[200px]">
                Not you
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-10 justify-between items-center w-full pr-4">
            <div className="flex-1 flex justify-center items-center">
              <Img
                src="maintainance_banner.png"
                width={600}
                height={600}
                alt="Maintenance Banner"
                className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-auto object-contain"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="text-white-a700 text-center font-semibold text-[32px] sm:text-[48px] md:text-[72px] lg:text-[100px]">
                It’s us 😕
              </div>
              <div className="text-[#7C7C7C] font-semibold pt-6 text-[18px] sm:text-[24px] md:text-[32px] lg:text-[50px]">
                We are fixing the error....
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
