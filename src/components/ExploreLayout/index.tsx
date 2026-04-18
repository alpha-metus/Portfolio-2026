"use client";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
  title: string;
  backLabel?: string;
  backHref?: string;
}

export default function ExploreLayout({ children, title, backLabel = "← Chess Hub", backHref = "/explore" }: Props) {
  return (
    <div style={{ backgroundColor: "#0d0404", minHeight: "100vh", color: "#fff" }}>
      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "rgba(13,4,4,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(249,203,0,0.12)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/">
          <Image src="/images/img_header_logo.png" width={100} height={28} alt="KwinBee" style={{ objectFit: "contain" }} />
        </Link>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>{title}</span>
        <Link href={backHref} style={{ color: "#f9cb00", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
          {backLabel}
        </Link>
      </div>
      {children}
    </div>
  );
}
