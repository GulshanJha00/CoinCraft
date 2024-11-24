import React from "react";
import Link from "next/link";
import Carousel from "../components/Carousel"; // Make sure to import your carousel component
import HomeTile from "./HomeTitle";

const Homepage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center relative flex items-center justify-center text-gray-800 dark:text-white text-center"
        style={{
          backgroundImage: `url('/bg-homepage.jpg')`,
        }}
      >
        {/* Background */}
        <div className="absolute backdrop-blur-[5px] inset-0 bg-gray-400 dark:bg-black opacity-30 "></div>

        <div className="relative z-10 max-w-4xl p-10 text-center">
          <HomeTile/>

          {/* Carousel Component */}
          <Carousel />

          <p
            className="text-xl sm:text-lg mb-8 max-w-full mx-auto font-bold text-yellow-600 dark:text-yellow-200 bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-50 p-4 rounded-lg shadow-lg"
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
            <button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 dark:from-yellow-500 dark:via-yellow-600 dark:to-yellow-700 text-gray-800 dark:text-white rounded-xl shadow-2xl transition-transform duration-300 hover:scale-110 transform">
              Start Tracking
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white text-center transition-colors duration-500">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-6">
          Why Choose{" "}
          <span className="underline decoration-yellow-600 text-yellow-500 dark:decoration-yellow-400">
            CryptoTrack?
          </span>
        </h2>
        <p className="text-lg sm:text-base font-light mb-8 max-w-4xl mx-auto">
          CryptoTrack is built for both{" "}
          <span className="text-yellow-600 dark:text-yellow-400 font-bold">
            beginners and professionals.
          </span>{" "}
          Experience{" "}
          <span className="text-yellow-600 dark:text-yellow-400 font-bold">
            lightning-fast updates, visualized market trends,
          </span>{" "}
          and the tools you need to stay{" "}
          <span className="text-yellow-600 dark:text-yellow-400 font-bold">
            ahead
          </span>{" "}
          in the game.
        </p>
        <button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 dark:from-yellow-600 dark:via-yellow-700 dark:to-yellow-800 text-gray-800 dark:text-white rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 transform">
          Explore Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white text-center transition-colors duration-500">
        <p className="text-lg">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-yellow-600 dark:text-yellow-400 font-bold">
            CryptoTrack
          </span>
          . All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
