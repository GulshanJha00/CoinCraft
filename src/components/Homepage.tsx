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
        className="h-screen bg-cover bg-center relative flex items-center justify-center text-yellow-800 text-center"
        style={{
          backgroundImage: `url('/bg-homepage.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <div className="relative z-10 max-w-4xl px-6 text-center animate__animated animate__fadeIn">
          <h1 className="text-6xl font-extrabold tracking-tight text-white mb-4">
            CryptoTrack: Track Your Crypto Journey
          </h1>
          <div className="relative overflow-hidden">
            <div
              className="flex items-center gap-6 animate-scroll"
              style={{
                animation: "scroll 20s linear infinite",
              }}
            >
              {loading
                ? Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className="min-w-[250px] bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-200"
                    >
                      <div className="w-16 h-16 bg-gray-700 rounded-full mb-4"></div>
                      <div className="w-24 h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="w-16 h-4 bg-gray-700 rounded"></div>
                    </div>
                  ))
                : [...cryptoData, ...cryptoData].map((coin, index) => (
                    <div
                      key={`${coin.id}-${index}`}
                      className="min-w-[250px] bg-yellow-200 border border-yellow-500 rounded-lg shadow-lg p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-300 dark:bg-green-500"
                    >
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={200}
                        height={200}
                        className="w-16 h-16 mb-4"
                      />
                      <h3 className="text-xl font-bold text-yellow-700">
                        {coin.name}
                      </h3>
                      <p className="text-lg text-green-400">
                        ${coin.current_price}
                      </p>
                      <p
                        className={`text-sm ${
                          coin.price_change_percentage_24h > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  ))}
            </div>
          </div>
          <p className="text-xl font-light mb-8 max-w-3xl mx-auto text-yellow-700">
            Real-time data, personalized tracking, and an intuitive interface.
            Take control of your investments and explore the world of
            cryptocurrency like never before.
          </p>
          <Link href={"/home"}>
            <button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 transform">
              Start Tracking
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 bg-gray-900 text-white text-center">
        <h2 className="text-5xl font-extrabold tracking-tight mb-6 text-yellow-700">
          Why Choose CryptoTrack?
        </h2>
        <p className="text-lg font-light mb-8 max-w-4xl mx-auto text-yellow-700">
          CryptoTrack is built for both beginners and professionals. Experience
          lightning-fast updates, visualized market trends, and the tools you
          need to stay ahead in the game.
        </p>
        <button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 transform">
          Explore Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} CryptoTrack. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
