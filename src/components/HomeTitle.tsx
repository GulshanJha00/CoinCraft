'use client'
import React, { useEffect } from "react";
import { FlipWords } from "./ui/flip-words";
import gsap from "gsap";

const HomeTile = () => {
  const words = ["Track", "Precise", "Advanced", "Smart"];

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.from(".text-head", {
      opacity: 0,
      y: -100,
      duration: 1,
      overflow: "hidden", // Start from above
    });
  }, []);

  return (
    <div className="home-tile w-full flex justify-center items-center ">
      <h1
        className="text-head font-extrabold text-[1.5rem] sm:text-3xl md:text-4xl lg:text-6xl font-['Poppins'] bg-clip-text mb-6 text-center sm:text-left"
        style={{
          textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)", // Add shadow for extra effect
        }}
      >
        {/* CoinVerse: animated from bottom */}
        <span className="coinverse-heading text-yellow-400 dark:text-yellow-400">
          CoinVerse:
        </span>{" "}
        {/* FlipWords animated from left */}
        <FlipWords words={words} className="flip-words text-white dark:text-white" /> <br />
        Your Crypto{" "}
        {/* Journey animated from the right */}
        <span className="journey-heading underline decoration-yellow-600 dark:decoration-yellow-400">
          Journey
        </span>
      </h1>
    </div>
  );
};

export default HomeTile;
