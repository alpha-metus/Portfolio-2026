"use client";
import React, { useState, useEffect } from "react";
import StatisticsOverviewSection from "./components/StatisticsOverviewSection";
import ServicesOverviewSection from "./components/ServicesOverviewSection";
import PricingSection from "./components/PricingSection";
import InternationalStudentsSection from "./components/InternationalStudentsSection";
import MainContentSection from "./components/MainContentSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CelebrityStudents from "@/components/CelebrityStudents/CelebrityStudents";
import Carousel from "@/components/Carousel/Carousel";
import { bottomRowStudents, marqueeText, topRowStudents } from "./config";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import ScrollingBanner from "@/components/ScrollingBanner/ScrollingBanner";
import { trackJoinClassClick, trackWhatsAppClick } from "@/lib/fbPixel";
import TestimonialsSection from "./components/TestimonialsSection";
import MidPageCTA from "./components/MidPageCTA";
import { Heading } from "@/components/Heading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgeGate from "@/components/AgeGate";
import EnrollModal from "@/components/EnrollModal";
import FAQSection from "@/components/FAQSection";
import OfferPopup, { OFFER_SUBMITTED_KEY, OFFER_DISMISSED_SESSION_KEY } from "@/components/OfferPopup";
import CompaniesSection from "./components/CompaniesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ClickSpark from "@/components/ClickSpark";

const featureBullets = [
  { title: "Results from session one" },
  { title: "First class is free" },
  { title: "Book in 60 seconds" },
];

