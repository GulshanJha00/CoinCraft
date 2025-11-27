"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

export default function ComparePage() {
  const [coinsList, setCoinsList] = useState<any[]>([]);
  const [coin1, setCoin1] = useState<string>("");
  const [coin2, setCoin2] = useState<string>("");

  const [details1, setDetails1] = useState<any>(null);
  const [details2, setDetails2] = useState<any>(null);

  const [chart1, setChart1] = useState<any>(null);
  const [chart2, setChart2] = useState<any>(null);

  const [range, setRange] = useState(30);

  // Fetch all coins for dropdown
  useEffect(() => {
    async function loadCoins() {
      const r = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200"
      );
      const data = await r.json();
      setCoinsList(data);
      setCoin1("bitcoin"); // default
      setCoin2("ethereum");
    }
    loadCoins();
  }, []);

  // Fetch details + price chart
  async function loadCoinData(id: string, setD: any, setC: any) {
    if (!id) return;

    const d = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const dd = await d.json();
    setD(dd);

    const c = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${range}`
    );
    const ch = await c.json();

    const prices = ch.prices || [];

    setC({
      labels: prices.map((p: any) => new Date(p[0]).toLocaleDateString()),
      data: prices.map((p: any) => p[1]),
    });
  }

  useEffect(() => {
    loadCoinData(coin1, setDetails1, setChart1);
    loadCoinData(coin2, setDetails2, setChart2);
  }, [coin1, coin2, range]);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">

      <h1 className="text-3xl font-bold text-center mb-6">Crypto Comparison</h1>

      {/* Dropdowns */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">

        <select
          className="p-3 rounded-lg bg-white dark:bg-gray-800 border w-full md:w-64"
          value={coin1}
          onChange={(e) => setCoin1(e.target.value)}
        >
          <option value="">Select First Coin</option>
          {coinsList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.symbol.toUpperCase()})
            </option>
          ))}
        </select>

        <select
          className="p-3 rounded-lg bg-white dark:bg-gray-800 border w-full md:w-64"
          value={coin2}
          onChange={(e) => setCoin2(e.target.value)}
        >
          <option value="">Select Second Coin</option>
          {coinsList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.symbol.toUpperCase()})
            </option>
          ))}
        </select>

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 border"
        >
          <option value={7}>7 Days</option>
          <option value={14}>14 Days</option>
          <option value={30}>30 Days</option>
          <option value={90}>90 Days</option>
        </select>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

        {/* COIN 1 CARD */}
        {details1 && (
          <CoinCard details={details1} />
        )}

        {/* COIN 2 CARD */}
        {details2 && (
          <CoinCard details={details2} />
        )}
      </div>

      {/* PRICE COMPARISON */}
      <h2 className="text-2xl text-center font-bold mb-4">
        Price Comparison ({range} Days)
      </h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-12" style={{ height: 400 }}>
        {chart1 && chart2 ? (
          <Line
            data={{
              labels: chart1.labels,
              datasets: [
                {
                  label: details1.name,
                  data: chart1.data,
                  borderColor: "#ff6384",
                  backgroundColor: "rgba(255,99,132,0.2)",
                },
                {
                  label: details2.name,
                  data: chart2.data,
                  borderColor: "#36a2eb",
                  backgroundColor: "rgba(54,162,235,0.2)",
                },
              ],
            }}
          />
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>

      {/* MARKET CAP BAR CHART */}
      <h2 className="text-2xl font-bold text-center mb-4">Market Cap Comparison</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-12" style={{ height: 300 }}>
        <Bar
          data={{
            labels: [details1?.name, details2?.name],
            datasets: [
              {
                label: "Market Cap (USD)",
                data: [
                  details1?.market_data?.market_cap?.usd,
                  details2?.market_data?.market_cap?.usd,
                ],
                backgroundColor: ["#ff6384", "#36a2eb"],
              },
            ],
          }}
        />
      </div>

      {/* VOLUME COMP */}
      <h2 className="text-2xl font-bold text-center mb-4">Trading Volume Comparison</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-12" style={{ height: 300 }}>
        <Bar
          data={{
            labels: [details1?.name, details2?.name],
            datasets: [
              {
                label: "24h Volume (USD)",
                data: [
                  details1?.market_data?.total_volume?.usd,
                  details2?.market_data?.total_volume?.usd,
                ],
                backgroundColor: ["#f97316", "#22c55e"],
              },
            ],
          }}
        />
      </div>

    </div>
  );
}

function CoinCard({ details }: { details: any }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center gap-6">
        <Image
          src={details.image?.large}
          alt={details.name}
          width={96}
          height={96}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {details.name} ({details.symbol.toUpperCase()})
          </h2>
          <p><b>Rank:</b> {details.market_cap_rank}</p>
          <p><b>Market Cap:</b> ${details.market_data.market_cap.usd.toLocaleString()}</p>
          <p><b>High 24h:</b> ${details.market_data.high_24h.usd.toLocaleString()}</p>
          <p><b>Low 24h:</b> ${details.market_data.low_24h.usd.toLocaleString()}</p>
          <p>
            <b>24h Change:</b>{" "}
            <span className={details.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
              {details.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
