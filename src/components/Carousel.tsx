"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Compare } from "@/components/ui/compare"; // Adjust import according to your file structure
import gsap from "gsap";
// Define the type for the CryptoCard props
interface CryptoCardProps {
  id: string;
  img: string;
  name: string;
  currentPrice: number;
  symbol: string;
  market_cap_change_percentage_24h: number;
  removeFromFavorites: () => void;
  currencySymbol: string;
}


const CryptoCard: React.FC<CryptoCardProps> = ({
  id,
  img,
  name,
  currentPrice,
  symbol,
  market_cap_change_percentage_24h,
  currencySymbol,
}) => {
  const priceChangeStyle =
    market_cap_change_percentage_24h > 0 ? "bg-green-100" : "bg-red-100";

  return (
    <div
      className={` w-full h-full border text-black rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 dark:bg-gray-800 dark:text-yellow-100 flex flex-col ${priceChangeStyle} p-4`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between space-x-4">
        <Link href={`/home/${id}`} className="flex items-center space-x-4 w-full">
          <div className="sm:w-16 sm:h-16 w-8 h-8 relative">
            <Image src={img} layout="fill" objectFit="contain" alt="crypto-image" />
          </div>

          <div className="flex-1">
            <h2 className="lg:text-2xl sm:text-xl text-md font-bold text-yellow-700 dark:text-yellow-400">
              {name}
            </h2>
            <h2 className="text-md text-yellow-600 dark:text-yellow-300">
              {symbol.toUpperCase()}
            </h2>
          </div>
        </Link>

        
      </div>

      {/* Price and 24h Change Section */}
      <div className="flex justify-between items-center mt-4">
        <div className="mr-2">
          <h1 className="text-yellow-600 dark:text-yellow-300">Price</h1>
          <h1 className="font-bold text-sm sm:text-xl text-yellow-700 dark:text-yellow-400">
            {currencySymbol}{currentPrice.toFixed(2)}
          </h1>
        </div>
        <div >
          <h1 className="text-yellow-600 dark:text-yellow-300">24h Change</h1>
          {market_cap_change_percentage_24h > 0 ? (
            <h1 className="text-green-700  font-bold">
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


// Define the type for the data array
interface CryptoData {
  id: string;
  image: string;
  name: string;
  current_price: number;
  symbol: string;
  market_cap_change_percentage_24h: number;
}

const Carousel: React.FC = () => {
  const [data, setData] = useState<CryptoData[]>([]); // Initialize with proper type

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd", // Specify currency
              order: "market_cap_desc", // Order by market cap
              per_page: 10, // Limit results
              page: 1,
              sparkline: false, // No sparkline data
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchApi();

    const timeline = gsap.timeline();

    timeline.from(".carousel",
      {
        opacity: 0,
        y: -100,
        overflow: "hidden",
        duration: 1.2,
      }
    )
   
  }, []);

  return (
    <div className="carousel h-56 px-1 md:px-8 flex items-center justify-center mt-5 mb-10">
      <div className=" p-1 md:p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 mx-auto lg:w-2/3 w-full  h-full">
        {data.length >= 2 ? (
          <Compare
            firstImage={
              <CryptoCard
                id={data[0].id}
                img={data[0].image}
                name={data[0].name}
                currentPrice={data[0].current_price}
                symbol={data[0].symbol}
                market_cap_change_percentage_24h={data[0].market_cap_change_percentage_24h}
                removeFromFavorites={() => console.log("Remove feature here")}
                currencySymbol="$"
              />
            }
            secondImage={
              <CryptoCard
                id={data[1].id}
                img={data[1].image}
                name={data[1].name}
                currentPrice={data[1].current_price}
                symbol={data[1].symbol}
                market_cap_change_percentage_24h={data[1].market_cap_change_percentage_24h}
                removeFromFavorites={() => console.log("Remove feature here")}
                currencySymbol="$"
              />
            }
            className="w-full h-full rounded-[22px] md:rounded-lg"
            slideMode="hover"
            autoplay={true}
          />
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Carousel;
