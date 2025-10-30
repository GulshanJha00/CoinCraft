"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import {
  Line,
  Bar,
  Pie,
  Doughnut,
  Scatter,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

export default function CryptoDashboard() {
  const pathname = usePathname();
const id = pathname.split("/").pop();
  const [cryptoDetails, setCryptoDetails] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  // Fetch live data from CoinGecko
  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const details = await detailsRes.json();

        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
        );
        const chart = await chartRes.json();

        setCryptoDetails({
          name: details.name,
          symbol: details.symbol,
          img: details.image.large,
          marketRank: details.market_cap_rank,
          marketCap: details.market_data.market_cap.usd,
          price24hHigh: details.market_data.high_24h.usd,
          price24hLow: details.market_data.low_24h.usd,
          priceChange24h: details.market_data.price_change_percentage_24h,
        });

        setChartData({
          labels: chart.prices.map((p: any) =>
            new Date(p[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: `${details.name} Price (USD)`,
              data: chart.prices.map((p: any) => p[1]),
              borderColor: "#4BC0C0",
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Static dummy charts
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: [67000, 67500, 68000, 69000, 68500, 70000, 71000],
        borderColor: "#4BC0C0",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Trading Volume (in B USD)",
        data: [45, 55, 40, 65, 50, 70, 60],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Bitcoin", "Ethereum", "Tether", "BNB", "Solana"],
    datasets: [
      {
        label: "Market Share",
        data: [48, 25, 10, 9, 8],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const histData = {
    labels: ["60k–62k", "62k–64k", "64k–66k", "66k–68k", "68k–70k"],
    datasets: [
      {
        label: "Price Occurrence",
        data: [5, 10, 15, 7, 4],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: "BTC vs ETH Price",
        data: [
          { x: 67000, y: 3500 },
          { x: 68000, y: 3550 },
          { x: 69000, y: 3650 },
          { x: 70000, y: 3750 },
          { x: 71000, y: 3850 },
        ],
        backgroundColor: "#FF6384",
      },
    ],
  };

  const circleData = {
    labels: ["BTC", "ETH", "BNB", "SOL", "USDT"],
    datasets: [
      {
        data: [50, 25, 10, 10, 5],
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#9966FF",
          "#4BC0C0",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Crypto Analytics Dashboard
      </h1>

      {/* Crypto Info Section */}
      {cryptoDetails && (
        <div className="p-6 bg-yellow-100 dark:bg-yellow-900 rounded-xl shadow-lg mb-6">
          <div className="bg-white dark:bg-yellow-800 p-8 rounded-2xl shadow-lg flex flex-col md:flex-row md:space-x-12">
            <div className="flex justify-center items-center mb-6 md:mb-0 lg:w-32 h-32 md:w-40 md:h-40">
              <Image
                src={cryptoDetails.img}
                width={100}
                height={100}
                alt={cryptoDetails.name}
                className="rounded-full shadow-lg"
              />
            </div>

            <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-yellow-600 dark:text-yellow-300">
                {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})
              </h1>
              <p>Market Rank: {cryptoDetails.marketRank}</p>
              <p>Market Cap: ${cryptoDetails.marketCap.toLocaleString()}</p>
              <p>24h High: ${cryptoDetails.price24hHigh.toLocaleString()}</p>
              <p>24h Low: ${cryptoDetails.price24hLow.toLocaleString()}</p>
              <p>
                24h Change:{" "}
                <span
                  className={
                    cryptoDetails.priceChange24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {cryptoDetails.priceChange24h.toFixed(2)}%
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Price Trend */}
      <div className="bg-white dark:bg-gray-800 h-[50vh] p-5 rounded-lg shadow-md mb-8">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 2000 },
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: `Price Trend for ${id?.toUpperCase()} (Last 30 Days)`,
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-500">Loading chart...</p>
        )}
      </div>

      {/* 6 Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Bitcoin Price Trend">
          <Line data={lineData} />
        </ChartCard>

        <ChartCard title="Weekly Trading Volume">
          <Bar data={barData} />
        </ChartCard>

        <ChartCard title="Market Share">
          <Pie data={pieData} />
        </ChartCard>

        <ChartCard title="Price Distribution">
          <Bar data={histData} />
        </ChartCard>

        <ChartCard title="BTC vs ETH Correlation">
          <Scatter data={scatterData} />
        </ChartCard>

        <ChartCard title="Portfolio Distribution">
          <Doughnut data={circleData} />
        </ChartCard>
      </div>
    </div>
  );
}

// Small helper component for each chart card
function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
      {children}
    </div>
  );
}
