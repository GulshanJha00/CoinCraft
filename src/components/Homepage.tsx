"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define the Crypto type based on CoinGecko API response
interface Crypto {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const Homepage: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data: Crypto[] = await res.json(); // Cast response to the Crypto type
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center relative flex items-center justify-center text-gray-800 dark:text-white text-center"
        style={{
          backgroundImage: `url('/bg-homepage.jpg')`,
        }}
      >
        {/*  Background */}

        <div className="absolute backdrop-blur-[5px] inset-0 bg-gray-400 dark:bg-black opacity-30 dark:bg-black"></div>

        <div className="relative z-10 max-w-4xl p-10 text-center">
          <h1
            className="text-2xl text-gray-300 dark:text-white sm:text-3xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text mb-4 animate__animated animate__fadeInUp"
            style={{
              textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            <span className="text-yellow-400 dark:text-yellow-400">
              CryptoTrack:
            </span>{" "}
            Track Your Crypto{" "}
            <span className="underline decoration-yellow-600 dark:decoration-yellow-400">
              Journey
            </span>
          </h1>












          
          




     

                  



        




















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
      <section className="py-20 px-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white text-center transition-colors duration-500"
      >
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-6"
        style={{
          textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
        }}>
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
