import React, { useEffect } from "react";
import { FlipWords } from "./ui/flip-words";
import gsap from "gsap";

const HomeTile = () => {
  const words = ["Track", "Precise", "Advanced", "Smart"];

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.from(".text-head",
      { opacity: 0, y: -100 , duration: 1, overflow: "hidden"}, // Start from above
    )
  }, []);

  return (
    <div className="home-tile">
      <h1
        className="text-head text-2xl text-gray-300 dark:text-white sm:text-3xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text mb-10"
        style={{
          textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
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
