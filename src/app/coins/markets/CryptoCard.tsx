"use client";
import { useState } from "react";
import Image from "next/image";

interface CryptoCardProps {
  img: string;
  name: string;
  currentPrice: number;
  symbol: string;
  market_cap_change_percentage_24h: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  img,
  name,
  currentPrice,
  symbol,
  market_cap_change_percentage_24h,
}) => {
  // State to track whether the star is active or not
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState(""); // State to show the message

  // Toggle the favorite state when star is clicked
  const handleStarClick = () => {
    setIsFavorite(!isFavorite);
    // Display message based on whether it was added or removed from favorites
    if (!isFavorite) {
      setMessage(`${name} added to favorites!`);
    } else {
      setMessage(`${name} removed from favorites!`);
    }

    // Clear message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="max-w-[20rem] w-full bg-gray-300 border border-green-500 text-black rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 dark:bg-gray-800 dark:text-white flex flex-col">
      <div className="flex items-center p-4 space-x-4">
        {/* Image on the left side */}
        <div className="w-16 h-16 relative">
          <Image src={img} layout="fill" objectFit="contain" alt="crypto-image" />
        </div>

        <div className="flex-1">
          {/* Name and symbol on the right side */}
          <div className="flex justify-between items-center">
            <h2 className="lg:text-2xl text-lg font-bold">{name}</h2>
            
            
            <button
              className="text-2xl text-yellow-500"
              onClick={handleStarClick}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
            <h2 className="text-md">{symbol.toUpperCase()}</h2>
        </div>
      </div>

      {/* Display the message when the star is clicked */}
      {message && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-lg">
          {message}
        </div>
        
      )}
      <div className="p-4 flex justify-between">
        <div>
          <h1>Price</h1>
          <h1 className="font-bold">${currentPrice.toFixed(2)}</h1>
        </div>
        <div>
          <h1>24h Change</h1>
          {
            market_cap_change_percentage_24h>0? <h1 className="text-green-700 font-bold">{market_cap_change_percentage_24h}</h1>
             :
             <h1 className="text-red-700 font-bold">{market_cap_change_percentage_24h}</h1>
          }
          
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
