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
    <div
      id="contact"
      className="relative h-[700px] bg-black-900 self-stretch md:h-auto"
    >
      <div className="h-full w-full rounded-[30px] bg-amber-a400 md:flex md:flex-col-reverse md:items-center md:pb-0 overflow-hidden">
        {/* image section */}
        <div>
          <Img
            src="OBJECTS.svg"
            width={100}
            height={100}
            alt="Teaching1one"
            className="absolute left-0 bottom-0 w-[63%] md:static md:w-[100%] md:mx-auto md:mt-6"
          />
        </div>

        {/* form section */}
        <div className="absolute bottom-0 right-0 top-0 z-[52] bg-gradient-to-r from-white to-yellow-400 flex h-full w-[62%] flex-col justify-center gap-[24px] px-[48px] py-[48px] md:static md:w-full md:items-center md:px-6 md:py-8 sm:p-5">
          {/* heading block */}
          <div className="flex lg:justify-end justify-center">
            <div className="flex w-full flex-col lg:w-[75%] gap-2">
              <Heading
                as="h2"
                className="sm:text-[22px] md:text-[22px] uppercase lg:text-[32px] font-bold leading-tight !text-black-900_02"
              >
                Book Your Free Demo
              </Heading>
              <p className="text-black-900 text-[14px] font-medium opacity-80 leading-relaxed">
                Every chess legend started with a single move. Fill in your details and we&apos;ll
                get in touch to schedule your free class.
              </p>
              <p className="text-[12px] !text-black-900 font-semibold mt-1">
                ✓ Free first class &nbsp;·&nbsp; ✓ No card required &nbsp;·&nbsp; ✓ Instant confirmation
              </p>
            </div>
          </div>

          {/* form fields */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full lg:w-[75%] lg:self-end flex-col gap-4"
          >
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
              className="w-full bg-black-900 text-white-a700 rounded-[12px] py-4 font-bold text-[16px] tracking-[0.5px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {isSubmitting ? "Submitting…" : "Get My Free Demo Class →"}
            </button>
          </form>

          {/* or divider */}
          <div className="flex lg:w-[75%] lg:self-end items-center gap-3">
            <div className="flex-1 h-px bg-black-900 opacity-20" />
            <span className="text-black-900 text-[12px] opacity-50 font-medium">or</span>
            <div className="flex-1 h-px bg-black-900 opacity-20" />
          </div>

          {/* calendly fallback */}
          <div className="flex lg:w-[75%] lg:self-end justify-center">
            <button
              onClick={handleClick}
              className="text-black-900_02 font-semibold text-[14px] underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              Pick a time slot on Calendly instead →
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container - placed outside the form */}
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
