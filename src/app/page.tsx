import Home from "@/container/Home";
import React from "react";

export const metadata = {
  title:
    "KwinBee - Professional Chess Tutors | Online Chess Coaching for All Levels",
  description:
    "Master chess with top tutors through personalized online lessons. Learn strategies, tactics, and openings to elevate your game at every level.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_DEV_BASE_URL,
  },
};

const HomePage = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default HomePage;
