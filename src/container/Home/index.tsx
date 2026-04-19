"use client";
import React, { useState, useEffect } from "react";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgeGate from "@/components/AgeGate";
import EnrollModal from "@/components/EnrollModal";
import FAQSection from "@/components/FAQSection";
import OfferPopup, { OFFER_KEY } from "@/components/OfferPopup";

const featureBullets = [
  { title: "Results from session one" },
  { title: "First class is free" },
  { title: "Book in 60 seconds" },
];

export default function Home() {
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  // Show offer popup after 3s if not already dismissed/submitted
  useEffect(() => {
    const stored = localStorage.getItem(OFFER_KEY);
    if (stored === "submitted" || stored === "dismissed") return;
    const t = setTimeout(() => setShowOfferPopup(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Exit-intent: show popup when mouse leaves viewport from the top
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return; // only top exit
      const stored = localStorage.getItem(OFFER_KEY);
      if (stored === "submitted" || stored === "dismissed") return;
      setShowOfferPopup(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleWhatsAppClick = () => {
    setShowAgeGate(true);
  };

  const proceedToWhatsApp = () => {
    setShowAgeGate(false);
    trackWhatsAppClick();
    window.open("https://wa.link/pbywtu", "_blank", "noopener,noreferrer");
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

      {/* Floating WhatsApp button — bottom LEFT */}
      <div
        className="fixed sm:bottom-2 sm:left-2 bottom-4 left-4 z-[99] cursor-pointer"
        onClick={handleWhatsAppClick}
      >
        <Icon name="whatsAppIcon" />
      </div>

      {/* Floating Book Free Demo button — bottom RIGHT */}
      <button
        onClick={() => { trackJoinClassClick(); setShowModal(true); }}
        className="fixed sm:bottom-2 sm:right-2 bottom-4 right-4 z-[99] cursor-pointer font-bold text-[13px] sm:text-[12px] rounded-full shadow-lg transition-opacity hover:opacity-85"
        style={{
          background: "#f9cb00",
          color: "#0d0404",
          padding: "13px 22px",
          border: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(249,203,0,0.4)",
        }}
      >
        📅 Book Free Demo
      </button>

      {/* Age Gate modal — shown before WhatsApp redirect */}
      {showAgeGate && (
        <AgeGate
          destination="WhatsApp"
          onProceed={proceedToWhatsApp}
          onClose={() => setShowAgeGate(false)}
        />
      )}

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

        {/* ── 3D CHESS FLOOR — hidden on mobile to avoid overflow + perf ── */}
        <div
          className="absolute bottom-0 left-[-10%] right-[-10%] pointer-events-none sm:hidden"
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

        <div className="relative z-10 max-w-[1280px] mx-auto px-12 pt-6 pb-28 md:px-5 md:pb-16 sm:px-4 sm:pb-10">
          <Header />

          {/* Two-column hero */}
          <div className="flex items-center gap-14 mt-14 md:mt-8 sm:mt-6 lg:flex-row md:flex-col md:gap-8 sm:gap-6">

            {/* ── LEFT: hero copy ── */}
            <div className="flex-1 flex flex-col gap-10 md:gap-8 md:items-center md:text-center">

              {/* Social proof badge */}
              <div
                className="w-fit flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(249,203,0,0.1)",
                  border: "1px solid rgba(249,203,0,0.3)",
                }}
              >
                <span style={{ color: "#f9cb00", fontSize: "11px" }}>★★★★★</span>
                <span style={{ color: "#f9cb00", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  2,000+ Students · 4.8 / 5
                </span>
              </div>

              {/* Main headline */}
              <div className="flex flex-col gap-4">
                <h1
                  style={{
                    color: "#ffffff",
                    fontWeight: 900,
                    lineHeight: 1.04,
                    fontSize: "clamp(38px, 5.2vw, 64px)",
                    margin: 0,
                    letterSpacing: "-2px",
                  }}
                >
                  From Beginner to{" "}
                  <span style={{ color: "#f9cb00" }}>Tournament Winner</span>
                </h1>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.6vw, 18px)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.45)",
                    margin: 0,
                    letterSpacing: "0.1px",
                  }}
                >
                  Coached by national champions · Results in 90 days
                </p>
              </div>

              {/* Feature pills — horizontal row */}
              <div className="flex flex-wrap gap-3 md:justify-center">
                {featureBullets.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: "#f9cb00",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="10" height="8" viewBox="0 0 13 10" fill="none">
                        <path d="M1.5 5L5 8.5L11.5 1.5" stroke="#0d0404" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.82)", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: form card ── */}
            <div className="w-full" style={{ maxWidth: "460px", flexShrink: 0 }}>
              <MainContentSection />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCROLLING BANNER ─── */}
      <div className="w-full relative" style={{ backgroundColor: "#0d0404" }}>
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
      <div className="relative h-[1024px] content-center md:h-auto md:py-12 sm:py-8" style={{ backgroundColor: "#0d0404" }}>

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

      {/* ─── FAQ ─── */}
      <FAQSection />

      <Footer />

      {/* Offer popup — shows after 3s or on exit intent */}
      {showOfferPopup && (
        <OfferPopup onClose={() => setShowOfferPopup(false)} />
      )}

      {/* Floating Book Free Demo modal */}
      {showModal && (
        <EnrollModal plan="Free Demo Class" onClose={() => setShowModal(false)} />
      )}

      {/* Single global toast instance for entire page */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        style={{ top: "80px", zIndex: 9999 }}
      />
    </div>
  );
}
