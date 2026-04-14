"use client";
import React, { useState } from "react";
import { Heading, Img } from "@/components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { trackEvent } from "@/lib/fbPixel";

export default function MainContentSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_WEB_URL;

    if (!url) {
      toast.error("API URL not configured. Please check environment variables.", { position: "top-center" });
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
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setIsSubmitting(false);
      if (response.data.includes("Data Submitted Successfully..")) {
        toast.success("Your information has been added!", { position: "top-center", autoClose: 5000 });
        setFormData({ name: "", email: "", mobile_no: "" });
      } else {
        toast.error("Failed to add your information. Please try again.", { position: "top-center", autoClose: 5000 });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(`An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`, { position: "top-center", autoClose: 5000 });
    }
  };

  const handleCalendly = () => {
    trackEvent("Demo_Booking_Event", {
      content_name: "Free Demo Enrollment",
      source: "enrollment_section",
      method: "calendly",
    });
    window.location.href = `${process.env.NEXT_PUBLIC_CALENDLY_APPOINTMENT_BOOK_URL}`;
  };

  return (
    <div id="contact" className="w-full">
      {/* Outer card — amber background matches site's golden theme */}
      <div className="rounded-[30px] overflow-hidden bg-amber-a400_01 flex flex-row md:flex-col min-h-[540px]">

        {/* LEFT — chess image sits naturally against amber background */}
        <div className="flex-1 flex items-end justify-center overflow-hidden md:h-[260px] sm:h-[200px]">
          <Img
            src="OBJECTS.svg"
            width={520}
            height={440}
            alt="Chess pieces"
            className="w-full max-w-[480px] object-contain md:max-w-[340px] sm:max-w-[260px]"
          />
        </div>

        {/* RIGHT — white card floats over amber */}
        <div
          className="m-6 rounded-[20px] flex flex-col justify-center px-10 py-10 md:m-4 md:px-6 md:py-8 sm:px-5 sm:py-6"
          style={{ background: "#ffffff", minWidth: 0, flex: "0 0 46%" }}
        >
          {/* heading */}
          <Heading
            as="h2"
            className="uppercase text-[28px] md:text-[22px] sm:text-[20px] font-bold leading-tight !text-black-900_02 mb-2"
          >
            Book Your Free Demo
          </Heading>

          <p className="text-[14px] font-medium leading-relaxed mb-1" style={{ color: "#333" }}>
            Every chess legend started with a single move. Fill in your details
            and we&apos;ll contact you to schedule your free class.
          </p>

          <p className="text-[12px] font-bold mb-6" style={{ color: "#000" }}>
            ✓ Free first class &nbsp;·&nbsp; ✓ No card required &nbsp;·&nbsp; ✓ Instant confirmation
          </p>

          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                borderRadius: "10px",
                border: "1.5px solid #d1d5db",
                backgroundColor: "#f9fafb",
                padding: "12px 16px",
                fontSize: "14px",
                color: "#111",
                outline: "none",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                borderRadius: "10px",
                border: "1.5px solid #d1d5db",
                backgroundColor: "#f9fafb",
                padding: "12px 16px",
                fontSize: "14px",
                color: "#111",
                outline: "none",
              }}
            />
            <input
              type="tel"
              name="mobile_no"
              placeholder="Phone / WhatsApp number"
              required
              value={formData.mobile_no}
              onChange={handleChange}
              style={{
                width: "100%",
                borderRadius: "10px",
                border: "1.5px solid #d1d5db",
                backgroundColor: "#f9fafb",
                padding: "12px 16px",
                fontSize: "14px",
                color: "#111",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "10px",
                padding: "14px 20px",
                fontWeight: 700,
                fontSize: "15px",
                marginTop: "4px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.6 : 1,
                border: "none",
                transition: "opacity 0.2s",
              }}
            >
              {isSubmitting ? "Submitting…" : "Get My Free Demo Class →"}
            </button>
          </form>

          {/* or divider */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex-1 h-px" style={{ backgroundColor: "#d1d5db" }} />
            <span className="text-[12px]" style={{ color: "#9ca3af" }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#d1d5db" }} />
          </div>

          <button
            onClick={handleCalendly}
            className="mt-3 text-left text-[13px] font-semibold underline underline-offset-2"
            style={{ color: "#555", background: "none", border: "none", cursor: "pointer" }}
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
