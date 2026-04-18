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

  return (
    <header
      {...props}
      className={`${
        props.className
      } flex sm:px-4 justify-between items-center  gap-5 md:mx-0 rounded-bl-3xl rounded-tr-3xl  ${
        isSticky
          ? "fixed top-0 left-0 right-0 z-[999] bg-black-900 bg-opacity-90 backdrop-blur-sm py-4 px-8 shadow-md transition-all duration-300 ml-0 mr-0"
          : ""
      }`}
    >
      <Img
        src="img_header_logo.png"
        width={120}
        height={34}
        alt="Headerlogo"
        className="h-[34px] w-[120px] object-contain sm:w-[120px]"
      />
      {/* Desktop Menu - visible on medium screens and up */}
      <ul className="!mr-3.5 flex flex-wrap gap-8 lg:gap-[54px] sm:hidden">
        <li>
          <a href="#about" onClick={() => handleNavClick("About Us")}>
            <Heading as="p" className="text-[13.88px] font-semibold">
              About Us
            </Heading>
          </a>
        </li>
        <li>
          <a href="#features" onClick={() => handleNavClick("Features")}>
            <Heading as="p" className="text-[13.88px] font-semibold">
              Features
            </Heading>
          </a>
        </li>
        <li>
          <a href="#pricing" onClick={() => handleNavClick("Pricing")}>
            <Heading as="p" className="text-[13.88px] font-semibold">
              Pricing
            </Heading>
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => handleNavClick("Contact")}>
            <Heading as="p" className="text-[13.88px] font-semibold">
              Contact
            </Heading>
          </a>
        </li>
        <li>
          <Link href="/tournaments" onClick={() => handleNavClick("Tournaments")}>
            <Heading as="p" className="text-[13.88px] font-semibold" style={{ color: "#f9cb00" }}>
              ♟ Tournaments
            </Heading>
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
              <Link href="/tournaments" onClick={toggleMenu}>
                <Heading as="p" className="text-[13.88px] font-semibold" style={{ color: "#f9cb00" }}>
                  ♟ Tournaments
                </Heading>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
