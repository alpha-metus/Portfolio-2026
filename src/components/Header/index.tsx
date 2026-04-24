"use client";
import { trackEvent } from "@/lib/fbPixel";
import { Heading, Img } from "./..";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Props {
  className?: string;
}

export default function Header({ ...props }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll event to determine when header should become sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Control body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = (label: string) => {
    trackEvent("Nav_Link_Click", {
      content_name: `${label} Nav Link`,
      content_category: "Navigation",
      source: "navbar",
      method: "anchor_link",
    });
  };

  const navLinkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.92)",
    fontSize: "14.5px",
    fontWeight: 600,
    letterSpacing: "0.1px",
    transition: "color 0.15s",
    position: "relative",
  };

  return (
    <header
      {...props}
      className={`${props.className} flex sm:px-4 justify-between items-center gap-5 md:mx-0 transition-all duration-300 ${
        isSticky
          ? "fixed top-0 left-0 right-0 z-[999] py-3 px-8 md:px-5 sm:px-4 shadow-2xl"
          : "py-1 px-2 rounded-2xl"
      }`}
      style={
        isSticky
          ? {
              background: "rgba(10,3,3,0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(249,203,0,0.12)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
            }
          : {
              background: "rgba(13,4,4,0.78)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.07)",
            }
      }
    >
      <Img
        src="img_header_logo.png"
        width={130}
        height={36}
        alt="KwinBee Chess Academy"
        className="h-[36px] w-[130px] object-contain"
        priority
      />

      {/* Desktop nav */}
      <ul className="!mr-2 flex flex-nowrap items-center gap-6 lg:gap-8 sm:hidden">
        <li>
          <a href="#about" onClick={() => handleNavClick("About Us")}
            className="hover:opacity-100 transition-opacity"
            style={{ ...navLinkStyle, opacity: 0.85 }}>
            About Us
          </a>
        </li>
        <li>
          <a href="#features" onClick={() => handleNavClick("Features")}
            className="hover:opacity-100 transition-opacity"
            style={{ ...navLinkStyle, opacity: 0.85 }}>
            Features
          </a>
        </li>
        <li>
          <a href="#pricing" onClick={() => handleNavClick("Pricing")}
            className="hover:opacity-100 transition-opacity"
            style={{ ...navLinkStyle, opacity: 0.85 }}>
            Pricing
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => handleNavClick("Contact")}
            className="hover:opacity-100 transition-opacity"
            style={{ ...navLinkStyle, opacity: 0.85 }}>
            Contact
          </a>
        </li>
        <li>
          <Link href="/tournaments" prefetch={false} onClick={() => handleNavClick("Tournaments")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full transition-opacity hover:opacity-90"
            style={{ background: "rgba(249,203,0,0.12)", border: "1px solid rgba(249,203,0,0.3)", color: "#f9cb00", fontSize: "14px", fontWeight: 700 }}>
            ♟ Tournaments
          </Link>
        </li>
        <li>
          <Link href="/explore" prefetch={false} onClick={() => handleNavClick("Chess Hub")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full transition-opacity hover:opacity-90"
            style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: "14px", fontWeight: 700 }}>
            ♞ Chess Hub
          </Link>
        </li>
        {/* Book Free Demo — only visible in sticky state */}
        {isSticky && (
          <li>
            <a
              href="#contact"
              onClick={() => handleNavClick("Book Demo Sticky")}
              className="flex items-center gap-2 rounded-full font-bold transition-opacity hover:opacity-85"
              style={{
                background: "#f9cb00",
                color: "#0d0404",
                fontSize: "13px",
                padding: "9px 20px",
                whiteSpace: "nowrap",
              }}
            >
              Book Free Demo →
            </a>
          </li>
        )}
      </ul>
      {/* Hamburger Button (Mobile Only) */}
      <button
        className="hidden sm:flex md:hidden flex-col justify-center items-center p-2 cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`block rounded-2xl w-6 h-1 bg-white-a700 mb-1.5 transition-transform ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block rounded-2xl w-6 h-1 bg-white-a700 mb-1.5 transition-opacity ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block rounded-2xl w-6 h-1 bg-white-a700 transition-transform ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      {/* Mobile Menu — full-screen overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="hidden sm:block fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            onClick={toggleMenu}
          />
          {/* Drawer */}
          <div
            className="hidden sm:flex fixed left-0 right-0 z-50 flex-col"
            style={{
              top: isSticky ? 56 : 72,
              bottom: 0,
              background: "rgba(10,3,3,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(249,203,0,0.15)",
            }}
          >
            <ul className="flex flex-col py-4 px-5 gap-1 overflow-y-auto">
              {[
                { href: "#about", label: "About Us", color: undefined },
                { href: "#features", label: "Features", color: undefined },
                { href: "#pricing", label: "Pricing", color: undefined },
                { href: "#contact", label: "Contact", color: undefined },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={toggleMenu}
                    className="flex items-center w-full py-4 px-4 rounded-2xl transition-colors active:bg-white/5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span style={{ color: "#ffffff", fontSize: "17px", fontWeight: 600 }}>{label}</span>
                    <svg className="ml-auto opacity-30" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </li>
              ))}
              <li>
                <Link href="/tournaments" prefetch={false} onClick={toggleMenu}
                  className="flex items-center w-full py-4 px-4 rounded-2xl transition-colors active:bg-white/5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#f9cb00", fontSize: "17px", fontWeight: 600 }}>♟ Tournaments</span>
                  <svg className="ml-auto opacity-30" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="#f9cb00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/explore" prefetch={false} onClick={toggleMenu}
                  className="flex items-center w-full py-4 px-4 rounded-2xl transition-colors active:bg-white/5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#4ade80", fontSize: "17px", fontWeight: 600 }}>♞ Chess Hub</span>
                  <svg className="ml-auto opacity-30" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Bottom CTA inside menu */}
            <div className="px-5 py-4 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <a
                href="#contact"
                onClick={toggleMenu}
                className="flex items-center justify-center w-full rounded-2xl font-bold text-[16px]"
                style={{
                  background: "#f9cb00",
                  color: "#0d0404",
                  padding: "16px",
                }}
              >
                🎯 Book Free Demo Class
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
