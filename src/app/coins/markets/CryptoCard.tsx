"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CryptoCardProps {
  id: string;
  img: string;
  name: string;
  currentPrice: number;
  symbol: string;
  market_cap_change_percentage_24h: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  id,
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
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the link from being activated when star is clicked
    
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
    <div className="max-w-[20rem] w-full bg-yellow-100 border border-yellow-500 text-black rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 dark:bg-gray-800 dark:text-yellow-100 flex flex-col">
      <div className="flex items-center p-4 space-x-4">
        {/* Image and name with link */}
        <Link href={`/home/${id}`} className="flex items-center space-x-4 w-full">
          {/* Image on the left side */}
          <div className="w-16 h-16 relative">
            <Image src={img} layout="fill" objectFit="contain" alt="crypto-image" />
          </div>

          <div className="flex-1">
            {/* Name and symbol on the right side */}
            <div className="flex justify-between items-center">
              <h2 className="lg:text-2xl text-lg font-bold text-yellow-700 dark:text-yellow-400">{name}</h2>
            </div>
            <h2 className="text-md text-yellow-600 dark:text-yellow-300">{symbol.toUpperCase()}</h2>
          </div>
        </Link>

        {/* Star button */}
        <button
          className="text-2xl text-yellow-500 p-3 z-20 hover:text-yellow-400"
          onClick={handleStarClick}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      {/* Display the message when the star is clicked */}
      {message && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-lg">
          {message}
        </div>
      )}

      <div className="p-4 flex justify-between">
        <div>
          <h1 className="text-yellow-600 dark:text-yellow-300">Price</h1>
          <h1 className="font-bold text-yellow-700 dark:text-yellow-400">${currentPrice.toFixed(2)}</h1>
        </div>
        <div>
          <h1 className="text-yellow-600 dark:text-yellow-300">24h Change</h1>
          {market_cap_change_percentage_24h > 0 ? (
            <h1 className="text-green-700 font-bold">
              {market_cap_change_percentage_24h}%
            </h1>
          ) : (
            <h1 className="text-red-700 font-bold">
              {market_cap_change_percentage_24h}%
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
