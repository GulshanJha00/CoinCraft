"use client";

import { useEffect, useState } from "react";
import CryptoCard from "./CryptoCard";
import axios from "axios";

export default function CryptoList() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd", // Fetch prices in USD
              order: "market_cap_desc", // Sort by market cap
              page: 1,
            },
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching data", error);
        setLoading(false);
      }
    };
    fetchCoin();
  }, []);

  

  return (
    <div className='relative min-h-screen bg-[url("/mainbg.jpg")] bg-cover bg-center bg-fixed'>
      {/* Blur the background */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      {/* Content container to prevent blur */}
      <div className="relative bg-black bg-opacity-50 min-h-screen px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {cryptoData.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              img = {crypto.image}
              name={crypto.name}
              currentPrice={crypto.current_price}
              symbol={crypto.symbol}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
