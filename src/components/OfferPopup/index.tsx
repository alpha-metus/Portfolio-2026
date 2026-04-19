"use client";
import React, { useState, useEffect } from "react";
import Confetti from "@/components/Confetti";

export const OFFER_KEY = "kwinbee_offer_v1";
const TIMER_KEY = "kwinbee_offer_timer_v1";
const DURATION = 30 * 60; // 30 minutes in seconds

type Screen = "offer" | "confirm" | "success";

interface Props {
  onClose: () => void;
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          background: "rgba(249,203,0,0.12)",
          border: "1px solid rgba(249,203,0,0.3)",
          borderRadius: "10px",
          padding: "8px 14px",
          minWidth: "52px",
          display: "inline-block",
        }}
      >
        <span
          style={{
            color: "#f9cb00",
            fontSize: "30px",
            fontWeight: 900,
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
            display: "block",
          }}
        >
          {value}
        </span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", margin: "5px 0 0" }}>
        {label}
      </p>
    </div>
  );
}

export default function OfferPopup({ onClose }: Props) {
  const [screen, setScreen] = useState<Screen>("offer");
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // Init timer
  useEffect(() => {
    if (!localStorage.getItem(TIMER_KEY)) {
      localStorage.setItem(TIMER_KEY, Date.now().toString());
    }
  }, []);

  // Countdown tick
  useEffect(() => {
    const tick = setInterval(() => {
      const start = parseInt(localStorage.getItem(TIMER_KEY) || Date.now().toString(), 10);
      const remaining = Math.max(0, DURATION - Math.floor((Date.now() - start) / 1000));
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const mm = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const ss = (timeLeft % 60).toString().padStart(2, "0");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const url =
      "https://script.google.com/macros/s/AKfycbzL1N9OWI37Pvcj7fFZF-7b_dEn6V3cU4Yg158k2y6gu0v0HQ-VW1eMhIkagjPcRESh/exec";
    const params = new URLSearchParams({
      Name: formData.name,
      Mobile_No: formData.phone,
      Email: "",
      Source: "Offer Popup",
      Timestamp: new Date().toISOString(),
    });
    try {
      await fetch(`${url}?${params.toString()}`, { method: "GET", mode: "no-cors" });
    } catch (_) {}
    setSubmitting(false);
    localStorage.setItem(OFFER_KEY, "submitted");
    setConfetti(true);
    setScreen("success");
  };

  const handleXClick = () => {
    if (screen === "offer") setScreen("confirm");
    else dismissOffer();
  };

  const dismissOffer = () => {
    localStorage.setItem(OFFER_KEY, "dismissed");
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "13px 16px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  };

  return (
    <>
      <Confetti active={confetti} />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
        style={{ backgroundColor: "rgba(0,0,0,0.80)", backdropFilter: "blur(6px)" }}
      >
        {/* Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "linear-gradient(145deg, #1c1104 0%, #0f0a02 100%)",
            border: "1.5px solid rgba(249,203,0,0.3)",
            borderRadius: "24px",
            boxShadow: "0 0 80px rgba(249,203,0,0.12), 0 30px 80px rgba(0,0,0,0.6)",
            width: "100%",
            maxWidth: "440px",
            overflow: "hidden",
            position: "relative",
            animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >

          {/* ─── OFFER SCREEN ─── */}
          {screen === "offer" && (
            <>
              {/* Urgency bar */}
              <div
                style={{
                  background: "#f9cb00",
                  padding: "9px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#0d0404", letterSpacing: "0.3px" }}>
                  🔥 Only 3 FREE demo slots left this week
                </span>
              </div>

              <div style={{ padding: "26px 26px 22px", position: "relative" }}>
                {/* X button */}
                <button
                  onClick={handleXClick}
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "16px",
                    background: "rgba(255,255,255,0.07)",
                    border: "none",
                    color: "rgba(255,255,255,0.5)",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>

                <h2
                  style={{
                    color: "#ffffff",
                    fontSize: "21px",
                    fontWeight: 900,
                    lineHeight: 1.2,
                    margin: "0 0 6px",
                    paddingRight: "30px",
                  }}
                >
                  Claim Your{" "}
                  <span style={{ color: "#f9cb00" }}>FREE Demo Class</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: "0 0 20px", lineHeight: 1.6 }}>
                  1-on-1 with a national champion coach. Zero cost, zero commitment.
                </p>

                {/* Timer */}
                <div
                  style={{
                    background: "rgba(249,203,0,0.05)",
                    border: "1px solid rgba(249,203,0,0.18)",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>⏳</span>
                  <div>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "9.5px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        margin: "0 0 6px",
                      }}
                    >
                      Offer expires in
                    </p>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
                      <TimeBlock value={mm} label="min" />
                      <span
                        style={{
                          color: "rgba(249,203,0,0.6)",
                          fontSize: "24px",
                          fontWeight: 900,
                          lineHeight: 1,
                          paddingBottom: "18px",
                        }}
                      >
                        :
                      </span>
                      <TimeBlock value={ss} label="sec" />
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "11px" }}
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    style={inputStyle}
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp / phone number"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value.replace(/[^0-9+]/g, "") }))
                    }
                    maxLength={15}
                    style={inputStyle}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      background: "#f9cb00",
                      color: "#0d0404",
                      border: "none",
                      borderRadius: "50px",
                      padding: "15px 24px",
                      fontWeight: 900,
                      fontSize: "15px",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.75 : 1,
                      boxShadow: "0 4px 24px rgba(249,203,0,0.45)",
                      marginTop: "4px",
                      transition: "transform 0.15s",
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {submitting ? "Booking…" : "🎯 Yes! Book My Free Demo →"}
                  </button>
                </form>

                <p
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "11px",
                    textAlign: "center",
                    marginTop: "12px",
                  }}
                >
                  No credit card · No spam · 100% free
                </p>
              </div>
            </>
          )}

          {/* ─── CONFIRM LEAVE SCREEN ─── */}
          {screen === "confirm" && (
            <div style={{ padding: "40px 28px 36px", textAlign: "center" }}>
              <div style={{ fontSize: "50px", marginBottom: "14px" }}>😢</div>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: 900,
                  margin: "0 0 10px",
                  lineHeight: 1.25,
                }}
              >
                Wait — you'll miss your{" "}
                <span style={{ color: "#f9cb00" }}>free spot!</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  margin: "0 0 26px",
                }}
              >
                Only <strong style={{ color: "#fff" }}>3 demo sessions</strong> are left this week.
                Once they're gone, you'll be on the waitlist.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={() => setScreen("offer")}
                  style={{
                    background: "#f9cb00",
                    color: "#0d0404",
                    border: "none",
                    borderRadius: "50px",
                    padding: "15px 24px",
                    fontWeight: 900,
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 4px 24px rgba(249,203,0,0.45)",
                  }}
                >
                  ✅ Keep my free spot
                </button>
                <button
                  onClick={dismissOffer}
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.3)",
                    border: "none",
                    fontSize: "13px",
                    cursor: "pointer",
                    padding: "8px",
                    textDecoration: "underline",
                  }}
                >
                  No thanks, I'll pass on this
                </button>
              </div>
            </div>
          )}

          {/* ─── SUCCESS SCREEN ─── */}
          {screen === "success" && (
            <div style={{ padding: "44px 28px 40px", textAlign: "center" }}>
              <div style={{ fontSize: "56px", marginBottom: "16px" }}>🏆</div>
              <h2
                style={{
                  color: "#f9cb00",
                  fontSize: "22px",
                  fontWeight: 900,
                  margin: "0 0 10px",
                  lineHeight: 1.2,
                }}
              >
                You just made your best move!
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  margin: "0 0 8px",
                }}
              >
                This is the{" "}
                <strong style={{ color: "#ffffff" }}>first step in the right direction</strong>. 🚀
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "13.5px",
                  lineHeight: 1.7,
                  margin: "0 0 28px",
                }}
              >
                Our coach will reach out within a few hours to schedule your session. Get ready to level up!
              </p>
              <button
                onClick={() => { localStorage.setItem(OFFER_KEY, "submitted"); onClose(); }}
                style={{
                  background: "#f9cb00",
                  color: "#0d0404",
                  border: "none",
                  borderRadius: "50px",
                  padding: "13px 32px",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Continue to website →
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
