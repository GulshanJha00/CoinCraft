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
    <div className="relative bg-black bg-opacity-50 min-h-screen px-4 sm:px-8 py-10">
      <div className="w-full flex justify-center items-center">
        <h1 className="text-3xl sm:text-6xl text-center text-yellow-400 font-bold">
          Cryptocurrency Dashboard
        </h1>
      </div>

      {/* Description and Search Box */}
      <div className="text-center text-white mt-6">
        <p className="text-lg sm:text-xl mb-4">
          Track real-time cryptocurrency prices, market caps, and trends
        </p>

        {/* Search Box */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for a cryptocurrency"
            className="px-4 py-2 rounded-lg text-black dark:text-white border border-yellow-600 w-full sm:w-80 md:w-96 focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
          {/* Dropdown 1 */}
          <select className="px-5 py-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white text-black w-full sm:w-auto">
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>

          {/* Dropdown 2 */}
          <select className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white text-black w-full sm:w-auto">
            <option value="#">Market Cap</option>
            <option value="htol">High to Low</option>
            <option value="ltoh">Low to High</option>
          </select>

          {/* Dropdown 3 */}
          <select className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white text-black w-full sm:w-auto">
          <option value="#">Price</option>
            <option value="priceH">High to low</option>
            <option value="priceL">Price Low to high</option>
          </select>
        </div>
      </div>

      {/* Crypto Cards Grid */}
      <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-7">
        {/* Map over the cryptoData array */}
        {cryptoData.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            id={crypto.id}
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
  </div>
  );
}
