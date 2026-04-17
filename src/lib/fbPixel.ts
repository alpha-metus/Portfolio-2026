declare global {
  interface Window {
    fbq: any;
  }
}

export const FB_PIXEL_ID = "1762547577601215";

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const event = (name: string, options = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options);
  }
};

// ── Custom event helpers used across the site ──

const isPixelLoaded = (): boolean => {
  return typeof window !== "undefined" && typeof window.fbq === "function";
};

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (isPixelLoaded()) {
    window.fbq("trackCustom", eventName, parameters);
  }
};

export const trackWhatsAppClick = () => {
  trackEvent("Contact_Us_Button_Click", {
    content_name: "WhatsApp Contact Button",
    content_category: "Contact CTA",
    source: "hero_section",
    method: "whatsapp",
  });
};

export const trackJoinClassClick = () => {
  trackEvent("Join_Class_Button_Click", {
    content_name: "Join Class Button",
    content_category: "Booking CTA",
    source: "hero_section",
    method: "form",
  });
};

export const trackButtonClick = (
  buttonName: string,
  section: string = "homepage"
) => {
  trackEvent("Lead", {
    content_name: buttonName,
    content_category: "CTA Button",
    source: section,
  });
};
