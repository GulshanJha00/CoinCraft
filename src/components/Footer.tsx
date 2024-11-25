"use client";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white text-center transition-colors duration-500">
      <div className="container mx-auto px-6 sm:px-12">
        {/* Logo and About */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            CoinVerse
          </h1>
          <p className="text-sm sm:text-base mt-2">
            Your gateway to real-time cryptocurrency data and insights. 
            Track your favorite coins, explore exchanges, and stay updated!
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link
            href="/home/favorites"
            className="text-yellow-600 hover:text-yellow-400 transition-colors duration-300"
          >
            Favorites
          </Link>
          <Link
            href="/home/exchange"
            className="text-yellow-600 hover:text-yellow-400 transition-colors duration-300"
          >
            Exchange
          </Link>
          <Link
            href="/home/about"
            className="text-yellow-600 hover:text-yellow-400 transition-colors duration-300"
          >
            About
          </Link>
          
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center space-x-6 mb-6">
          <Link
            href="https://twitter.com"
            className="text-yellow-600 hover:text-yellow-400 transition-transform duration-300 transform hover:scale-110"
          >
            🐦 Twitter
          </Link>
          <Link
            href="https://facebook.com"
            className="text-yellow-600 hover:text-yellow-400 transition-transform duration-300 transform hover:scale-110"
          >
            📘 Facebook
          </Link>
          <Link
            href="https://instagram.com"
            className="text-yellow-600 hover:text-yellow-400 transition-transform duration-300 transform hover:scale-110"
          >
            📸 Instagram
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold text-yellow-600 dark:text-yellow-400">
            CoinVerse
          </span>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
