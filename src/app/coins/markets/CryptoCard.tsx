'use client'

interface CryptoCardProps {
  name: string;
  currentPrice: number;
  symbol: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ name, currentPrice, symbol }) => {
  return (
    <div className="max-w-sm w-full mx-auto bg-gradient-to-r from-indigo-600 to-teal-500 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:scale-105">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white">{name}</h2>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl text-white">${currentPrice.toFixed(2)}</p>
        </div>

        <div className="mt-4 flex justify-center">
          <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all">
            {symbol}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
