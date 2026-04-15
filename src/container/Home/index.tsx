"use client";
import React from "react";
import StatisticsOverviewSection from "./components/StatisticsOverviewSection";
import ServicesOverviewSection from "./components/ServicesOverviewSection";
import PricingSection from "./components/PricingSection";
import InternationalStudentsSection from "./components/InternationalStudentsSection";
import MainContentSection from "./components/MainContentSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CelebrityStudents from "@/components/CelebrityStudents";
import Carousel from "@/components/Carousel";
import { bottomRowStudents, marqueeText, topRowStudents } from "./config";
import CustomCursor from "@/components/CustomCursor";
import ScrollingBanner from "@/components/ScrollingBanner";
import { trackJoinClassClick, trackWhatsAppClick } from "@/lib/fbPixel";
import Icon from "@/components/Icons";
import TestimonialsSection from "./components/TestimonialsSection";
import MidPageCTA from "./components/MidPageCTA";
import { Heading } from "@/components/Heading";

const featureBullets = [
  {
    icon: "♟",
    title: "Free first class",
    desc: "Analyze your current weaknesses with a pro.",
  },
  {
    icon: "♟",
    title: "No card required",
    desc: "Zero commitment to start your journey.",
  },
  {
    icon: "♟",
    title: "Instant confirmation",
    desc: "Get scheduled within minutes of booking.",
  },
];

