"use client";

import { useEffect, useState } from "react";
import CryptoCard from "./CryptoCard";
import axios from "axios";

// Define the interface for a single crypto item
interface Crypto {
  id: string;
  image: string;
  name: string;
  current_price: number;
  symbol: string;
  market_cap_change_percentage_24h: number;
}

export default function CryptoList() {
  // Explicitly typing the cryptoData state as Crypto[]
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]); // Make sure the type is specified here
  const [loading, setLoading] = useState(true);

  if(loading){
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      </div>
    </div>
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await axios.get<Crypto[]>(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
              params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                page: 1,
              },
            }
          );
          
        // Explicitly tell TypeScript that the response is of type Crypto[]
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
    <div className="relative min-h-screen bg-[url('/mainbg.jpg')] bg-cover bg-center bg-fixed">
      {/* Blur the background */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      {/* Content container to prevent blur */}
      <div className="relative bg-black bg-opacity-50 min-h-screen px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {/* Map over the cryptoData array */}
          {cryptoData.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              img={crypto.image}
              name={crypto.name}
              currentPrice={crypto.current_price}
              symbol={crypto.symbol}
              market_cap_change_percentage_24h={crypto.market_cap_change_percentage_24h}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
