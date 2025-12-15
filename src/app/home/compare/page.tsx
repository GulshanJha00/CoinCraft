"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Line, Bar, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { COINS } from "./mockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Title
);

export default function ComparePage() {
  const [coin1, setCoin1] = useState("bitcoin");
  const [coin2, setCoin2] = useState("ethereum");

  const details1 = COINS.find((c) => c.id === coin1)!;
  const details2 = COINS.find((c) => c.id === coin2)!;

  const prices1 = details1.prices;
  const prices2 = details2.prices;

  const labels = prices1.map((_, i) => `Day ${i + 1}`);

  // --------- MATH ---------
  const volatility = (arr: number[]) => {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance =
      arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length;
    return Math.sqrt(variance);
  };

  const growth = (arr: number[]) =>
    ((arr[arr.length - 1] - arr[0]) / arr[0]) * 100;

  const vol1 = volatility(prices1);
  const vol2 = volatility(prices2);

  const growth1 = growth(prices1);
  const growth2 = growth(prices2);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">

      <h1 className="text-3xl font-bold text-center mb-10">
        Compare Cryptocurrencies
      </h1>

      {/* SELECTORS */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <select
          value={coin1}
          onChange={(e) => setCoin1(e.target.value)}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 border"
        >
          {COINS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.symbol.toUpperCase()})
            </option>
          ))}
        </select>

        <select
          value={coin2}
          onChange={(e) => setCoin2(e.target.value)}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 border"
        >
          {COINS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </div>

      {/* COIN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <CoinCard details={details1} />
        <CoinCard details={details2} />
      </div>

      {/* PRICE CHART */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-12 h-[420px]">
        <Line
          data={{
            labels,
            datasets: [
              {
                label: details1.name,
                data: prices1,
                borderColor: "#ef4444",
                backgroundColor: "rgba(239,68,68,0.2)",
              },
              {
                label: details2.name,
                data: prices2,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.2)",
              },
            ],
          }}
        />
      </div>

      {/* MARKET CAP */}
      <ComparisonBar
        title="Market Cap"
        labels={[details1.name, details2.name]}
        values={[
          details1.market_data.market_cap.usd,
          details2.market_data.market_cap.usd,
        ]}
      />

      {/* VOLUME */}
      <ComparisonBar
        title="24h Volume"
        labels={[details1.name, details2.name]}
        values={[
          details1.market_data.total_volume.usd,
          details2.market_data.total_volume.usd,
        ]}
      />

      {/* VOLATILITY */}
      <ComparisonBar
        title="Volatility (Risk)"
        labels={[details1.name, details2.name]}
        values={[vol1, vol2]}
      />

      {/* GROWTH */}
      <ComparisonBar
        title="Growth %"
        labels={[details1.name, details2.name]}
        values={[growth1, growth2]}
      />

      {/* RISK vs REWARD */}
      <h2 className="text-xl font-bold text-center mb-4">
        Risk vs Reward
      </h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-[350px]">
        <Scatter
          data={{
            datasets: [
              {
                label: details1.name,
                data: [{ x: vol1, y: growth1 }],
                backgroundColor: "#ef4444",
              },
              {
                label: details2.name,
                data: [{ x: vol2, y: growth2 }],
                backgroundColor: "#3b82f6",
              },
            ],
          }}
          options={{
            scales: {
              x: {
                title: { display: true, text: "Volatility (Risk)" },
              },
              y: {
                title: { display: true, text: "Growth % (Reward)" },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ComparisonBar({ title, labels, values }: any) {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-12 h-[300px]">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: title,
                data: values,
                backgroundColor: ["#ef4444", "#3b82f6"],
              },
            ],
          }}
        />
      </div>
    </>
  );
}

function CoinCard({ details }: any) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center gap-6">
        <Image
          src={details.image.large}
          alt={details.name}
          width={90}
          height={90}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {details.name} ({details.symbol.toUpperCase()})
          </h2>
          <p><b>Rank:</b> {details.market_cap_rank}</p>
          <p><b>Market Cap:</b> ${details.market_data.market_cap.usd.toLocaleString()}</p>
          <p><b>24h High:</b> ${details.market_data.high_24h.usd}</p>
          <p><b>24h Low:</b> ${details.market_data.low_24h.usd}</p>
          <p>
            <b>24h Change:</b>{" "}
            <span
              className={
                details.market_data.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {details.market_data.price_change_percentage_24h}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
