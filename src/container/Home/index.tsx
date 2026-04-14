"use client";
import React from "react";
import StatisticsOverviewSection from "./components/StatisticsOverviewSection";
import ServicesOverviewSection from "./components/ServicesOverviewSection";
import PricingSection from "./components/PricingSection";
import InternationalStudentsSection from "./components/InternationalStudentsSection";
import MainContentSection from "./components/MainContentSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";
import { Img } from "@/components/Img";
import CelebrityStudents from "@/components/CelebrityStudents";
import Carousel from "@/components/Carousel";
import { bottomRowStudents, marqueeText, topRowStudents } from "./config";
import CustomCursor from "@/components/CustomCursor";
import { Typewriter } from "react-simple-typewriter";
import ScrollingBanner from "@/components/ScrollingBanner";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { trackJoinClassClick, trackWhatsAppClick } from "@/lib/fbPixel";
import Icon from "@/components/Icons";
import WhatsappIcon from "@/assets/Icons/WhatsappIcon";
import TestimonialsSection from "./components/TestimonialsSection";
import MidPageCTA from "./components/MidPageCTA";

export default function Home() {
  const isDesktop = useIsDesktop();

  const handleWhatsAppClick = () => {
    handleClick(`https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`);
    trackWhatsAppClick();
  };

  const handleJoinClassClick = () => {
    trackJoinClassClick();
  };

  const handleClick = (link: string) => {
    window.location.href = link;
  };
  return (
    <div className="w-full bg-black-900 ">
      <CustomCursor />
      {/* Announcement Bar */}
      <div className="w-full bg-amber-a400_01 py-2.5 px-4 text-center z-[100] relative">
        <p className="text-black-900_02 text-[13px] font-semibold tracking-wide">
          🎯 Limited spots available — Next batch starts soon.{" "}
          <a href="#contact" onClick={handleJoinClassClick} className="underline underline-offset-2 font-bold hover:opacity-80">
            Book your free demo now →
          </a>
        </p>
      </div>
      <div
        className="fixed sm:bottom-2 sm:right-2 bottom-4 right-4 z-[99] cursor-pointer"
        onClick={handleWhatsAppClick}
      >
        <Icon name="whatsAppIcon" />
      </div>
      <div className="relative h-auto lg:h-[1024px] bg-black-900_01">
        <div className="flex flex-1 bg-[radial-gradient(circle_at_15%_15%,rgba(250,204,0,0.9)_0%,rgba(13,4,4,0)_70%)] items-start md:flex-col">
          <div className="h-[722px] bg-gradient-to-b from-transparent via-[rgba(50,20,0,0.6)] to-[rgba(13,4,4,1)]  flex-1 self-center  bg-cover bg-no-repeat px-14 py-20 md:h-auto md:self-stretch md:p-5">
            <div className="w-full max-w-[1440px] m-auto">
              <div className="mt-[46px] flex flex-col gap-20 md:gap-[60px] sm:gap-10">
                <Header />
                <div className="lg:hidden">
                  <div className="flex flex-col items-center text-center">
                    {/* Social proof bar */}
                    <div className="flex items-center gap-2 mb-5 bg-white-a700_0a rounded-full px-4 py-2 border border-amber-400 border-opacity-30">
                      <span className="text-amber-400 text-[14px]">★★★★★</span>
                      <span className="text-white-a700 text-[12px] font-semibold">4.9/5</span>
                      <span className="text-white-a700_bf text-[12px]">· 2,000+ students trained</span>
                    </div>
                    <div className="w-full flex-col items-center gap-1">
                      <Heading
                        as="h1"
                        className="text-shadow-ts text-[32px] sm:text-[28px] font-semibold tracking-[0.74px] w-full mb-4"
                      >
                        Transform Your <br />
                        Chess Game with
                      </Heading>
                      <div className="flex justify-center w-full mb-6">
                        <div className="relative h-[55px] w-[70%] sm:w-full">
                          <div className="absolute bottom-0 left-0 right-0 top-0 h-[50px] flex-1 rounded-[25px] bg-amber-a400_01 shadow-sm" />
                          <Heading
                            as="h2"
                            className="text-shadow-ts absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center h-max w-full text-[32px] sm:text-[28px] font-semibold tracking-[0.74px] !text-black-900_02"
                          >
                            <Typewriter
                              words={[
                                "Expert Coaching",
                                "Elite Training",
                                "Tournament Prep",
                              ]}
                              loop={0}
                              cursor
                              cursorStyle="|"
                              typeSpeed={70}
                              deleteSpeed={50}
                              delaySpeed={1500}
                            />
                          </Heading>
                        </div>
                      </div>
                    </div>
                    <Heading
                      size="headings"
                      as="h3"
                      className="text-[15.42px] font-semibold tracking-[0.23px] mb-8"
                    >
                      From beginner to tournament-ready — trained by national &amp; international champions.
                    </Heading>
                    <div className="flex gap-4 flex-wrap justify-center w-full mb-4">
                      <a
                        href="#contact"
                        onClick={handleJoinClassClick}
                        className="min-w-[174px] cursor-pointer rounded-[24px] text-black-900_02 bg-amber-a400_01 flex justify-center items-center border-amber-a400_01 !border-[3.85px] px-[34px] font-bold tracking-[0.23px] sm:h-[50px] sm:px-5"
                      >
                        Book Free Demo
                      </a>
                      <Button
                        onClick={handleWhatsAppClick}
                        color="white_A700"
                        size="xs"
                        variant="outline"
                        className="min-w-[174px] cursor-pointer rounded-[24px] border-[2px] border-solid border-white-a700 px-[33.23px] font-semibold tracking-[0.23px] sm:px-5"
                      >
                        Chat on WhatsApp
                      </Button>
                    </div>
                    <p className="text-[12px] text-amber-400 font-medium tracking-wide">
                      ✓ Free first class &nbsp;·&nbsp; ✓ No commitment &nbsp;·&nbsp; ✓ Flexible scheduling
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start lg:block md:hidden sm:hidden">
                  {/* Desktop social proof badge */}
                  <div className="flex items-center gap-2 mb-5 bg-white-a700_0a rounded-full px-4 py-2 border border-amber-400 border-opacity-30 w-fit">
                    <span className="text-amber-400 text-[15px]">★★★★★</span>
                    <span className="text-white-a700 text-[13px] font-semibold">4.9/5</span>
                    <span className="text-white-a700_bf text-[13px]">· 2,000+ students trained worldwide</span>
                  </div>
                  <div className="flex sm:mt-10 w-[50%] flex-col items-center gap-1 md:w-full">
                    <Heading
                      as="h1"
                      className="text-shadow-ts text-[49.34px] font-semibold tracking-[0.74px] md:text-[32px] sm:text-[28px] sm:text-center md:text-start w-full"
                    >
                      Transform Your <br />
                      Chess Game with
                    </Heading>
                    <div className="flex lg:flex-start w-full sm:justify-center lg:w-full">
                      <div className="relative h-[74px] w-[80%] sm:h-[55px]">
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-[68px] flex-1 rounded-[34px] bg-amber-a400_01 shadow-sm sm:h-[50px]" />
                        <Heading
                          as="h2"
                          className="text-shadow-ts absolute bottom-0 left-0 right-0 top-0 pl-2  h-max w-max text-[49.34px] font-semibold tracking-[0.74px] !text-black-900_02 md:text-[32px] sm:text-[28px]"
                        >
                          <Typewriter
                            words={[
                              "Expert Coaching",
                              "Elite Training",
                              "Tournament Prep",
                            ]}
                            loop={0}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                          />
                        </Heading>
                      </div>
                    </div>
                  </div>
                  <Heading
                    size="headings"
                    as="h3"
                    className="ml-5 mt-[26px] text-[15.42px] font-semibold tracking-[0.23px] md:ml-0 sm:text-center sm:w-full"
                  >
                    From beginner to tournament-ready — trained by national &amp; international champions.
                  </Heading>
                  <div className="mx-3.5 mt-[68px] flex flex-col gap-4 self-stretch md:mx-0">
                    <div className="flex gap-[37px] sm:justify-center sm:flex-wrap sm:gap-4">
                      <a
                        href="#contact"
                        onClick={handleJoinClassClick}
                        className="min-w-[174px] cursor-pointer rounded-[24px] text-black-900_02 bg-amber-a400_01 flex justify-center items-center border-amber-a400_01 !border-[3.85px] px-[34px] font-bold tracking-[0.23px] sm:px-5 py-3"
                      >
                        Book Free Demo
                      </a>
                      <Button
                        onClick={handleWhatsAppClick}
                        color="white_A700"
                        size="xs"
                        variant="outline"
                        className="min-w-[174px] cursor-pointer rounded-[24px] border-[2px] border-solid border-white-a700 px-[33.23px] font-semibold tracking-[0.23px] sm:px-5"
                      >
                        Chat on WhatsApp
                      </Button>
                    </div>
                    <p className="text-[13px] text-amber-400 font-medium tracking-wide ml-1">
                      ✓ Free first class &nbsp;·&nbsp; ✓ No commitment &nbsp;·&nbsp; ✓ Flexible scheduling
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="lg:hidden relative mt-8 px-5">
            <div className="flex flex-col items-center">
              {/* Main Chess Winner Image */}
              <div className="relative mb-8">
                <div className="flex absolute top-[14%] left-[-25%] z-10 items-center justify-center mb-4 gap-3 rounded-[24px] bg-amber-a400_01 px-4 py-3 shadow-sm">
                  <Img
                    src="img_lock.svg"
                    width={24}
                    height={24}
                    alt="Lock"
                    className="h-[24px]"
                  />
                  <Heading
                    as="h3"
                    className="sm:text-[7px] md:text-[12px] font-semibold whitespace-nowrap"
                  >
                    1400+ Students
                  </Heading>
                </div>
                <div className="relative pointer-events-none rounded-[180px] h-full  bg-[url(/images/img_group_20.png)] bg-cover bg-no-repeat mx-auto w-[80%] max-w-[300px] sm:h-auto py-2 mb-4">
                  <Img
                    src="img_chess_winner_1.png"
                    width={362}
                    height={546}
                    alt="Chesswinnerone"
                    className="h-full w-full pointer-events-none rounded-[180px] object-cover md:h-auto sm:h-auto sm:max-h-[350px] sm:rounded-[180px]"
                  />
                </div>
                {/* Stats Cards - Positioned around the image */}
                <div className="flex w-full flex-col mt-4 gap-4">
                  <div className="flex absolute top-[30%] right-[-25%] z-10 justify-center items-center gap-3 rounded-[24px] bg-amber-a400_01 px-4 py-3 shadow-sm">
                    <Img
                      src="img_teaching_1_1.png"
                      width={32}
                      height={28}
                      alt="Teaching1one"
                      className="h-[28px] object-cover"
                    />
                    <Heading
                      as="h2"
                      className="sm:text-[7px] md:text-[12px] font-semibold whitespace-nowrap"
                    >
                      100+ Teachers
                    </Heading>
                  </div>
                  <div className="flex absolute bottom-[20%] left-[-25%] z-10 justify-center items-center gap-3 rounded-[24px] bg-amber-a400_01 px-4 py-3 shadow-sm">
                    <Img
                      src="img_food_menu.svg"
                      width={24}
                      height={26}
                      alt="Foodmenu"
                      className="h-[26px]"
                    />
                    <Heading
                      as="h4"
                      className="sm:text-[7px] md:text-[12px] font-semibold whitespace-nowrap"
                    >
                      1000+ Assignments
                    </Heading>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[99%] relative lg:hidden block h-max mt-10 bg-black-900">
            <div className="gradient absolute pointer-events-none z-10 top-[-50%] overflow-hidden h-[200px] right-0 w-1/6 bg-gradient-to-r from-transparent to-black-900"></div>
            <div className="gradient absolute pointer-events-none z-10 top-0 overflow-hidden h-[200px] left-0 w-1/5 bg-gradient-to-l from-transparent to-black-900"></div>
            <ScrollingBanner items={marqueeText} />
          </div>
        </div>
        <div className="absolute pointer-events-none bottom-[7.70px] left-0 right-0 mx-auto flex flex-1 flex-col items-center sm:static sm:bottom-auto sm:mt-8">
          <div className="container-xs md:px-5 lg:block md:hidden">
            <div className="relative h-[582px] content-center md:h-auto sm:h-auto">
              <div className="flex flex-1 items-start md:flex-col">
                <div className="flex flex-1 items-start justify-end self-center md:self-stretch sm:flex-col sm:items-center">
                  <div className="relative  z-[2] mt-[116px] flex w-[18%] justify-center items-center gap-7 rounded-[32px] bg-amber-a400_01 p-2.5 shadow-sm sm:w-[80%] sm:mt-6 sm:mb-4">
                    <Img
                      src="img_teaching_1_1.png"
                      width={42}
                      height={38}
                      alt="Teaching1one"
                      className="mt-1.5 h-[38px] object-cover"
                    />
                    <Heading as="h2" className="text-[13.88px] font-semibold">
                      100+ Teachers
                    </Heading>
                  </div>
                  <div className="sm:relative ml-[-96px] pointer-events-none rounded-[180px] lg:rounded-none h-full w-[30%] bg-[url(/images/img_group_20.png)] bg-cover bg-no-repeat py-4 md:absolute md:top-[50%] sm:ml-0 sm:w-[80%] sm:h-auto sm:py-2 lg:mt-4 sm:mb-4">
                    <Img
                      src="img_chess_winner_1.png"
                      width={362}
                      height={546}
                      alt="Chesswinnerone"
                      className="h-full w-full pointer-events-none rounded-[180px] object-cover md:h-auto sm:h-auto sm:max-h-[350px] sm:rounded-[180px]"
                    />
                  </div>
                </div>
                <div className="relative ml-[-60px] mt-[186px] flex w-[16%] items-center justify-center gap-[26px] rounded-[32px] bg-amber-a400_01 p-3.5 shadow-sm md:ml-0 md:w-full sm:mt-4 sm:mb-4 sm:w-[80%] sm:mx-auto">
                  <Img
                    src="img_lock.svg"
                    width={32}
                    height={32}
                    alt="Lock"
                    className="h-[32px]"
                  />
                  <Heading as="h3" className="text-[13.88px] font-semibold">
                    1400+ Students
                  </Heading>
                </div>
              </div>
              <div className="absolute bottom-[13%] right-[32%] m-auto flex flex-row sm:flex-row items-center gap-3 rounded-[32px] bg-amber-a400_01 px-4 py-3.5 shadow-sm md:relative md:flex-col sm:static sm:w-[80%] sm:mx-auto sm:mt-4 sm:justify-center">
                <Img
                  src="img_food_menu.svg"
                  width={32}
                  height={34}
                  alt="Foodmenu"
                  className="h-[34px]"
                />
                <Heading as="h4" className="text-[13.88px] font-semibold">
                  1000+ Assignments
                </Heading>
              </div>
            </div>
          </div>
          <div className="relative z-[3] mt-[-16px] flex gap-[108px] self-stretch py-20 pl-[244px] pr-14 md:flex-col md:p-5 sm:py-10 sm:mt-6 sm:gap-8"></div>
          {/* {isDesktop && ( */}
          <div className="w-full md:hidden lg:block h-max relative bg-black-900">
            <div className="gradient absolute pointer-events-none z-10 top-[-50%] overflow-hidden h-[210%] right-0 w-1/6 bg-gradient-to-r from-transparent to-black-900"></div>
            <div className="gradient absolute pointer-events-none z-10 top-0 overflow-hidden h-[200%] left-0 w-1/5 bg-gradient-to-l from-transparent to-black-900"></div>
            <ScrollingBanner items={marqueeText} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[1440px] m-auto lg:gap-[138px] pt-16 bg-black-900 md:py-5 gap-0">
        <StatisticsOverviewSection />
        <ServicesOverviewSection />
      </div>
      <div className="bg-black-900 pt-44 md:py-5">
        <CelebrityStudents />
      </div>
      <div className="relative h-[1024px] content-center bg-black-900 md:h-auto">
        {/* Background Gradients - Desktop Only */}
        <div className="absolute pointer-events-none z-10 left-0 top-0 bottom-0  my-auto h-[1024px] w-[36%] bg-gradient" />
        <div className="absolute pointer-events-none bottom-0 right-0 top-0 z-10 my-auto h-[1024px] w-[36%] rotate-[-180deg] bg-gradient" />

        {/* Main Content Container */}
        <div className="relative z-[5] flex flex-col h-full md:h-auto">
          {/* Header */}
          <div className="flex flex-col items-center pt-[52px] md:pt-8 sm:pt-10 mb-[100px] md:mb-16 sm:mb-8 gap-3">
            <Heading
              size="h3"
              as="h2"
              className="text-[55px] font-semibold md:text-[47px] sm:text-[41px] text-center px-5"
            >
              Real Students, Real Results
            </Heading>
            <p className="text-[16px] text-white-a700_bf text-center px-5">
              Join thousands of students who have leveled up their chess game with KwinBee
            </p>
          </div>

          {/* Carousels Container */}
          <div className="flex-1 relative md:static">
            {/* Top Carousel */}
            <div className="absolute top-0 right-0 z-[7] h-[322px] w-full rounded-[20px] md:relative md:w-[94%] md:mx-auto md:mb-6 sm:static sm:w-[99%] sm:h-auto sm:mx-auto sm:mb-6">
              <Carousel
                students={topRowStudents}
                direction="right"
                speed={20}
              />
            </div>

            {/* Bottom Carousel */}
            <div className="absolute bottom-0 left-0 z-[8] h-[344px] w-full rounded-[20px] md:relative md:w-[94%] md:mx-auto sm:static sm:w-[94%] sm:h-auto sm:mx-auto">
              <Carousel
                students={bottomRowStudents}
                direction="left"
                speed={20}
              />
            </div>
          </div>

        </div>
      </div>
      {/* testimonials */}
      <TestimonialsSection />
      {/* international students section */}
      <InternationalStudentsSection />
      {/* mid-page CTA */}
      <MidPageCTA />
      <div className="w-full bg-black-900">
        <div className="sm:px-5 sm:pb-20 sm:pt-4 px-[72px] pb-[151px] max-w-[1440px] m-auto bg-black-900">
          <MainContentSection />
        </div>
      </div>
      <div className="w-full  bg-black-900">
        <div className="bg-black-900 pb-16 px-4 max-w-[1440px] m-auto lg:px-[48px] md:py-5">
          <PricingSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
