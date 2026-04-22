"use client";

const orgs = [
  {
    key: "fide",
    logo: (
      <svg width="105" height="42" viewBox="0 0 90 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Globe ring */}
        <ellipse cx="18" cy="18" rx="11" ry="11" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <ellipse cx="18" cy="18" rx="5" ry="11" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        <line x1="7" y1="18" x2="29" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="9.5" y1="11" x2="26.5" y2="11" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="9.5" y1="25" x2="26.5" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Text */}
        <text x="36" y="23" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="2">FIDE</text>
      </svg>
    ),
    label: "FIDE",
  },
  {
    key: "uschess",
    logo: (
      <svg width="126" height="42" viewBox="0 0 108 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Knight silhouette — simplified */}
        <path
          d="M14 28 L14 22 C14 22 11 20 11 16 C11 12 14 10 14 10 L16 12 C16 12 17 10 19 10 C21 10 22 11 22 12 C23 11.5 24 12 24 13 C24 14 23 14.5 22 14 C22 15 21 17 21 19 L22 28 Z"
          stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round"
        />
        <rect x="11" y="28" width="13" height="2.5" rx="1.2" fill="currentColor" opacity="0.7" />
        {/* Text */}
        <text x="31" y="17" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="800" fill="currentColor" letterSpacing="0.5">US</text>
        <text x="31" y="28" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600" fill="currentColor" letterSpacing="0.5" opacity="0.85">CHESS</text>
      </svg>
    ),
    label: "US Chess",
  },
  {
    key: "ecf",
    logo: (
      <svg width="102" height="42" viewBox="0 0 88 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Crown */}
        <path
          d="M10 26 L10 18 L13 21 L18 14 L23 21 L26 18 L26 26 Z"
          stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"
        />
        <rect x="9" y="26" width="18" height="2.5" rx="1.2" fill="currentColor" opacity="0.7" />
        {/* Dots on crown peaks */}
        <circle cx="10" cy="17.5" r="1.2" fill="currentColor" />
        <circle cx="18" cy="13.5" r="1.2" fill="currentColor" />
        <circle cx="26" cy="17.5" r="1.2" fill="currentColor" />
        {/* Text */}
        <text x="33" y="23" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="2">ECF</text>
      </svg>
    ),
    label: "ECF",
  },
  {
    key: "aicf",
    logo: (
      <svg width="114" height="42" viewBox="0 0 98 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lotus / Ashoka chakra simplified */}
        <circle cx="18" cy="18" r="9" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.5" />
        {/* Spokes */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
          <line
            key={i}
            x1={18 + 3.5 * Math.cos((deg * Math.PI) / 180)}
            y1={18 + 3.5 * Math.sin((deg * Math.PI) / 180)}
            x2={18 + 8.5 * Math.cos((deg * Math.PI) / 180)}
            y2={18 + 8.5 * Math.sin((deg * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        ))}
        {/* Text */}
        <text x="33" y="23" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="2">AICF</text>
      </svg>
    ),
    label: "AICF",
  },
  {
    key: "chesscom",
    logo: (
      <svg width="143" height="42" viewBox="0 0 122 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chess.com badge square */}
        <rect x="6" y="6" width="24" height="24" rx="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        {/* Knight inside */}
        <path
          d="M15 26 L15 21 C15 21 12.5 19.5 12.5 16.5 C12.5 13.5 15 12 15 12 L16.5 13.5 C16.5 13.5 17.5 12 19 12 C20.5 12 21 13 21 13.5 C21.8 13 22.5 13.5 22.5 14.5 C22.5 15 22 15.5 21 15 C21 16 20 18 20 20 L21 26 Z"
          stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" strokeLinecap="round"
        />
        <rect x="12.5" y="26" width="9" height="2" rx="1" fill="currentColor" opacity="0.6" />
        {/* Text */}
        <text x="37" y="16" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="800" fill="currentColor" letterSpacing="0">Chess</text>
        <text x="37" y="28" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="400" fill="currentColor" opacity="0.75">.com</text>
      </svg>
    ),
    label: "Chess.com",
  },
  {
    key: "lichess",
    logo: (
      <svg width="126" height="42" viewBox="0 0 108 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lichess knight — open-source style minimal */}
        <path
          d="M12 29 L12 22 C12 22 9 20 9 16 C9 12 13 8 13 8 C13 8 14 10 16 10 C18 10 20 8.5 22 9 C23.5 9.5 24 11 23 12 C22 13 21 13 21 14 C21 16 20 19 21 22 L22 29 Z"
          stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round"
        />
        {/* Ear */}
        <circle cx="21" cy="9.5" r="1.5" fill="currentColor" opacity="0.7" />
        <rect x="9" y="29" width="14" height="2.5" rx="1.2" fill="currentColor" opacity="0.7" />
        {/* Text */}
        <text x="30" y="23" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="0.3">lichess</text>
      </svg>
    ),
    label: "Lichess",
  },
];

export default function CompaniesSection() {
  return (
    <div
      className="w-full py-12 px-6"
      style={{
        backgroundColor: "#110505",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p
        className="text-center mb-10"
        style={{
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        Companies &amp; Organisations We Work With
      </p>

      <div className="flex flex-nowrap items-center justify-center gap-x-8 max-w-6xl mx-auto overflow-x-auto pb-1 sm:gap-x-5">
        {orgs.map((org) => (
          <div
            key={org.key}
            title={org.label}
            style={{
              color: "rgba(255,255,255,0.72)",
              transition: "color 0.2s, filter 0.2s",
              cursor: "default",
              display: "flex",
              alignItems: "center",
              filter: "drop-shadow(0 0 0px transparent)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.color = "rgba(255,255,255,1)";
              el.style.filter = "drop-shadow(0 0 8px rgba(249,203,0,0.35))";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.color = "rgba(255,255,255,0.72)";
              el.style.filter = "drop-shadow(0 0 0px transparent)";
            }}
          >
            {org.logo}
          </div>
        ))}
      </div>
    </div>
  );
}
