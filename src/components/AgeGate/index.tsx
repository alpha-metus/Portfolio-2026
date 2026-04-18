"use client";
import { useState, useEffect } from "react";

interface Props {
  onProceed: () => void;
  onClose: () => void;
  destination?: string; // "WhatsApp" | "Instagram" etc.
}

type Step = "role" | "age" | "math" | "blocked";

function randomMath() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function AgeGate({ onProceed, onClose, destination = "WhatsApp" }: Props) {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<"student" | "parent" | null>(null);
  const [age, setAge] = useState("");
  const [math] = useState(randomMath);
  const [mathInput, setMathInput] = useState("");
  const [mathError, setMathError] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleRoleSelect = (r: "student" | "parent") => {
    setRole(r);
    if (r === "parent") {
      setStep("math");
    } else {
      setStep("age");
    }
  };

  const handleAgeSubmit = () => {
    const ageNum = parseInt(age, 10);
    if (!ageNum || ageNum < 3 || ageNum > 100) return;
    if (ageNum < 13) {
      setStep("blocked");
    } else {
      setStep("math");
    }
  };

  const handleMathSubmit = () => {
    if (parseInt(mathInput, 10) === math.answer) {
      setMathError(false);
      onProceed();
    } else {
      setMathError(true);
      setMathInput("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          backgroundColor: "#111",
          border: "1px solid rgba(249,203,0,0.25)",
          borderRadius: "24px",
          padding: "36px 32px",
          maxWidth: "440px",
          width: "100%",
          position: "relative",
          animation: "fadeIn 0.2s ease",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "rgba(255,255,255,0.08)", border: "none",
            color: "#9ca3af", width: "32px", height: "32px",
            borderRadius: "50%", fontSize: "16px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ✕
        </button>

        {/* ── STEP: Role ── */}
        {step === "role" && (
          <>
            <div style={{ fontSize: "36px", marginBottom: "16px", textAlign: "center" }}>👋</div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "20px", marginBottom: "8px", textAlign: "center" }}>
              Before you connect on {destination}
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "13px", textAlign: "center", marginBottom: "28px", lineHeight: 1.6 }}>
              To keep our students safe, we need to know who&apos;s reaching out.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={() => handleRoleSelect("parent")}
                style={roleBtn("#f9cb00")}
              >
                👨‍👩‍👧 I&apos;m a Parent / Guardian
              </button>
              <button
                onClick={() => handleRoleSelect("student")}
                style={roleBtn("rgba(255,255,255,0.12)")}
              >
                🎓 I&apos;m a Student
              </button>
            </div>
            <p style={{ color: "#4b5563", fontSize: "11px", textAlign: "center", marginTop: "16px" }}>
              This helps us comply with child safety laws (COPPA / DPDP Act)
            </p>
          </>
        )}

        {/* ── STEP: Age (student only) ── */}
        {step === "age" && (
          <>
            <div style={{ fontSize: "36px", marginBottom: "16px", textAlign: "center" }}>🎂</div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "20px", marginBottom: "8px", textAlign: "center" }}>
              How old are you?
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "13px", textAlign: "center", marginBottom: "24px" }}>
              Enter your age to continue.
            </p>
            <input
              type="number"
              min={3}
              max={100}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAgeSubmit()}
              placeholder="Your age"
              autoFocus
              style={inputStyle}
            />
            <button
              onClick={handleAgeSubmit}
              disabled={!age}
              style={primaryBtn(!age)}
            >
              Continue →
            </button>
            <button onClick={() => setStep("role")} style={backBtn}>← Back</button>
          </>
        )}

        {/* ── STEP: Blocked (under 13) ── */}
        {step === "blocked" && (
          <>
            <div style={{ fontSize: "40px", marginBottom: "16px", textAlign: "center" }}>🔒</div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "20px", marginBottom: "12px", textAlign: "center" }}>
              Please ask a parent!
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "13px", textAlign: "center", marginBottom: "24px", lineHeight: 1.7 }}>
              Students under 13 cannot be directed to social messaging apps without
              a parent&apos;s consent. Please ask your parent or guardian to reach out
              on your behalf.
            </p>
            <div
              style={{
                backgroundColor: "rgba(249,203,0,0.08)",
                border: "1px solid rgba(249,203,0,0.25)",
                borderRadius: "14px",
                padding: "16px 20px",
                marginBottom: "20px",
              }}
            >
              <p style={{ color: "#f9cb00", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>
                ✉️ Parent can reach us directly:
              </p>
              <a href="mailto:kwinbee.chess@gmail.com" style={{ color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "block" }}>
                kwinbee.chess@gmail.com
              </a>
            </div>
            <button onClick={onClose} style={primaryBtn(false)}>Got it, I&apos;ll ask my parent ✓</button>
          </>
        )}

        {/* ── STEP: Math gate ── */}
        {step === "math" && (
          <>
            <div style={{ fontSize: "36px", marginBottom: "16px", textAlign: "center" }}>🧮</div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "20px", marginBottom: "8px", textAlign: "center" }}>
              Quick check
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "13px", textAlign: "center", marginBottom: "24px" }}>
              Solve this to continue to {destination}:
            </p>
            <div
              style={{
                backgroundColor: "rgba(249,203,0,0.08)",
                border: "1px solid rgba(249,203,0,0.2)",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <span style={{ color: "#f9cb00", fontSize: "28px", fontWeight: 800 }}>
                {math.a} + {math.b} = ?
              </span>
            </div>
            <input
              type="number"
              value={mathInput}
              onChange={(e) => { setMathInput(e.target.value); setMathError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleMathSubmit()}
              placeholder="Your answer"
              autoFocus
              style={{ ...inputStyle, borderColor: mathError ? "#ef4444" : "rgba(255,255,255,0.15)" }}
            />
            {mathError && (
              <p style={{ color: "#f87171", fontSize: "12px", textAlign: "center", margin: "6px 0 0" }}>
                ✗ Incorrect answer — please try again
              </p>
            )}
            <button
              onClick={handleMathSubmit}
              disabled={!mathInput}
              style={primaryBtn(!mathInput)}
            >
              Open {destination} →
            </button>
            <button onClick={() => setStep(role === "student" ? "age" : "role")} style={backBtn}>← Back</button>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── Style helpers ──
const roleBtn = (bg: string): React.CSSProperties => ({
  width: "100%",
  padding: "14px 20px",
  borderRadius: "12px",
  border: bg === "#f9cb00" ? "none" : "1px solid rgba(255,255,255,0.12)",
  backgroundColor: bg,
  color: bg === "#f9cb00" ? "#000" : "#e5e7eb",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
  textAlign: "center" as const,
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.15)",
  backgroundColor: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontSize: "16px",
  outline: "none",
  marginBottom: "14px",
  boxSizing: "border-box",
};

const primaryBtn = (disabled: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "13px 20px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: disabled ? "rgba(249,203,0,0.4)" : "#f9cb00",
  color: "#000",
  fontWeight: 800,
  fontSize: "14px",
  cursor: disabled ? "not-allowed" : "pointer",
  marginBottom: "10px",
});

const backBtn: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "8px",
  background: "none",
  border: "none",
  color: "#6b7280",
  fontSize: "13px",
  cursor: "pointer",
  textAlign: "center",
};
