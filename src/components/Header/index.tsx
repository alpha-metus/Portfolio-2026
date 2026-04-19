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
          ? "fixed top-0 left-0 right-0 z-[999] py-3 px-8 shadow-2xl"
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
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`hidden sm:block absolute ${
            isSticky ? "top-20" : "top-32"
          } bg-gradient-to-r from-yellow-400 to-black-900 bg-blur-[15px] right-0 left-0 rounded-xl shadow-lg z-50 mx-5`}
        >
          <ul className="py-4 px-6">
            <li className="mb-4">
              <a href="#about" onClick={toggleMenu}>
                <Heading as="p" className="text-[13.88px] font-semibold">
                  About Us
                </Heading>
              </a>
            </li>
            <li className="mb-4">
              <a href="#features" onClick={toggleMenu}>
                <Heading as="p" className="text-[13.88px] font-semibold">
                  Features
                </Heading>
              </a>
            </li>
            <li className="mb-4">
              <a href="#pricing" onClick={toggleMenu}>
                <Heading as="p" className="text-[13.88px] font-semibold">
                  Pricing
                </Heading>
              </a>
            </li>
            <li className="mb-4">
              <a href="#contact" onClick={toggleMenu}>
                <Heading as="p" className="text-[13.88px] font-semibold">
                  Contact
                </Heading>
              </a>
            </li>
            <li className="mb-4">
              <Link href="/tournaments" prefetch={false} onClick={toggleMenu}>
                <Heading as="p" className="text-[13.88px] font-semibold" style={{ color: "#f9cb00" }}>
                  ♟ Tournaments
                </Heading>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/explore" prefetch={false} onClick={toggleMenu}>
                <Heading as="p" className="text-[13.88px] font-semibold" style={{ color: "#4ade80" }}>
                  ♞ Chess Hub
                </Heading>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
