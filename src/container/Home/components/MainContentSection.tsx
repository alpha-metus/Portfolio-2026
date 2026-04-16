"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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

    // GET + URL params avoids the CORS redirect issue that blocks POST to Apps Script
    const params = new URLSearchParams({
      Name: formData.name,
      Email: formData.email,
      Mobile_No: formData.mobile_no,
      Timestamp: new Date().toISOString(),
    });

    try {
      await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        mode: "no-cors",
      });

      setIsSubmitting(false);
      toast.success("🎉 Done! Check your email — we'll be in touch within 24 hrs.", {
        position: "top-center",
        autoClose: 6000,
      });
      setFormData({ name: "", email: "", mobile_no: "" });
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Something went wrong. Please try again or WhatsApp us.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2a2a2a",
    padding: "14px 16px",
    fontSize: "14px",
    color: "#ffffff",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    color: "#9ca3af",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div
      id="contact"
      style={{
        background: "#1a1a1a",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          color: "#ffffff",
          fontSize: "28px",
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: "8px",
        }}
      >
        Book Your Free Demo
      </h2>
      <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "28px" }}>
        Secure your spot for a personalized 30-minute session.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Magnus Carlsen"
            required
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="magnus@chessbase.com"
            required
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Phone / WhatsApp Number</label>
          <input
            type="tel"
            name="mobile_no"
            placeholder="+1 (555) 000-0000"
            required
            value={formData.mobile_no}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            backgroundColor: "#f9cb00",
            color: "#000000",
            borderRadius: "50px",
            padding: "16px 24px",
            fontWeight: 800,
            fontSize: "16px",
            marginTop: "8px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            border: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.opacity = "1"; }}
        >
          {isSubmitting ? "Submitting…" : "Get My Free Demo Class →"}
        </button>
      </form>

      {/* Privacy note */}
      <p style={{ color: "#6b7280", fontSize: "12px", textAlign: "center", marginTop: "16px", lineHeight: 1.6 }}>
        By clicking you agree to our Terms of Service. We respect your privacy and never spam.
      </p>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ top: "80px", zIndex: 9999 }}
      />
    </div>
  );
}
