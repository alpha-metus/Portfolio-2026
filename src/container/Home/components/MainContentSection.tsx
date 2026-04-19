"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { trackEvent } from "@/lib/fbPixel";
import Confetti from "@/components/Confetti";

export default function MainContentSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = "https://script.google.com/macros/s/AKfycbzL1N9OWI37Pvcj7fFZF-7b_dEn6V3cU4Yg158k2y6gu0v0HQ-VW1eMhIkagjPcRESh/exec";

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
      setConfetti(true);
      setSubmitted(true);
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

  if (submitted) {
    return (
      <>
        <Confetti active={confetti} />
        <div
          id="contact"
          className="sm:!p-5"
          style={{
            background: "#1a1a1a",
            borderRadius: "20px",
            padding: "40px",
            width: "100%",
            scrollMarginTop: "80px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🏆</div>
          <h2 style={{ color: "#f9cb00", fontSize: "24px", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.2 }}>
            You just made your best move!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15.5px", lineHeight: 1.75, margin: "0 0 8px" }}>
            This is the <strong style={{ color: "#ffffff" }}>first step in the right direction</strong>. 🚀
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13.5px", lineHeight: 1.7, margin: "0 0 28px" }}>
            Our coach will reach out within a few hours to schedule your free demo. Get ready to level up your chess!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              background: "rgba(249,203,0,0.12)",
              color: "#f9cb00",
              border: "1px solid rgba(249,203,0,0.3)",
              borderRadius: "50px",
              padding: "10px 24px",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Book another slot
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      id="contact"
      className="sm:!p-5"
      style={{
        background: "#1a1a1a",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        scrollMarginTop: "80px",
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
          <label htmlFor="enroll-name" style={labelStyle}>Your Name</label>
          <input
            id="enroll-name"
            type="text"
            name="name"
            placeholder="Magnus Carlsen"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="enroll-email" style={labelStyle}>Email Address</label>
          <input
            id="enroll-email"
            type="email"
            name="email"
            placeholder="magnus@chessbase.com"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="enroll-phone" style={labelStyle}>Phone / WhatsApp Number</label>
          <input
            id="enroll-phone"
            type="tel"
            name="mobile_no"
            placeholder="9876543210"
            required
            autoComplete="tel"
            pattern="[0-9+]{7,15}"
            title="Please enter a valid phone number (7–15 digits)"
            maxLength={15}
            value={formData.mobile_no}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9+]/g, "");
              setFormData((prev) => ({ ...prev, mobile_no: val }));
            }}
            style={inputStyle}
          />
        </div>

        {/* Urgency row above CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "rgba(249,203,0,0.07)", border: "1px solid rgba(249,203,0,0.18)", borderRadius: "8px", padding: "7px 12px" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 1.4s infinite" }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 600 }}>
            ⚡ Only <strong style={{ color: "#f9cb00" }}>3 spots</strong> left for free demo this week
          </span>
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
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            border: "none",
            transition: "opacity 0.2s",
            boxShadow: "0 4px 24px rgba(249,203,0,0.35)",
          }}
          onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.opacity = "1"; }}
        >
          {isSubmitting ? "Submitting…" : "🎯 Get My Free Demo Class →"}
        </button>
      </form>

      {/* Privacy note */}
      <p style={{ color: "#6b7280", fontSize: "12px", textAlign: "center", marginTop: "16px", lineHeight: 1.6 }}>
        By clicking you agree to our Terms of Service. We respect your privacy and never spam.
      </p>


    </div>
  );
}
