'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast CSS

interface CryptoCardProps {
  id: string;
  img: string;
  name: string;
  currentPrice: number;
  symbol: string;
  market_cap_change_percentage_24h: number;
  removeFromFavorites: (id: string) => void;
}

interface FavoriteCrypto {
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
  removeFromFavorites,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites: FavoriteCrypto[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(savedFavorites.some((crypto) => crypto.id === id));
  }, [id]);

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    let favorites: FavoriteCrypto[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (!isFavorite) {
      favorites.push({ id, img, name, currentPrice, symbol, market_cap_change_percentage_24h });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success(`${name} added to favorites!`);
    } else {
      favorites = favorites.filter((crypto) => crypto.id !== id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(false);
      toast.error(`${name} removed from favorites!`);
      removeFromFavorites(id);
    }
  };

  // Dynamic styling for price change
  const priceChangeStyle =
    market_cap_change_percentage_24h > 0
      ? "border-green-500 bg-green-50"
      : "border-red-500 bg-red-50";

  return (
    <div
      className={`max-w-[20rem] w-full border text-black rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 dark:bg-gray-800 dark:text-yellow-100 flex flex-col ${priceChangeStyle}`}
    >
      <div className="flex items-center p-4 space-x-4">
        <Link href={`/home/${id}`} className="flex items-center space-x-4 w-full">
          <div className="w-16 h-16 relative">
            <Image src={img} layout="fill" objectFit="contain" alt="crypto-image" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="lg:text-2xl text-lg font-bold text-yellow-700 dark:text-yellow-400">
                {name}
              </h2>
            </div>
            <h2 className="text-md text-yellow-600 dark:text-yellow-300">{symbol.toUpperCase()}</h2>
          </div>
        </Link>

        <button
          className="text-2xl text-yellow-500 p-3 z-20 hover:text-yellow-400"
          onClick={handleStarClick}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="p-4 flex justify-between">
        <div>
          <h1 className="text-yellow-600 dark:text-yellow-300">Price</h1>
          <h1 className="font-bold text-yellow-700 dark:text-yellow-400">${currentPrice.toFixed(2)}</h1>
        </div>
        <div>
          <h1 className="text-yellow-600 dark:text-yellow-300">24h Change</h1>
          {market_cap_change_percentage_24h > 0 ? (
            <h1 className="text-green-700 font-bold">
              {market_cap_change_percentage_24h.toFixed(2)}%
            </h1>
          ) : (
            <h1 className="text-red-700 font-bold">
              {market_cap_change_percentage_24h.toFixed(2)}%
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;