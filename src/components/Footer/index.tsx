import Link from "next/link";
import React from "react";
import { Img } from "../Img";
import { Button } from "../Button";
import { Text } from "../Text";
import { trackEvent } from "@/lib/fbPixel";

interface Props {
  className?: string;
}

export default function Footer({ ...props }: Props) {
  const handleSocialClick = (platform: string, url: string) => {
    trackEvent("SocialMedia_Event", {
      content_name: `${platform} Footer Click`,
      content_category: "Footer",
      source: "footer_section",
      method: "external_link",
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <footer
      {...props}
      className={`${props.className} bg-black-900 flex flex-col items-start`}
    >
      <div className="mx-auto flex w-full max-w-[1218px] items-start justify-between gap-5 md:flex-col md:px-5">
        <div className="flex flex-col items-start gap-[46px]">
          <Img
            src="img_footer_logo.png"
            width={228}
            height={64}
            alt="Footerlogo"
            className="h-[64px] w-[228px] self-end object-contain"
          />
          <div className="flex gap-1.5">
            <Button
              color="white_A700_33"
              variant="fill"
              shape="circle"
              className="w-[52px] rounded-[26px] px-4"
              onClick={() =>
                handleSocialClick(
                  "Facebook",
                  "https://www.facebook.com/profile.php?id=61555420220545"
                )
              }
            >
              <Img src="img_facebook.svg" width={8} height={16} />
            </Button>
            <Button
              color="white_A700_33"
              variant="fill"
              shape="circle"
              className="w-[52px] rounded-[26px] px-2"
              onClick={() => handleSocialClick("Twitter", "https://x.com/kwinbee")}
            >
              <Img
                src="img_akar_icons_twitter_fill.svg"
                width={36}
                height={16}
              />
            </Button>
            <Button
              color="white_A700_33"
              variant="fill"
              shape="circle"
              className="w-[52px] rounded-[26px] px-4"
              onClick={() =>
                handleSocialClick(
                  "Instagram",
                  "https://www.instagram.com/kwinbee64?utm_source=qr&igsh=Z2xxZmVyaHR6cG12"
                )
              }
            >
              <Img
                src="img_akar_icons_instagram_fill.svg"
                width={16}
                height={16}
              />
            </Button>
          </div>
          <div className="hidden  lg:flex lg:flex-col lg:gap-1.5">
            <a href="tel:+919082303293" className="flex items-center gap-2">
              <Img
                src="callicon.png"
                width={24}
                height={24}
                alt="Phone"
                className="h-[24px] object-cover"
              />
              <Text
                as="p"
                className="text-[16px] font-normal !text-white-a700_bf"
              >
                +91 90823 03293
              </Text>
            </a>
            <a href="tel:+447786033126" className="flex items-center gap-2">
              <Img
                src="callicon.png"
                width={24}
                height={24}
                alt="Phone"
                className="h-[24px] object-cover"
              />
              <Text
                as="p"
                className="text-[16px] font-normal !text-white-a700_bf"
              >
                +44 7786 033126
              </Text>
            </a>
            <a href="tel:+13464309064" className="flex items-center gap-2">
              <Img
                src="callicon.png"
                width={24}
                height={24}
                alt="Phone"
                className="h-[24px] object-cover"
              />
              <Text
                as="p"
                className="text-[16px] font-normal !text-white-a700_bf"
              >
                +1 (346) 430-9064
              </Text>
            </a>
            <a
              href="mailto:chess@kwinbee.com"
              className="flex items-center gap-2"
              rel="noopener noreferrer"
            >
              <Img
                src="img_eva_email_fill.svg"
                width={24}
                height={24}
                alt="Email"
                className="h-[24px] self-end"
              />
              <Text
                as="p"
                className="text-[16px] font-normal !text-white-a700_bf"
              >
                chess@kwinbee.com
              </Text>
            </a>
          </div>
        </div>
        <div className="mt-3.5 flex w-[54%] items-start justify-between gap-5 self-end md:w-full sm:flex-col">
          <div className="mt-2 flex w-[46%] justify-between gap-5 sm:w-full">
            <ul className="flex w-[70%] flex-col items-start gap-[18px]">
              <li>
                <a href="/">
                  <Text as="p" className="text-[16px] font-normal">
                    Home
                  </Text>
                </a>
              </li>
              <li>
                <a href="#features">
                  <Text as="p" className="text-[16px] font-normal">
                    Features
                  </Text>
                </a>
              </li>
              <li>
                <a href="#about">
                  <Text as="p" className="text-[16px] font-normal">
                    About
                  </Text>
                </a>
              </li>
              <li>
                <a href="#contact">
                  <Text as="p" className="text-[16px] font-normal">
                    Contact
                  </Text>
                </a>
              </li>
            </ul>
            <ul className="flex flex-col items-start gap-[18px]">
              <li>
                <a href="#pricing">
                  <Text as="p" className="text-[16px] font-normal">
                    Pricing
                  </Text>
                </a>
              </li>
              <li>
                <a href="#features">
                  <Text as="p" className="text-[16px] font-normal">
                    Features
                  </Text>
                </a>
              </li>
              <li>
                <a href="#contact">
                  <Text as="p" className="text-[16px] font-normal">
                    Free Demo
                  </Text>
                </a>
              </li>
              <li>
                <a href="mailto:chess@kwinbee.com">
                  <Text as="p" className="text-[16px] font-normal">
                    Support
                  </Text>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex w-[34%] flex-col self-center sm:w-full">
            <div className="flex items-start gap-3">
              <Img
                src="img_linkedin.png"
                width={24}
                height={24}
                alt="Linkedin"
                className="mt-1.5 h-[24px] object-cover"
              />
              <Text
                as="p"
                className="self-center text-[16px] font-normal leading-[162.5%] !text-white-a700_bf"
              >
                <>
                  {" "}
                  236 Julie Dr. Lafayette, LA 70508
                  <br />
                  Pennsylvania
                  <br /> 18072
                </>
              </Text>
            </div>
            <div className="flex items-start gap-3">
              <Img
                src="img_linkedin.png"
                width={24}
                height={24}
                alt="Linkedin"
                className="mt-1.5 h-[24px] object-cover"
              />
              <Text
                as="p"
                className="self-center text-[16px] font-normal leading-[162.5%] !text-white-a700_bf"
              >
                <>
                  {" "}
                  156kh. No. 322 3rd floor,flat NoT-5 Sarai Vill
                  <br /> South Delhi - 110068
                </>
              </Text>
            </div>
            <div className="lg:hidden flex flex-col">
              <a
                href="tel:+919082303293"
                className="ml-1 mt-[18px] flex items-center gap-1.5 md:ml-0"
              >
                <Img
                  src="callicon.png"
                  width={24}
                  height={24}
                  alt="Linkedin"
                  className="h-[24px] object-cover"
                />
                <Text
                  as="p"
                  className="text-[16px] font-normal !text-white-a700_bf"
                >
                  +91 90823 03293
                </Text>
              </a>
              <a
                href="tel:+447786033126"
                className="ml-1 mt-[18px] flex items-center gap-1.5 md:ml-0"
              >
                <Img
                  src="callicon.png"
                  width={24}
                  height={24}
                  alt="Linkedin"
                  className="h-[24px] object-cover"
                />
                <Text
                  as="p"
                  className="text-[16px] font-normal !text-white-a700_bf"
                >
                  +44 7786 033126
                </Text>
              </a>
              <a
                href="tel:+13464309064"
                className="ml-1 mt-[18px] flex items-center gap-1.5 md:ml-0"
              >
                <Img
                  src="callicon.png"
                  width={24}
                  height={24}
                  alt="Linkedin"
                  className="h-[24px] object-cover"
                />
                <Text
                  as="p"
                  className="text-[16px] font-normal !text-white-a700_bf"
                >
                  +1 (346) 430-9064
                </Text>
              </a>
              <a
                href="mailto:chess@kwinbee.com"
                className="mt-[42px] flex items-center gap-2.5"
                rel="noopener noreferrer"
              >
                <Img
                  src="img_eva_email_fill.svg"
                  width={24}
                  height={24}
                  alt="Email"
                  className="h-[24px] self-end"
                />
                <Text
                  as="p"
                  className="text-[16px] font-normal !text-white-a700_bf"
                >
                  chess@kwinbee.com
                </Text>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="mr-2.5 mt-[54px] h-px w-[90%] self-stretch bg-gray-400_7f md:mr-0" />
      </div>
      <div className="mr-2.5 mt-[26px] flex justify-between gap-5 self-stretch px-5 pb-4 md:mr-0 sm:flex-col">
        <Text as="p" className="text-[16px] font-normal !text-white-a700_bf">
          <span>©2025.</span>
          <span className="font-bold">&nbsp;Kwinbee.All rights reserved</span>
        </Text>
        <div className="flex flex-wrap gap-2.5">
          <Text as="p" className="text-[16px] font-normal !text-white-a700_bf">
            Privacy policy
          </Text>
          <Text as="p" className="text-[16px] font-normal !text-white-a700_bf">
            Terms &amp; conditions
          </Text>
        </div>
      </div>
    </footer>
  );
}
