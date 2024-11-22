"use client";
import { useState } from "react";
import Image from "next/image";

interface CryptoCardProps {
  img: string;
  name: string;
  currentPrice: number;
  symbol: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  img,
  name,
  currentPrice,
  symbol,
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
      <div className="images relative">
        {/* Clickable Star with larger font size */}
        <button
          className="absolute top-2 right-2 text-3xl text-yellow-500"
          onClick={handleStarClick}
        >
          {/* Display filled or empty star based on isFavorite state */}
          {isFavorite ? "★" : "☆"}
        </button>
        <Image src={img} width={70} height={70} alt="cryptimage" />
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-bold">{name}</h2>

        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl">${currentPrice}</p>
        </div>

        <div className="mt-4 flex justify-center">
          <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all">
            {symbol}
          </button>
        </div>
      </div>

      {/* Display the message when the star is clicked */}
      {message && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default CryptoCard;
