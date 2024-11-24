'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import Carousel from "../components/Carousel"; // Make sure to import your carousel component
import HomeTile from "./HomeTitle";
import { FollowerPointerCard } from "../components/ui/following-pointer";
import gsap from "gsap"; // Don't forget to import GSAP
import ChooseUs from "./ChooseUs";
import { HeroParallaxDemo } from "./HeroParallaxCard";

const Homepage: React.FC = () => {
  useEffect(() => {
    // GSAP animation for the .para class
    gsap.fromTo(
      ".para",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  return (
    <FollowerPointerCard>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section
          className="h-screen bg-cover bg-center relative flex items-center justify-center text-gray-800 dark:text-white text-center"
          style={{
            backgroundImage: `url('/bg-homepage.jpg')`,
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 backdrop-blur-[5px]"></div>

          <div className="relative z-5 max-w-4xl p-6 sm:p-10 text-center">
            <HomeTile />

            <Carousel />

            <p
              className="para text-lg sm:text-xl mb-6 sm:mb-8 max-w-full mx-auto font-bold text-yellow-600 dark:text-yellow-200 bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-50 p-4 rounded-lg shadow-lg"
              style={{
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              Real-time data, personalized tracking, and an intuitive interface.
              <span className="font-bold text-gray-800 dark:text-white">
                {" "}
                Dive Into the Details and Stay Ahead in the Crypto Game
              </span>
            </p>

            <Link href={"/home"}>
              <button className="px-6 py-3 sm:px-8 sm:py-4 text-md sm:text-lg font-semibold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 dark:from-yellow-500 dark:via-yellow-600 dark:to-yellow-700 text-gray-800 dark:text-white rounded-xl shadow-2xl transition-transform duration-300 hover:scale-110 transform">
                Start Tracking
              </button>
            </Link>
          </div>
        </section>

        <div>
          <ChooseUs/>
        </div>

        <div>
          <HeroParallaxDemo/>
        </div>

        {/* Footer */}
        <footer className="py-4 sm:py-8 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white text-center transition-colors duration-500">
          <p className="text-sm sm:text-lg">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">
              CryptoTrack
            </span>
            . All Rights Reserved.
          </p>
        </footer>

        {/* Bottom Navigation */}
        <nav className="fixed lg:hidden flex bottom-0 z-50 left-0 right-0 bg-gray-100 dark:bg-gray-900 shadow-lg text-gray-800 dark:text-white justify-between sm:justify-around items-center px-6 sm:px-10 py-3 border-t border-gray-300 dark:border-gray-700">
          <Link href="/home/favorites">
            <button className="text-yellow-600 hover:text-yellow-400 flex flex-col items-center">
              <span>⭐</span>
              <span className="text-xs">Favorites</span>
            </button>
          </Link>
          <Link href="/home/exchange">
            <button className="text-yellow-600 hover:text-yellow-400 flex flex-col items-center">
              <span>💱</span>
              <span className="text-xs">Exchange</span>
            </button>
          </Link>
          <Link href="/home/about">
            <button className="text-yellow-600 hover:text-yellow-400 flex flex-col items-center">
              <span>ℹ️</span>
              <span className="text-xs">About</span>
            </button>
          </Link>
        </nav>
      </div>
    </FollowerPointerCard>
  );
};

export default Homepage;