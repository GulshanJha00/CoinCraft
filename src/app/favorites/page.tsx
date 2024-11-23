'use client';
import { useEffect, useState } from "react";
import CryptoCard from "../coins/markets/CryptoCard";
import Link from "next/link";
import Image from "next/image";

interface FavoriteCrypto {
  id: string;
  img: string;
  name: string;
  currentPrice: number;
  symbol: string;
  market_cap_change_percentage_24h: number;
}

export default function Favourites() {
  const [favorites, setFavorites] = useState<FavoriteCrypto[]>([]); // Typed state

  useEffect(() => {
    // Fetch favorites from localStorage when the component mounts
    const savedFavorites: FavoriteCrypto[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (id: string) => {
    // Remove the selected crypto from the favorites list
    const updatedFavorites = favorites.filter((crypto) => crypto.id !== id);
    setFavorites(updatedFavorites); // Update local state
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Persist changes in localStorage
  };

  // Deduplicate favorites based on ID
  const uniqueFavorites = favorites.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );

  return (
    <div className="relative min-h-screen bg-[url('/fev2.png')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 backdrop-blur-sm  dark:bg-black bg-white opacity-50"></div> {/* Softer opacity */}
      
      <div className="relative min-h-screen px-4 sm:px-8 py-10 ">
        <div className="w-full flex justify-center items-center mb-6">
          <h1 className="text-3xl sm:text-6xl mb-10 text-center font-bold text-yellow-400">
            Your Favo<span className="text-white">rite Cryptos</span>
          </h1>
        </div>

        {/* Crypto Cards Grid */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-7">
            {uniqueFavorites.length > 0 ? (
              uniqueFavorites.map((crypto) => (
                <CryptoCard
                  key={crypto.id}
                  id={crypto.id}
                  img={crypto.img}
                  name={crypto.name}
                  currentPrice={crypto.currentPrice}
                  symbol={crypto.symbol}
                  market_cap_change_percentage_24h={crypto.market_cap_change_percentage_24h}
                  removeFromFavorites={removeFromFavorites} // Pass remove logic
                />
              ))
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {/* Empty State */}
                <Image
                  src={"/nofav.png"}
                  width={200}
                  height={200}
                  alt="No favorites yet" 
                  className="w-48 mb-6 animate-pulse"
                />
                <p className="text-xl sm:text-2xl text-gray-300 mb-4">
                  You don&apos;t have any favorite cryptos yet!
                </p>
                <p className="text-lg sm:text-xl text-gray-400 mb-6">
                  Browse cryptos and tap the STAR to keep your top picks.
                </p>
                <Link href={"home"}>
                  <button
                    className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-all"
                  >
                    Start Browsing
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
