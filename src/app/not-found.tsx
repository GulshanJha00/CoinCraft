"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Title */}
      <h1 className="text-6xl sm:text-8xl font-bold text-yellow-400 mb-6">
        404
      </h1>

      {/* Subtitle */}
      <p className="text-xl sm:text-2xl text-gray-300 mb-8 text-center px-4">
        Oops! This page seems to have gone off-chain. <br />
        Let&apos;s get you back on track.
      </p>

      {/* Go Home Button */}
      <Link href="/">
        <button className="px-6 py-3 bg-yellow-400 text-black text-lg rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 shadow-lg">
          Back to Dashboard
        </button>
      </Link>

      {/* Decorative Background Circles */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-80 h-80 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
        <div className="w-96 h-96 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full opacity-20 blur-3xl animate-spin-slow"></div>
      </div>
    </div>
  );
}