export default function Home() {
  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
    trackWhatsAppClick();
  };

  const handleJoinClassClick = () => {
    trackJoinClassClick();
  };

  return (
    <div className="w-full" style={{ backgroundColor: "#0d0404" }}>
      <CustomCursor />

      {/* Announcement Bar */}
      <div style={{ backgroundColor: "#f9cb00" }} className="w-full py-2.5 px-4 text-center relative z-50">
        <p style={{ color: "#000", fontSize: "13px", fontWeight: 600 }}>
          🎯 Limited spots available — Next batch starts soon.{" "}
          <a
            href="#contact"
            onClick={handleJoinClassClick}
            style={{ fontWeight: 700, textDecoration: "underline" }}
          >
            Book your free demo now →
          </a>
        </p>
      </div>

      {/* Floating WhatsApp button */}
      <div
        className="fixed sm:bottom-2 sm:right-2 bottom-4 right-4 z-[99] cursor-pointer"
        onClick={handleWhatsAppClick}
      >
        <Icon name="whatsAppIcon" />
      </div>

      {/* ─── HERO SECTION ─── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0d0404" }}
      >
        {/* ── BASE: warm dark gradient ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(160deg, #1c0c02 0%, #0d0404 50%, #080202 100%)" }}
        />

        {/* ── 3D CHESS FLOOR — perspective board receding into the horizon ── */}
        {/* Outer wrapper: apply the perspective+tilt */}
        <div
          className="absolute bottom-0 left-[-10%] right-[-10%] pointer-events-none"
          style={{
            height: "62%",
            transform: "perspective(700px) rotateX(58deg)",
            transformOrigin: "50% 100%",
          }}
        >
          {/* Inner: the actual chessboard squares */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(45deg, rgba(249,203,0,0.22) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(249,203,0,0.22) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(249,203,0,0.22) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(249,203,0,0.22) 75%)
              `,
              backgroundSize: "90px 90px",
              backgroundPosition: "0 0, 0 45px, 45px -45px, -45px 0",
              /* fade from fully visible at bottom to invisible at top */
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 100%)",
            }}
          />
          {/* Subtle grid lines on top of squares for crispness */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(249,203,0,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(249,203,0,0.12) 1px, transparent 1px)
              `,
              backgroundSize: "90px 90px",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.9) 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.9) 100%)",
            }}
          />
        </div>

        {/* ── Fade the bottom edge of the floor so it blends with content ── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "28%",
            background: "linear-gradient(to top, #0d0404 0%, transparent 100%)",
          }}
        />

        {/* ── Amber spotlight — top-left warm accent ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%", left: "-8%",
            width: "60%", height: "90%",
            background: "radial-gradient(ellipse, rgba(249,203,0,0.16) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-12 pt-8 pb-20 md:px-5 md:pb-12">
          <Header />

          {/* Two-column hero */}
          <div className="flex items-center gap-14 mt-14 lg:flex-row md:flex-col md:gap-10">

            {/* ── LEFT: hero copy ── */}
            <div className="flex-1 flex flex-col gap-7 md:items-center md:text-center">

              {/* "Limited slots" pill */}
              <div className="w-fit flex items-center gap-3">
                <span style={{ display: "block", width: "28px", height: "2px", backgroundColor: "#f9cb00", borderRadius: "2px" }} />
                <span
                  style={{
                    color: "#f9cb00",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Limited Slots Available
                </span>
              </div>

              {/* Main headline */}
              <h1
                style={{
                  color: "#ffffff",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  fontSize: "clamp(42px, 5.5vw, 72px)",
                  margin: 0,
                }}
              >
                Master the
                <br />
                <span style={{ color: "#f9cb00" }}>Strategic</span> Edge.
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "17px",
                  lineHeight: 1.75,
                  maxWidth: "480px",
                  margin: 0,
                }}
              >
                Experience world-class coaching from Grandmasters.
                No generic puzzles, just deep strategic mastery
                tailored to your playstyle.
              </p>

              {/* Feature bullets */}
              <div className="flex flex-col gap-4 md:items-start md:self-start">
                {featureBullets.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        backgroundColor: "#f9cb00",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "15px",
                        color: "#000",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "15px",
                          margin: 0,
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "13px",
                          margin: 0,
                          marginTop: "2px",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: form card ── */}
            <div
              className="w-full md:w-full"
              style={{ maxWidth: "460px", flexShrink: 0 }}
            >
              <MainContentSection />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCROLLING BANNER ─── */}
      <div className="w-full relative" style={{ backgroundColor: "#0d0404" }}>
        <div className="absolute pointer-events-none z-10 top-0 right-0 h-full w-1/6 bg-gradient-to-r from-transparent to-black" />
        <div className="absolute pointer-events-none z-10 top-0 left-0 h-full w-1/6 bg-gradient-to-l from-transparent to-black" />
        <ScrollingBanner items={marqueeText} />
      </div>

      {/* ─── STATISTICS + SERVICES ─── */}
      <div className="flex flex-col w-full max-w-[1440px] m-auto gap-[138px] pt-16 md:gap-12 md:pt-8 md:px-5">
        <StatisticsOverviewSection />
        <ServicesOverviewSection />
      </div>

      {/* ─── CELEBRITY STUDENTS ─── */}
      <div style={{ backgroundColor: "#0d0404" }} className="pt-44 md:pt-12 md:px-5">
        <CelebrityStudents />
      </div>

      {/* ─── REAL STUDENTS CAROUSELS ─── */}
      <div className="relative h-[1024px] content-center md:h-auto" style={{ backgroundColor: "#0d0404" }}>
        <div className="absolute pointer-events-none z-10 left-0 top-0 bottom-0 my-auto h-[1024px] w-[36%] bg-gradient" />
        <div className="absolute pointer-events-none bottom-0 right-0 top-0 z-10 my-auto h-[1024px] w-[36%] rotate-[-180deg] bg-gradient" />

        <div className="relative z-[5] flex flex-col h-full md:h-auto">
          <div className="flex flex-col items-center pt-[52px] md:pt-8 mb-[100px] md:mb-16 gap-3 px-5">
            <Heading
              size="h3"
              as="h2"
              className="text-[55px] font-semibold md:text-[40px] sm:text-[32px] text-center"
            >
              Real Students, Real Results
            </Heading>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", textAlign: "center" }}>
              Join thousands of students who have levelled up their chess game with KwinBee
            </p>
          </div>

          <div className="flex-1 relative md:static">
            <div className="absolute top-0 right-0 z-[7] h-[322px] w-full rounded-[20px] md:relative md:w-[94%] md:mx-auto md:mb-6 sm:static sm:w-[99%] sm:h-auto sm:mb-6">
              <Carousel students={topRowStudents} direction="right" speed={20} />
            </div>
            <div className="absolute bottom-0 left-0 z-[8] h-[344px] w-full rounded-[20px] md:relative md:w-[94%] md:mx-auto sm:static sm:w-[94%] sm:h-auto sm:mb-6">
              <Carousel students={bottomRowStudents} direction="left" speed={20} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── INTERNATIONAL STUDENTS ─── */}
      <InternationalStudentsSection />

      {/* ─── MID-PAGE CTA ─── */}
      <MidPageCTA />

      {/* ─── PRICING ─── */}
      <div style={{ backgroundColor: "#0d0404" }} className="w-full">
        <div className="pb-[151px] px-[72px] max-w-[1440px] m-auto md:px-5 md:pb-16">
          <PricingSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}
