'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Exchange {
  id: string;
  name: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  year_established: number;
  trade_volume_24h_btc: number; // Add trade_volume_24h_btc field
}

const ExchangeList: React.FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Items per page (you can adjust this)

  // Fetch exchange data
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/exchanges');
        setExchanges(response.data);
      } catch (error) {
        console.error('Error fetching exchanges data:', error);
      }
    };
    fetchExchanges();
  }, []);

  // Toggle favorites
 

  // Sort exchanges based on trade_volume_24h_btc
  

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get current exchanges based on pagination
  const indexOfLastExchange = currentPage * itemsPerPage;
  const indexOfFirstExchange = indexOfLastExchange - itemsPerPage;
  const currentExchanges = exchanges.slice(indexOfFirstExchange, indexOfLastExchange);

  // Calculate total pages
  const totalPages = Math.ceil(exchanges.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4 min-h-screen bg-[url('/explore.png')] bg-contain bg-fixed bg-no-repeat">

        <div className='absolute backdrop-blur-md inset-0'></div>
        <div className='relative'>


      <h1 className="text-3xl sm:text-6xl mb-10 text-center font-bold text-yellow-400">
        Crypto<span className="text-white"> Exchanges</span>
      </h1>

      {/* Sorting Button */}
      <div className="flex justify-center mb-4">
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentExchanges.map((exchange) => {

          return (
            <div
              key={exchange.id}
              className="max-w-[20rem] w-full border text-black rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 dark:bg-gray-800 dark:text-yellow-100 flex flex-col"
            >
              <div className="flex items-center p-4 space-x-4">
                
                  <div className="w-16 h-16 relative">
                    <Image src={exchange.image} layout="fill" objectFit="contain" alt="crypto-image" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="lg:text-2xl text-lg font-bold text-yellow-700 dark:text-yellow-400">
                        {exchange.name}
                      </h2>
                    </div>
                  </div>
                

                
              </div>

              <div className="p-4 flex justify-between">
                <div>
                  <h1 className="text-yellow-600 dark:text-yellow-300">Trust Score</h1>
                  <h1 className="font-bold text-yellow-700 dark:text-yellow-400">
                    {exchange.trust_score}
                  </h1>
                </div>
                <div>
                  <h1 className="text-yellow-600 dark:text-yellow-300">Trust Rank</h1>
                  <h1 className="font-bold text-yellow-700 dark:text-yellow-400">
                    {exchange.trust_score_rank}
                  </h1>
                </div>
              </div>

              <div className="p-4 flex justify-between">
                <div>
                  <h1 className="text-yellow-600 dark:text-yellow-300">Trade Volume (BTC)</h1>
                  <h1 className="font-bold text-yellow-700 dark:text-yellow-400">
                    {exchange.trade_volume_24h_btc.toLocaleString()}
                  </h1>
                </div>
                <div>
                  <h1 className="text-yellow-600 dark:text-yellow-300">Year Established</h1>
                  <h1 className="font-bold text-yellow-700 dark:text-yellow-400">
                    {exchange.year_established}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-yellow-100 text-black rounded-l-lg hover:bg-gray-400 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2 text-xl text-black dark:text-yellow-100">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-yellow-100 text-black rounded-r-lg hover:bg-gray-400 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
        </div>
    </div>
  );
};

export default ExchangeList;
