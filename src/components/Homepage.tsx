"use client"; // Enables interactivity

import React from "react";
import Link from "next/link";
const Homepage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center relative flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: `url('/bg-homepage.jpg')`,
        }}
      >
        {/* Dark Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6 text-center animate__animated animate__fadeIn">
          <h1 className="text-6xl font-extrabold tracking-tight text-white mb-4">
            CryptoTrack: Track Your Crypto Journey
          </h1>
          <p className="text-xl font-light mb-8 max-w-3xl mx-auto text-gray-200">
            Real-time data, personalized tracking, and an intuitive interface. Take control of your investments and explore the world of cryptocurrency like never before.
          </p>
          <Link href={"/home"}>
          
          <button
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 text-white rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 transform"
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Start Tracking
          </button>
          
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 bg-gray-900 text-white text-center">
        <h2 className="text-5xl font-extrabold tracking-tight mb-6">Why Choose CryptoTrack?</h2>
        <p className="text-lg font-light mb-8 max-w-4xl mx-auto">
          CryptoTrack is built for both beginners and professionals. Experience lightning-fast updates, visualized market trends, and the tools you need to stay ahead in the game.
        </p>
        <button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-pink-600 via-red-500 to-orange-400 text-white rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 transform">
          Explore Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p className="text-lg">&copy; {new Date().getFullYear()} CryptoTrack. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
