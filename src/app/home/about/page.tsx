"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Meteors } from "@/components/meteors";
import { BackgroundBeams } from "@/components/ui/background-beams";

function AboutPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

    // Animation for title and subtitle
    timeline.fromTo(
      titleRef.current,
      { opacity: 0, y: -60 },
      { opacity: 1, y: 0, ease: "bounce.out" }
    );
    timeline.fromTo(
      subtitleRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0 },
      "<0.5"
    );

    // Card animations - each one enters with a different effect
    cardRefs.forEach((card, index) => {
      timeline.fromTo(
        card.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, delay: index * 0.2, ease: "back.out(1.7)" }
      );
    });

    // Button animation
    timeline.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 },
      "<0.5"
    );
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="relative min-h-screen p-10 overflow-hidden dark:bg-gradient-to-r dark:from-gray-200 dark:via-gray-500 dark:to-indigo-800 bg-gradient-to-r from-indigo-800 via-gray-500 to-gray-200">
      <BackgroundBeams />
      <Meteors number={40} />
      {/* Container */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10 relative z-10">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent"
        >
          About CryptoVista
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl font-medium text-gray-200 max-w-4xl"
        >
          CryptoVista is a platform designed to simplify the complex world of cryptocurrencies. Whether you&apos;re a seasoned trader or a curious beginner, CryptoVista helps you make informed decisions with ease.
        </p>

        {/* Card Section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
          <div
            ref={cardRefs[0]}
            className="w-full sm:w-1/3 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We aim to bridge the gap between the complexity of cryptocurrencies and the everyday user. Our vision is to create a platform that makes crypto accessible for all.
            </p>
          </div>

          <div
            ref={cardRefs[1]}
            className="w-full sm:w-1/3 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Our Features</h2>
            <p className="text-gray-700 dark:text-gray-300">
              With real-time price tracking, customizable watchlists, and easy-to-understand market analysis, CryptoVista provides all the tools you need to stay ahead in the crypto world.
            </p>
          </div>

          <div
            ref={cardRefs[2]}
            className="w-full sm:w-1/3 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">About the Developer</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Hi, I&apos;m Gulshan, the creator behind CoinVerse. I&apos;m passionate about building products that make complex subjects like cryptocurrencies easier to understand and more accessible for everyone.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <button
          ref={buttonRef}
          className="mt-10 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-500 transform hover:scale-105 transition-all duration-300"
        >
          Explore Features
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
