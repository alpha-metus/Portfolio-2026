"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Img } from "../Img";
import { Button } from "../Button";
import { Text } from "../Text";
import { trackEvent } from "@/lib/fbPixel";
import AgeGate from "@/components/AgeGate";

interface Props {
  className?: string;
}

export default function Footer({ ...props }: Props) {
  const [gateTarget, setGateTarget] = useState<{ url: string; label: string } | null>(null);

  const handleSocialClick = (platform: string, url: string) => {
    trackEvent("SocialMedia_Event", {
      content_name: `${platform} Footer Click`,
      content_category: "Footer",
      source: "footer_section",
      method: "external_link",
    });
    // Show parental gate before opening social links
    setGateTarget({ url, label: platform });
  };

  const proceedToSocial = () => {
    if (gateTarget) window.open(gateTarget.url, "_blank", "noopener,noreferrer");
    setGateTarget(null);
  };
  return (
    <footer
      {...props}
      className={`${props.className} bg-black-900 flex flex-col items-start`}
    >
      <div className="mx-auto flex w-full max-w-[1218px] items-start justify-between gap-8 md:flex-col md:px-5 md:gap-10 pt-10 md:pt-8 sm:pt-6">
        <div className="flex flex-col items-start gap-10 md:gap-8">
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
            {/* WhatsApp — moved from floating button */}
            <button
              aria-label="Chat on WhatsApp"
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer" }}
              onClick={() => handleSocialClick("WhatsApp", "https://wa.me/17473249524")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>
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
            <a href="tel:+17473249524" className="flex items-center gap-2">
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
                +1 (747) 324-9524
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
            <ul className="flex w-[70%] flex-col items-start gap-4">
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
            <ul className="flex flex-col items-start gap-4">
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
                href="tel:+17473249524"
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
                  +1 (747) 324-9524
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
        <div className="mr-2.5 mt-14 h-px w-[90%] self-stretch bg-gray-400_7f md:mr-0" />
      </div>
      <div className="mr-2.5 mt-6 flex justify-between gap-5 self-stretch px-5 pb-6 md:mr-0 sm:flex-col sm:gap-3">
        <Text as="p" className="text-[16px] font-normal !text-white-a700_bf">
          <span>©2025.</span>
          <span className="font-bold">&nbsp;Kwinbee.All rights reserved</span>
        </Text>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/privacy-policy">
            <Text as="p" className="text-[16px] font-normal !text-white-a700_bf" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Privacy policy
            </Text>
          </Link>
          <Text as="p" className="text-[16px] font-normal !text-white-a700_bf">
            Terms &amp; conditions
          </Text>
        </div>
      </div>

      {/* Parental gate for social links */}
      {gateTarget && (
        <AgeGate
          destination={gateTarget.label}
          onProceed={proceedToSocial}
          onClose={() => setGateTarget(null)}
        />
      )}
    </footer>
  );
}
