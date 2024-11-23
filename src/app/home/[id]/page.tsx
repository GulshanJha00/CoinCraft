"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Line, PolarArea, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

interface CryptoDetails {
  name: string;
  symbol: string;
  marketRank: number;
  img: string;
  marketCap: number;
  priceChange24h: number | { usd: number };
  price24hHigh: number | { usd: number }; // Update to handle both `number` and `{ usd: number }`
  price24hLow: number | { usd: number }; // Do the same for price24hLow if needed
}

interface PriceData {
  date: string;
  price: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}
let imagge = "";
const fetchCryptoDetails = async (
  id: string
): Promise<CryptoDetails | null> => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    const { name, symbol, market_data } = response.data;
    imagge = response.data.image.large;

    return {
      name,
      symbol,
      img: imagge,
      marketRank: market_data.market_cap_rank,
      marketCap: market_data.market_cap.usd,
      priceChange24h: market_data.price_change_percentage_24h,
      price24hHigh: market_data.high_24h,
      price24hLow: market_data.low_24h,
    };
  } catch (error) {
    console.error(`Error fetching details for coin ID: ${id}`, error);
    return null;
  }
};

const fetchCryptoAnalysis = async (id: string): Promise<PriceData[]> => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: { vs_currency: "usd", days: "30" },
      }
    );

    return response.data.prices.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp).toLocaleDateString("en-US"),
      price,
    }));
  } catch (error) {
    console.error(`Error fetching analysis data for coin ID: ${id}`, error);
    return [];
  }
};

const CryptoDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cryptoDetails, setCryptoDetails] = useState<CryptoDetails | null>(
    null
  );
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  const polarAreaData = {
    labels: ["Bitcoin", "Ethereum", "Cardano", "Binance Coin", "Solana"],
    datasets: [
      {
        label: "Market Share (%)",
        data: [40, 25, 15, 10, 10],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Mining", "Staking", "Trading", "Investing"],
    datasets: [
      {
        label: "User Activities",
        data: [30, 20, 25, 25],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const [details, analysisData] = await Promise.all([
          fetchCryptoDetails(id),
          fetchCryptoAnalysis(id),
        ]);

        if (!details || analysisData.length === 0) {
          setError("Failed to load cryptocurrency details or analysis data.");
          setCryptoDetails(null);
          setChartData(null);
          return;
        }

        setCryptoDetails(details);

        const labels = analysisData.map((entry) => entry.date);
        const prices = analysisData.map((entry) => entry.price);

        setChartData({
          labels,
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              borderColor: "rgba(255, 215, 0, 1)",
              backgroundColor: "rgba(255, 215, 0, 0.2)",
              fill: true,
            },
          ],
        });
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return
    (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      </div>
    </div>
    )
  ;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-5 font-sans bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div className="p-6 font-sans bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-300">
        <div className="bg-yellow-100 dark:bg-yellow-900 rounded-xl shadow-lg">
          {cryptoDetails && (
            <div className="bg-white dark:bg-yellow-800 p-8 rounded-2xl shadow-lg flex flex-col md:flex-row md:space-x-12 mb-6">
              {/* Left Section: Image & Title */}
              <div className="flex justify-center sm:w-full items-center mb-6 md:mb-0 lg:w-32 h-32 md:w-40 md:h-40">
                <Image
                  src={cryptoDetails.img}
                  width={100}
                  height={100}
                  alt={cryptoDetails.name}
                  className="rounded-full shadow-lg"
                />
              </div>

              {/* Right Section: Details */}
              <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-extrabold text-yellow-600 dark:text-yellow-300 transition-colors duration-300">
                  {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})
                </h1>
                <p className="text-md md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Market Rank: {cryptoDetails.marketRank.toLocaleString()}
                </p>
                <p className="text-md md:text-xl text-gray-800 dark:text-gray-200">
                  Market Cap: ${cryptoDetails.marketCap.toLocaleString()}
                </p>
                <p className="text-md md:text-xl text-gray-800 dark:text-gray-200">
                  24h High: $
                  {typeof cryptoDetails.price24hHigh === "object"
                    ? cryptoDetails.price24hHigh?.usd.toLocaleString()
                    : cryptoDetails.price24hHigh?.toLocaleString() ?? "N/A"}
                </p>
                <p className="text-md md:text-xl text-gray-800 dark:text-gray-200">
                  24h Low: $
                  {typeof cryptoDetails.price24hLow === "object"
                    ? cryptoDetails.price24hLow?.usd.toLocaleString()
                    : cryptoDetails.price24hLow?.toLocaleString() ?? "N/A"}
                </p>
                <p className="text-md md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                  24h Price Change:{" "}
                  {typeof cryptoDetails.priceChange24h === "object"
                    ? cryptoDetails.priceChange24h?.usd.toLocaleString()
                    : cryptoDetails.priceChange24h.toLocaleString() ??
                      "N/A"}{" "}
                  %
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-400 h-[40vh] sm:h-[60vh] lg:h-[90vh] p-5 rounded-lg shadow-md mb-5">
        {/* Line Chart */}
        {chartData && (
          <Line
            data={chartData}
            height={300} // Set fixed height for small screens
            width={600} // Set width (optional based on your layout)
            options={{
              responsive: true,
              maintainAspectRatio: false, // Allow the chart to fill the available space
              animation: {
                duration: 2000,
                easing: "easeInOutQuad",
              },
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: {
                      size: 14,
                      weight: "bold",
                      family: "Arial, sans-serif",
                    },
                    color: "#333",
                  },
                },
                title: {
                  display: true,
                  text: `Price Trend for ${id?.toUpperCase()} (Last 30 Days)`,
                  font: {
                    size: 18,
                    family: "Arial, sans-serif",
                  },
                  color: "#333",
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#888",
                  },
                },
                y: {
                  ticks: {
                    color: "#888",
                  },
                },
              },
            }}
          />
        )}
      </div>

      {/* Responsive layout for charts */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
        {/* Polar Area Chart */}
        <div className="bg-white dark:bg-gray-400 p-5 rounded-lg shadow-md w-full h-[300px] sm:h-auto border border-red-500">
          <h2 className="text-center font-bold text-lg mb-3">Market Share</h2>
          <PolarArea
            data={polarAreaData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-400 p-5 rounded-lg shadow-md w-full h-[300px] sm:h-auto border border-blue-500">
          <h2 className="text-center font-bold text-lg mb-3">
            User Activities
          </h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailsPage;
