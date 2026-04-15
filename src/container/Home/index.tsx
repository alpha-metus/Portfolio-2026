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
    icon: "♘",
    title: "Free first class",
    desc: "Analyze your current weaknesses with a pro.",
  },
  {
    icon: "♗",
    title: "No card required",
    desc: "Zero commitment to start your journey.",
  },
  {
    icon: "♖",
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
        {/* Subtle radial amber glow top-left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 0% 0%, rgba(249,203,0,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Chess board grid pattern background */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none md:hidden"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 30%, rgba(249,203,0,0.03) 30%, rgba(249,203,0,0.03) 70%, transparent 70%)",
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-12 pt-8 pb-20 md:px-5 md:pb-12">
          <Header />

          {/* Two-column hero */}
          <div className="flex items-center gap-14 mt-14 lg:flex-row md:flex-col md:gap-10">

            {/* ── LEFT: hero copy ── */}
            <div className="flex-1 flex flex-col gap-7 md:items-center md:text-center">

              {/* "Limited slots" badge */}
              <div
                className="w-fit flex items-center gap-2 rounded-full px-4 py-2"
                style={{ background: "#1e1e1e", border: "1px solid #333" }}
              >
                <span style={{ color: "#f9cb00", fontSize: "8px", lineHeight: 1 }}>●</span>
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Limited Slots Available
                </span>
              </div>

              {/* Main headline */}
              <div style={{ position: "relative" }}>
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
                {/* Decorative chess pieces around headline */}
                <span style={{ position: "absolute", top: "-10px", left: "-20px", fontSize: "32px", opacity: 0.3 }}>♖</span>
                <span style={{ position: "absolute", bottom: "-10px", right: "-20px", fontSize: "32px", opacity: 0.3 }}>♗</span>
              </div>

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