export default function Home() {
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  const shouldSuppressPopup = () =>
    localStorage.getItem(OFFER_SUBMITTED_KEY) === "1" ||
    sessionStorage.getItem(OFFER_DISMISSED_SESSION_KEY) === "1";

  // Show offer popup after 3s — suppressed only if submitted (permanent) or dismissed this session
  useEffect(() => {
    if (shouldSuppressPopup()) return;
    const t = setTimeout(() => setShowOfferPopup(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Exit-intent: mouse leaves viewport from the top
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return;
      if (shouldSuppressPopup()) return;
      setShowOfferPopup(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Live viewer count — stable SSR value (14) then randomised client-side to avoid hydration mismatch / CLS
  const [viewers, setViewers] = useState(14);
  useEffect(() => {
    // Set random starting value only after hydration — no server/client mismatch
    setViewers(9 + Math.floor(Math.random() * 9));
    const iv = setInterval(() => {
      setViewers((v) => Math.min(24, Math.max(7, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 6000);
    return () => clearInterval(iv);
  }, []);

  const handleWhatsAppClick = () => {
    setShowAgeGate(true);
  };

  const proceedToWhatsApp = () => {
    setShowAgeGate(false);
    trackWhatsAppClick();
    window.open("https://wa.me/17473249524", "_blank", "noopener,noreferrer");
  };

  const handleJoinClassClick = () => {
    trackJoinClassClick();
  };

  return (
    <ClickSpark
      sparkColor="#f9cb00"
      sparkSize={10}
      sparkRadius={18}
      sparkCount={8}
      duration={420}
      easing="ease-out"
      extraScale={1.2}
    >
    <div className="w-full sm:pb-20" style={{ backgroundColor: "#0d0404" }}>
      <CustomCursor />

      {/* Announcement Bar */}
      <div style={{ backgroundColor: "#f9cb00" }} className="announcement-bar w-full py-2 sm:py-1.5 px-4 text-center relative z-50">
        <p style={{ color: "#000", fontWeight: 600, lineHeight: 1.5 }} className="text-[12px] sm:text-[11px]">
          🔥 <strong>3 free demo spots</strong> left this week —{" "}
          <a
            href="#contact"
            onClick={handleJoinClassClick}
            style={{ fontWeight: 800, textDecoration: "underline", display: "inline" }}
          >
            Claim yours now →
          </a>
        </p>
      </div>

      {/* Desktop floating pill — hidden on mobile */}
      <button
        onClick={() => { trackJoinClassClick(); setShowModal(true); }}
        className="floating-cta fixed bottom-5 right-5 z-[99] cursor-pointer font-bold text-[13px] rounded-full shadow-lg transition-opacity hover:opacity-85 sm:hidden"
        style={{
          background: "#f9cb00",
          color: "#0d0404",
          padding: "13px 22px",
          border: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(249,203,0,0.4)",
        }}
      >
        Book Free Demo
      </button>

      {/* Mobile bottom action bar — visible only on mobile (sm = max 550px) */}
      <div
        className="hidden sm:flex fixed bottom-0 left-0 right-0 z-[99] items-center gap-2 px-4 py-3"
        style={{
          background: "rgba(13,4,4,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(249,203,0,0.2)",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <button
          onClick={() => { trackJoinClassClick(); setShowModal(true); }}
          className="flex-1 font-bold text-[15px] rounded-full cursor-pointer transition-opacity active:opacity-75"
          style={{
            background: "#f9cb00",
            color: "#0d0404",
            padding: "14px 20px",
            border: "none",
            boxShadow: "0 4px 16px rgba(249,203,0,0.35)",
          }}
        >
          🎯 Book Free Demo
        </button>
        <a
          href="https://wa.me/17473249524"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{
            width: 50,
            height: 50,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          aria-label="WhatsApp"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

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

        {/* ── Amber spotlight — reduced since aurora handles warm glow ── */}
        <div
          className="absolute pointer-events-none sm:hidden"
          style={{
            top: "-20%", left: "-8%",
            width: "60%", height: "90%",
            background: "radial-gradient(ellipse, rgba(249,203,0,0.07) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-12 pt-6 pb-28 md:px-5 md:pb-16 sm:px-4 sm:pt-4 sm:pb-8">
          <Header />

          {/* Two-column hero */}
          <div className="flex items-center gap-14 mt-14 md:mt-8 sm:mt-6 lg:flex-row md:flex-col md:gap-8 sm:gap-6">

            {/* ── LEFT: hero copy ── */}
            <div className="flex-1 flex flex-col gap-10 md:gap-8 sm:gap-5 md:items-center md:text-center sm:w-full">

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
                  className="hero-h1"
                  style={{
                    color: "#ffffff",
                    fontWeight: 900,
                    lineHeight: 1.08,
                    fontSize: "clamp(38px, 5.2vw, 64px)",
                    margin: 0,
                    letterSpacing: "-2px",
                  }}
                >
                  From Beginner to{" "}
                  <span style={{ color: "#f9cb00" }}>Tournament Winner</span>
                </h1>
                <p
                  className="hero-subtitle"
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

              {/* Live viewer + urgency bar */}
              <div className="flex flex-wrap items-center gap-3 md:justify-center">
                <div className="flex items-center gap-2">
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80", animation: "pulse 1.8s infinite" }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "12.5px", fontWeight: 600 }}>
                    {viewers} people viewing right now
                  </span>
                </div>
                <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.12)" }} className="sm:hidden" />
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "#f9cb00", fontSize: "13px" }}>⚡</span>
                  <span style={{ color: "#f9cb00", fontSize: "12.5px", fontWeight: 700 }}>3 spots left this week</span>
                </div>
              </div>

              {/* Feature pills — scrollable row on mobile */}
              <div className="flex gap-3 md:justify-center sm:overflow-x-auto sm:w-full sm:pb-1 sm:-mx-0" style={{ scrollbarWidth: "none" }}>
                {featureBullets.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-shrink-0"
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
            <div className="w-full flex-shrink-0" style={{ maxWidth: "min(460px, 100%)" }}>
              <MainContentSection />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCROLLING BANNER ─── */}
      <div className="w-full relative" style={{ backgroundColor: "#0d0404" }}>
        <ScrollingBanner items={marqueeText} />
      </div>

      {/* ─── COMPANIES WE WORK WITH ─── */}
      <CompaniesSection />

      {/* ─── STATISTICS + SERVICES ─── */}
      <div className="flex flex-col w-full max-w-[1440px] m-auto gap-[138px] pt-16 md:gap-12 md:pt-8 md:px-5 sm:gap-10 sm:pt-6 sm:px-4">
        <StatisticsOverviewSection />
        <ServicesOverviewSection />
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <HowItWorksSection />

      {/* ─── CELEBRITY STUDENTS ─── */}
      <div style={{ backgroundColor: "#0d0404" }} className="pt-44 md:pt-12 md:px-5 sm:pt-8 sm:px-4">
        <CelebrityStudents />
      </div>

      {/* ─── REAL STUDENTS CAROUSELS ─── */}
      <div className="relative h-[1024px] content-center md:h-auto md:py-12 sm:h-auto sm:py-10" style={{ backgroundColor: "#0d0404" }}>

        <div className="relative z-[5] flex flex-col h-full md:h-auto sm:h-auto">
          <div className="flex flex-col items-center pt-[52px] md:pt-8 sm:pt-2 mb-[100px] md:mb-16 sm:mb-6 gap-3 px-5">
            <Heading
              size="h3"
              as="h2"
              className="text-[55px] font-semibold md:text-[40px] sm:text-[28px] text-center sm:leading-tight"
            >
              Real Students, Real Results
            </Heading>
            <p style={{ color: "rgba(255,255,255,0.75)", textAlign: "center" }} className="text-[16px] sm:text-[14px] sm:px-4">
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
        <div className="pb-[151px] px-[72px] max-w-[1440px] m-auto md:px-5 md:pb-16 sm:px-4 sm:pb-12">
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
    </ClickSpark>
  );
}
