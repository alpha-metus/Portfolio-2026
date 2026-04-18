import PrivacyPolicy from "@/components/PrivacyPolicy";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "Privacy Policy | KwinBee Chess Academy",
  description:
    "KwinBee's privacy policy explains how we collect, use, and protect your personal data. COPPA, GDPR, and DPDP Act 2023 compliant. We take children's privacy seriously.",
  alternates: { canonical: `${BASE}/privacy-policy` },
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
