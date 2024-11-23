"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define the Crypto type based on CoinGecko API response
interface Crypto {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const Carousel: React.FC = () => {
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
    <div className="relative overflow-hidden w-full">
      <br />
      <div
        className="lg:flex items-center gap-8 animate-scroll md:w-full hiden"
        style={{
          animation: "scroll 20s linear infinite",
        }}
      >
        {loading
          ? Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="min-w-[200px] sm:min-w-[250px] bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 dark:from-yellow-100 dark:via-yellow-200 dark:to-yellow-300 border border-yellow-400 rounded-xl shadow-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full mb-4"></div>
                <div className="w-24 h-4 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
                <div className="w-16 h-4 bg-gray-400 dark:bg-gray-600 rounded"></div>
              </div>
            ))
          : cryptoData.map((coin) => (
              <div
                key={coin.id}
                className={`min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px] max-w-full rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:scale-110 hover:shadow-xl transform ${
                  coin.price_change_percentage_24h > 0
                    ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 dark:from-yellow-500 dark:via-yellow-600 dark:to-yellow-700"
                    : "bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 dark:from-yellow-700 dark:via-yellow-800 dark:to-yellow-900"
                }`}
              >
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {coin.name}
                </h3>
                <p className="text-lg text-yellow-700 dark:text-yellow-100">
                  ${coin.current_price.toFixed(2)}
                </p>
                <p
                  className={`text-sm ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            ))}
      </div>
      <br />
    </div>




  );
};

export default Carousel;
