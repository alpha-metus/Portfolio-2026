import Link from "next/link";
import Image from "next/image";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: "40px" }}>
    <h2 style={{ color: "#f9cb00", fontSize: "18px", fontWeight: 700, marginBottom: "14px", borderBottom: "1px solid rgba(249,203,0,0.15)", paddingBottom: "8px" }}>
      {title}
    </h2>
    <div style={{ color: "#d1d5db", fontSize: "14px", lineHeight: 1.8 }}>{children}</div>
  </section>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li style={{ marginBottom: "6px", paddingLeft: "4px" }}>• {children}</li>
);

export default function PrivacyPolicy() {
  const updated = "18 April 2026";

  return (
    <div style={{ backgroundColor: "#0d0404", minHeight: "100vh", color: "#fff" }}>
      {/* Nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "rgba(13,4,4,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(249,203,0,0.12)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/">
          <Image src="/images/img_header_logo.png" width={100} height={28} alt="KwinBee" style={{ objectFit: "contain" }} />
        </Link>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>Privacy Policy</span>
        <Link href="/" style={{ color: "#f9cb00", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>← Home</Link>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "52px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, marginBottom: "10px" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#6b7280", fontSize: "13px" }}>
            Last updated: <strong style={{ color: "#9ca3af" }}>{updated}</strong>
          </p>
          <div style={{ backgroundColor: "rgba(249,203,0,0.08)", border: "1px solid rgba(249,203,0,0.2)", borderRadius: "12px", padding: "14px 18px", marginTop: "16px" }}>
            <p style={{ color: "#fde68a", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
              <strong>Important notice:</strong> KwinBee's services are designed for children aged 5–18. We take children's privacy seriously and comply with applicable laws including <strong>COPPA</strong> (USA), <strong>GDPR</strong> (EU/UK), and India's <strong>DPDP Act 2023</strong>. We do not knowingly collect personal data from children under 13 without verifiable parental consent.
            </p>
          </div>
        </div>

        <Section title="1. Who We Are">
          <p>KwinBee (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an online chess coaching platform. We run fully online and offer live chess classes for children aged 5–18 under the guidance of national and international chess champions. Our students and coaches are located across the globe.</p>
          <br />
          <p><strong style={{ color: "#fff" }}>Contact:</strong></p>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
            <Li>Email: <a href="mailto:kwinbee.chess@gmail.com" style={{ color: "#60a5fa" }}>kwinbee.chess@gmail.com</a></Li>
            <Li>Website: <a href="https://kwinbee.com" style={{ color: "#60a5fa" }}>kwinbee.com</a></Li>
          </ul>
        </Section>

        <Section title="2. Information We Collect">
          <p style={{ marginBottom: "12px" }}>We collect the following information when you fill in our contact / booking form:</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <Li><strong style={{ color: "#fff" }}>Parent / Guardian name</strong> — to address our communications</Li>
            <Li><strong style={{ color: "#fff" }}>Child's name and age</strong> — to personalise coaching</Li>
            <Li><strong style={{ color: "#fff" }}>Phone / WhatsApp number</strong> — to confirm bookings and share class details</Li>
            <Li><strong style={{ color: "#fff" }}>Email address</strong> (optional) — for receipts and updates</Li>
            <Li><strong style={{ color: "#fff" }}>Chess skill level</strong> — to assign the right coach</Li>
          </ul>
          <br />
          <p>We also collect anonymised usage data via cookies (see Section 6).</p>
        </Section>

        <Section title="3. Third-Party Messengers — WhatsApp & Instagram">
          <div style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
            <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: "13px", margin: 0 }}>
              ⚠️ Important disclosure about social messaging platforms
            </p>
          </div>
          <p style={{ marginBottom: "12px" }}>We use the following third-party platforms for lead generation and parent/guardian communication:</p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
            <Li><strong style={{ color: "#fff" }}>WhatsApp</strong> (Meta Platforms Inc.) — We use a WhatsApp link (<code style={{ backgroundColor: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: "4px" }}>+1 (747) 324-9524</code>) to allow parents to contact us directly. Clicking this link opens WhatsApp on your device and initiates a chat with KwinBee.</Li>
            <Li><strong style={{ color: "#fff" }}>Instagram</strong> (Meta Platforms Inc.) — Our Instagram page (<code style={{ backgroundColor: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: "4px" }}>@kwinbee64</code>) is used to share student achievements and coaching content.</Li>
          </ul>
          <p style={{ marginBottom: "12px" }}><strong style={{ color: "#e5e7eb" }}>How this data is used:</strong></p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <Li>Contact information shared via WhatsApp is used <strong style={{ color: "#fff" }}>only</strong> to respond to your enquiry and confirm bookings.</Li>
            <Li>We do <strong style={{ color: "#fff" }}>not</strong> share your contact details with third parties for marketing purposes.</Li>
            <Li>WhatsApp and Instagram are governed by <strong style={{ color: "#fff" }}>Meta's own Privacy Policy</strong>. We encourage you to review it at <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" style={{ color: "#60a5fa" }}>facebook.com/privacy/policy</a>.</Li>
          </ul>
          <br />
          <p><strong style={{ color: "#e5e7eb" }}>Children under 13:</strong> Our website includes an age verification step before redirecting users to any social messaging platform. Students who identify as under 13 are shown contact details for their parent or guardian to use instead. We do not redirect minors under 13 to WhatsApp or Instagram directly.</p>
        </Section>

        <Section title="4. How We Use Your Information">
          <ul style={{ listStyle: "none", padding: 0 }}>
            <Li>To schedule and confirm chess coaching sessions</Li>
            <Li>To contact parents/guardians about class timings, progress, and fees</Li>
            <Li>To personalise the coaching programme for the student</Li>
            <Li>To send important updates about KwinBee services</Li>
            <Li>To improve our website and marketing (only with your cookie consent)</Li>
          </ul>
          <br />
          <p>We do <strong style={{ color: "#fff" }}>not</strong> sell, rent, or share your personal data with third parties for advertising purposes.</p>
        </Section>

        <Section title="5. Children's Privacy (COPPA & DPDP Act)">
          <ul style={{ listStyle: "none", padding: 0 }}>
            <Li>Our services target children aged 5–18. All communications and data collection is directed at <strong style={{ color: "#fff" }}>parents and guardians</strong>, not the children themselves.</Li>
            <Li>We implement an <strong style={{ color: "#fff" }}>age-screening gate</strong> on our website to identify student visitors under 13 and redirect them to parental contact options.</Li>
            <Li>We do not knowingly collect personal information from children under 13 without verifiable parental consent.</Li>
            <Li>If you believe we have inadvertently collected data from a child under 13, please email us at <a href="mailto:kwinbee.chess@gmail.com" style={{ color: "#60a5fa" }}>kwinbee.chess@gmail.com</a> and we will delete it promptly.</Li>
            <Li>Under India's DPDP Act 2023, we treat all users under 18 as minors requiring parental consent for data processing.</Li>
          </ul>
        </Section>

        <Section title="6. Cookies & Tracking">
          <p style={{ marginBottom: "12px" }}>We use the following types of cookies:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {[
              { type: "Strictly Necessary", desc: "Required for the website to function. Cannot be disabled.", always: true },
              { type: "Analytics / Tracking", desc: "Meta Pixel (Facebook) — tracks page views and button clicks to measure ad performance. Only activated with your explicit consent.", always: false },
            ].map((c) => (
              <div key={c.type} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, color: "#e5e7eb", fontSize: "13px" }}>{c.type}</span>
                  {c.always && <span style={{ backgroundColor: "rgba(74,222,128,0.15)", color: "#4ade80", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>Always Active</span>}
                  {!c.always && <span style={{ backgroundColor: "rgba(249,203,0,0.12)", color: "#f9cb00", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>Consent Required</span>}
                </div>
                <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <p>You can change your cookie preferences at any time by clearing your browser's local storage and revisiting our site.</p>
        </Section>

        <Section title="7. Data Retention">
          <ul style={{ listStyle: "none", padding: 0 }}>
            <Li>Enquiry form data is retained for up to <strong style={{ color: "#fff" }}>24 months</strong> or until the coaching relationship ends.</Li>
            <Li>WhatsApp chat history is stored within WhatsApp's infrastructure and governed by Meta's data retention policies.</Li>
            <Li>You may request deletion of your data at any time by contacting us.</Li>
          </ul>
        </Section>

        <Section title="8. Your Rights">
          <p style={{ marginBottom: "12px" }}>Depending on your location, you may have the right to:</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <Li><strong style={{ color: "#fff" }}>Access</strong> — request a copy of the data we hold about you</Li>
            <Li><strong style={{ color: "#fff" }}>Correction</strong> — ask us to update inaccurate data</Li>
            <Li><strong style={{ color: "#fff" }}>Deletion</strong> — request we delete your personal data (&quot;right to be forgotten&quot;)</Li>
            <Li><strong style={{ color: "#fff" }}>Objection</strong> — object to certain types of processing</Li>
            <Li><strong style={{ color: "#fff" }}>Portability</strong> — request your data in a portable format</Li>
          </ul>
          <br />
          <p>To exercise any right, email us at <a href="mailto:kwinbee.chess@gmail.com" style={{ color: "#60a5fa" }}>kwinbee.chess@gmail.com</a>. We will respond within 30 days.</p>
        </Section>

        <Section title="9. Security">
          <p>We take reasonable precautions to protect your personal data from unauthorised access, disclosure, or loss. However, no internet transmission is 100% secure. We use HTTPS for all data in transit.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. For significant changes, we will notify parents/guardians via WhatsApp or email.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>If you have questions or concerns about this privacy policy or your data, please contact:</p>
          <div style={{ backgroundColor: "rgba(249,203,0,0.06)", border: "1px solid rgba(249,203,0,0.15)", borderRadius: "14px", padding: "20px 24px", marginTop: "12px" }}>
            <p style={{ fontWeight: 700, color: "#fff", marginBottom: "8px" }}>KwinBee Chess</p>
            <p style={{ color: "#9ca3af", fontSize: "13px", margin: "4px 0" }}>📧 <a href="mailto:kwinbee.chess@gmail.com" style={{ color: "#60a5fa" }}>kwinbee.chess@gmail.com</a></p>
            <p style={{ color: "#9ca3af", fontSize: "13px", margin: "4px 0" }}>🌐 <a href="https://kwinbee.com" style={{ color: "#60a5fa" }}>kwinbee.com</a></p>
          </div>
        </Section>
      </div>
    </div>
  );
}
