"use client";
import React, { useState, useEffect } from "react";
import Confetti from "@/components/Confetti";

export const OFFER_SUBMITTED_KEY = "kwinbee_offer_submitted_v1";
export const OFFER_DISMISSED_SESSION_KEY = "kwinbee_offer_dismissed_v1";
const TIMER_KEY = "kwinbee_offer_timer_v1";
const DURATION = 30 * 60;

type Screen = "offer" | "confirm" | "success";

interface Props {
  onClose: () => void;
}

export default function OfferPopup({ onClose }: Props) {
  const [screen, setScreen] = useState<Screen>("offer");
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(TIMER_KEY)) {
      localStorage.setItem(TIMER_KEY, Date.now().toString());
    }
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      const start = parseInt(localStorage.getItem(TIMER_KEY) || Date.now().toString(), 10);
      setTimeLeft(Math.max(0, DURATION - Math.floor((Date.now() - start) / 1000)));
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
      Email: formData.email,
      Source: "Offer Popup",
      Timestamp: new Date().toISOString(),
    });
    try {
      await fetch(`${url}?${params.toString()}`, { method: "GET", mode: "no-cors" });
    } catch (_) {}
    setSubmitting(false);
    localStorage.setItem(OFFER_SUBMITTED_KEY, "1");
    setConfetti(true);
    setScreen("success");
  };

  const handleXClick = () => {
    if (screen === "offer") {
      setScreen("confirm");
    } else {
      dismissOffer();
    }
  };

  const dismissOffer = () => {
    // Only dismissed for this session — will show again on next visit
    sessionStorage.setItem(OFFER_DISMISSED_SESSION_KEY, "1");
    onClose();
  };

  const inp: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "12px 14px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  };

  return (
    <>
      <Confetti active={confetti} />
      <div
        className="offer-popup-wrapper fixed inset-0 z-[2000] flex items-end justify-center px-3"
        style={{ backgroundColor: "rgba(0,0,0,0.78)", backdropFilter: "blur(5px)" }}
      >
        {/* Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="offer-popup-card"
          style={{
            background: "linear-gradient(145deg, #1c1104 0%, #0f0a02 100%)",
            border: "1.5px solid rgba(249,203,0,0.3)",
            borderRadius: "20px 20px 0 0",
            boxShadow: "0 -8px 60px rgba(249,203,0,0.12), 0 -20px 60px rgba(0,0,0,0.5)",
            width: "100%",
            maxWidth: "460px",
            overflow: "hidden",
            position: "relative",
            animation: "slideUp 0.35s cubic-bezier(0.34,1.4,0.64,1)",
          }}
        >

          {/* ─── OFFER SCREEN ─── */}
          {screen === "offer" && (
            <>
              {/* Urgency bar */}
              <div style={{ background: "#f9cb00", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#0d0404" }}>
                  🔥 Only 3 FREE demo slots left this week
                </span>
              </div>

              <div style={{ padding: "20px 20px 18px", position: "relative" }}>
                {/* X */}
                <button
                  onClick={handleXClick}
                  style={{ position: "absolute", top: "12px", right: "14px", background: "rgba(255,255,255,0.07)", border: "none", color: "rgba(255,255,255,0.5)", width: "28px", height: "28px", borderRadius: "50%", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >✕</button>

                <h2 style={{ color: "#ffffff", fontSize: "19px", fontWeight: 900, lineHeight: 1.2, margin: "0 0 4px", paddingRight: "32px" }}>
                  Claim Your <span style={{ color: "#f9cb00" }}>FREE Demo Class</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12.5px", margin: "0 0 14px", lineHeight: 1.5 }}>
                  1-on-1 with a champion coach · Zero cost · Zero commitment
                </p>

                {/* Timer — clean inline layout */}
                <div
                  style={{
                    background: "rgba(249,203,0,0.06)",
                    border: "1px solid rgba(249,203,0,0.18)",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>⏳</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px" }}>
                      Offer expires in
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <span style={{ background: "rgba(249,203,0,0.15)", border: "1px solid rgba(249,203,0,0.3)", borderRadius: "6px", padding: "3px 10px", color: "#f9cb00", fontSize: "22px", fontWeight: 900, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                        {mm}
                      </span>
                      <span style={{ color: "#f9cb00", fontSize: "18px", fontWeight: 900 }}>:</span>
                      <span style={{ background: "rgba(249,203,0,0.15)", border: "1px solid rgba(249,203,0,0.3)", borderRadius: "6px", padding: "3px 10px", color: "#f9cb00", fontSize: "22px", fontWeight: 900, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                        {ss}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", marginLeft: "2px" }}>left</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                  <input
                    type="text"
                    placeholder="Your name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    style={inp}
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp / phone number *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value.replace(/[^0-9+]/g, "") }))}
                    maxLength={15}
                    style={inp}
                  />
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      placeholder="Email address (optional)"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      style={inp}
                    />
                    <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px", pointerEvents: "none" }}>
                      OPTIONAL
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      background: "#f9cb00",
                      color: "#0d0404",
                      border: "none",
                      borderRadius: "50px",
                      padding: "14px 20px",
                      fontWeight: 900,
                      fontSize: "14px",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.75 : 1,
                      boxShadow: "0 4px 20px rgba(249,203,0,0.4)",
                      marginTop: "2px",
                      transition: "transform 0.15s",
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {submitting ? "Booking…" : "🎯 Yes! Book My Free Demo →"}
                  </button>
                </form>

                <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "11px", textAlign: "center", marginTop: "10px" }}>
                  No credit card · No spam · 100% free
                </p>
              </div>
            </>
          )}

          {/* ─── CONFIRM LEAVE ─── */}
          {screen === "confirm" && (
            <div style={{ padding: "36px 24px 32px", textAlign: "center" }}>
              <div style={{ fontSize: "46px", marginBottom: "12px" }}>😢</div>
              <h2 style={{ color: "#ffffff", fontSize: "19px", fontWeight: 900, margin: "0 0 10px", lineHeight: 1.25 }}>
                Wait — you'll miss your <span style={{ color: "#f9cb00" }}>free spot!</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13.5px", lineHeight: 1.75, margin: "0 0 22px" }}>
                Only <strong style={{ color: "#fff" }}>3 demo sessions</strong> are available this week.
                Once they're taken, you'll be on the waitlist.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                <button
                  onClick={() => setScreen("offer")}
                  style={{ background: "#f9cb00", color: "#0d0404", border: "none", borderRadius: "50px", padding: "14px 24px", fontWeight: 900, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 20px rgba(249,203,0,0.4)" }}
                >
                  ✅ Keep my free spot
                </button>
                <button
                  onClick={dismissOffer}
                  style={{ background: "transparent", color: "rgba(255,255,255,0.3)", border: "none", fontSize: "12px", cursor: "pointer", padding: "8px", textDecoration: "underline" }}
                >
                  No thanks, I'll pass on this
                </button>
              </div>
            </div>
          )}

          {/* ─── SUCCESS ─── */}
          {screen === "success" && (
            <div style={{ padding: "40px 24px 36px", textAlign: "center" }}>
              <div style={{ fontSize: "52px", marginBottom: "14px" }}>🏆</div>
              <h2 style={{ color: "#f9cb00", fontSize: "21px", fontWeight: 900, margin: "0 0 10px", lineHeight: 1.2 }}>
                You just made your best move!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14.5px", lineHeight: 1.75, margin: "0 0 6px" }}>
                This is the <strong style={{ color: "#fff" }}>first step in the right direction</strong>. 🚀
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.7, margin: "0 0 24px" }}>
                Our coach will reach out within a few hours to schedule your session.
              </p>
              <button
                onClick={() => { onClose(); }}
                style={{ background: "#f9cb00", color: "#0d0404", border: "none", borderRadius: "50px", padding: "13px 30px", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}
              >
                Continue to website →
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
