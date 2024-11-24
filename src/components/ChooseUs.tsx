import React, { useEffect } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Project data with unique `id` for each project
export const projects = [
  {
    id: "real-time-updates",
    title: "Real-Time Updates",
    description: "Get the latest crypto market data and price changes as they happen.",
    link: "#real-time-updates",
    image: "/realtimedata.png",
  },
  {
    id: "trends-visualization",
    title: "Trends Visualization",
    description: "Explore market trends with powerful visualizations that simplify data.",
    link: "#trends-visualization",
    image: "/assets/trends-visualization.svg",
  },
  {
    id: "user-friendly-interface",
    title: "User-Friendly Interface",
    description: "Intuitive design for seamless navigation, perfect for all users.",
    link: "#user-friendly-interface",
    image: "/assets/user-friendly.svg",
  },
  {
    id: "enhanced-security",
    title: "Enhanced Security",
    description: "Rest assured with industry-grade security for all your crypto data.",
    link: "#enhanced-security",
    image: "/assets/security.svg",
  },
  {
    id: "custom-tracking",
    title: "Custom Tracking",
    description: "Personalize your dashboard with tracked coins and custom alerts.",
    link: "#custom-tracking",
    image: "/assets/custom-tracking.svg",
  },
  {
    id: "Store Favorites",
    title: "Store Favorites",
    description: "Store your favorites data without loggin in in your personal computer",
    link: "#Store-Faviourite",
    image: "/assets/community.svg",
  },
];

// ChooseUs Section Component
const ChooseUs = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animation on scroll
    gsap.fromTo(
      ".section-title",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 80%", // Start animation when the element is 80% from the top
          end: "top 30%",
          scrub: true, // Smooth scrubbing animation
        },
      }
    );

    gsap.fromTo(
      ".section-description",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".section-description",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="py-20 px-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2
          className="section-title text-4xl font-extrabold tracking-tight mb-6"
        >
          Why Choose{" "}
          <span className="text-yellow-500 dark:text-yellow-400 underline">
            CryptoTrack?
          </span>
        </h2>
        <p
          className="section-description text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Unlock the full potential of cryptocurrency tracking with tools and features tailored to both beginners and pros.
          From real-time updates to market insights, CryptoTrack helps you stay ahead in the crypto game.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    </section>
  );
};

export default ChooseUs;
