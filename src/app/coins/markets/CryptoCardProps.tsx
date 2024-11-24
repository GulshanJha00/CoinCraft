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
  market_cap: number;
  market_cap_change_percentage_24h: number;
}

export default function CryptoList() {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [filteredData, setFilteredData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const totalPages = 8; 

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await axios.get<Crypto[]>(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: currency,
              order: "market_cap_desc",
              page: currentPage,
              per_page: 10,
            },
          }
        );
        setCryptoData(response.data);
        setFilteredData(response.data); // Initialize filtered data
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching data", error);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [currentPage, currency]);

  useEffect(() => {
    const filteredCryptos = cryptoData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredCryptos);
  }, [searchTerm, cryptoData]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    let sortedData = [...filteredData];

    switch (sortOption) {
      case "htol":
        sortedData = sortedData.sort((a, b) => b.market_cap - a.market_cap);
        break;
      case "ltoh":
        sortedData = sortedData.sort((a, b) => a.market_cap - b.market_cap);
        break;
      case "htolPrice":
        sortedData = sortedData.sort((a, b) => b.current_price - a.current_price);
        break;
      case "ltohPrice":
        sortedData = sortedData.sort((a, b) => a.current_price - b.current_price);
        break;
      default:
        break;
    }

    setFilteredData(sortedData);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);

    // Set the symbol based on the selected currency
    const currencySymbols: { [key: string]: string } = {
      usd: "$",
      inr: "₹",
      eur: "€",
      gbp: "£",
    };

    setCurrencySymbol(currencySymbols[selectedCurrency] || "$");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-red-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[url('/home2.png')] bg-contain bg-center bg-fixed">
      {/* Blur the background */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* Content container */}
      <div className="relative bg-black bg-opacity-50 min-h-screen px-4 sm:px-8 py-10">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-3xl sm:text-6xl text-center font-bold text-yellow-400 dark:text-white">
            Crypto{" "}
            <span className="text-white dark:text-yellow-400">Dashboard</span>
          </h1>
        </div>

        {/* Search and Filters */}
        <div className="text-center text-white mt-6">
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for a cryptocurrency"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg text-black dark:text-white border border-yellow-600 dark:border-yellow-400 w-full sm:w-80 md:w-96 focus:outline-none"
            />
          </div>

          {/* Currency Dropdown */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-8">
            <select
              className="px-5 py-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white text-black w-full sm:w-auto"
              onChange={handleCurrencyChange}
            >
              <option value="usd">USD</option>
              <option value="inr">INR</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white text-black w-full sm:w-auto"
              onChange={handleSortChange}
            >
              <option value="htol">Market Cap High to Low</option>
              <option value="ltoh">Market Cap Low to High</option>
              <option value="htolPrice">Price High to Low</option>
              <option value="ltohPrice">Price Low to High</option>
            </select>
          </div>
        </div>

        {/* Crypto Cards Grid */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-7">
            {filteredData.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                removeFromFavorites={(id) => console.log(`Removing favorite: ${id}`)}
                id={crypto.id}
                img={crypto.image}
                name={crypto.name}
                currentPrice={crypto.current_price}
                symbol={crypto.symbol}
                market_cap_change_percentage_24h={crypto.market_cap_change_percentage_24h}
                currencySymbol={currencySymbol}  // Pass the currency symbol here
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="mx-4 text-white">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
