"use client";
import React, { useState } from "react";
import { Heading, Img } from "@/components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { trackEvent } from "@/lib/fbPixel";

const inputClass =
  "w-full rounded-[12px] border border-black-900 border-opacity-30 bg-white-a700 px-4 py-3 text-[14px] text-black-900_02 placeholder-black-900 placeholder-opacity-50 outline-none focus:border-black-900 focus:ring-2 focus:ring-black-900 focus:ring-opacity-20 transition-all";

export default function MainContentSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_WEB_URL;

    if (!url) {
      toast.error(
        "API URL not configured. Please check environment variables.",
        {
          position: "top-center",
        }
      );
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new URLSearchParams();
    formDataToSend.append("Name", formData.name);
    formDataToSend.append("Email", formData.email);
    formDataToSend.append("Mobile_No", formData.mobile_no);
    formDataToSend.append("Timestamp", new Date().toISOString());

    try {
      const response = await axios.post(url, formDataToSend.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setIsSubmitting(false);

      if (response.data.includes("Data Submitted Successfully..")) {
        toast.success("Your information has been added!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData({ name: "", email: "", mobile_no: "" });
      } else {
        toast.error("Failed to add your information. Please try again.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(
        `An error occurred: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
    }
  };

  const handleClick = () => {
    trackEvent("Demo_Booking_Event", {
      content_name: "Free Demo Enrollment",
      source: "enrollment_section",
      method: "calendly",
    });

    window.location.href = `${process.env.NEXT_PUBLIC_CALENDLY_APPOINTMENT_BOOK_URL}`;
  };

  return (
    <div id="contact" className="w-full bg-black-900">
      <div className="rounded-[30px] overflow-hidden flex flex-row md:flex-col min-h-[600px]">

        {/* LEFT — amber panel with chess image */}
        <div className="relative flex-1 bg-amber-a400_01 flex items-end justify-center overflow-hidden md:h-[280px] sm:h-[220px]">
          <Img
            src="OBJECTS.svg"
            width={600}
            height={500}
            alt="Chess pieces"
            className="w-full max-w-[520px] object-contain"
          />
        </div>

        {/* RIGHT — form panel */}
        <div className="flex-1 bg-gradient-to-br from-white to-yellow-300 flex flex-col justify-center px-12 py-12 md:px-8 md:py-10 sm:px-5 sm:py-8">
          {/* heading */}
          <Heading
            as="h2"
            className="uppercase text-[30px] md:text-[24px] sm:text-[22px] font-bold leading-tight !text-black-900_02 mb-2"
          >
            Book Your Free Demo
          </Heading>
          <p className="text-black-900 text-[14px] font-medium opacity-75 leading-relaxed mb-1">
            Every chess legend started with a single move. Fill in your details
            and we&apos;ll get in touch to schedule your free class.
          </p>
          <p className="text-[12px] text-black-900 font-bold mb-6">
            ✓ Free first class &nbsp;·&nbsp; ✓ No card required &nbsp;·&nbsp; ✓ Instant confirmation
          </p>

          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-[420px]">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="tel"
              name="mobile_no"
              placeholder="Phone / WhatsApp number"
              required
              value={formData.mobile_no}
              onChange={handleChange}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black-900 text-white-a700 rounded-[12px] py-4 font-bold text-[16px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {isSubmitting ? "Submitting…" : "Get My Free Demo Class →"}
            </button>
          </form>

          {/* or + calendly */}
          <div className="flex items-center gap-3 mt-5 max-w-[420px]">
            <div className="flex-1 h-px bg-black-900 opacity-20" />
            <span className="text-black-900 text-[12px] opacity-50 font-medium">or</span>
            <div className="flex-1 h-px bg-black-900 opacity-20" />
          </div>
          <button
            onClick={handleClick}
            className="mt-3 text-black-900_02 font-semibold text-[13px] underline underline-offset-2 opacity-60 hover:opacity-100 transition-opacity text-left max-w-[420px]"
          >
            Pick a time slot on Calendly instead →
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
