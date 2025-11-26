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
import { Line, Bar, Pie, Doughnut, Scatter } from "react-chartjs-2";

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

export default function CryptoDashboardBeforeAfter() {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  // (default 30)
  const [range, setRange] = useState<number>(30);

  // coin details (fetched once)
  const [details, setDetails] = useState<any>(null);

  // --- All charts (initial 30-day) BEFORE
  const [priceBefore, setPriceBefore] = useState<any>(null);
  const [weeklyBefore, setWeeklyBefore] = useState<any>(null);
  const [volumeBefore, setVolumeBefore] = useState<any>(null);
  const [pieBefore, setPieBefore] = useState<any>(null);
  const [histBefore, setHistBefore] = useState<any>(null);
  const [scatterBefore, setScatterBefore] = useState<any>(null);
  const [doughnutBefore, setDoughnutBefore] = useState<any>(null);

  // --- All charts (initial 30-day) AFTER
  const [priceAfter, setPriceAfter] = useState<any>(null);
  const [weeklyAfter, setWeeklyAfter] = useState<any>(null);
  const [volumeAfter, setVolumeAfter] = useState<any>(null);
  const [pieAfter, setPieAfter] = useState<any>(null);
  const [histAfter, setHistAfter] = useState<any>(null);
  const [scatterAfter, setScatterAfter] = useState<any>(null);
  const [doughnutAfter, setDoughnutAfter] = useState<any>(null);

  // --- Big full-width charts (these respond to the dropdown)
  const [bigBefore, setBigBefore] = useState<any>(null);
  const [bigAfter, setBigAfter] = useState<any>(null);

  // Helper: build five point summary
  function fivePointSummary(arr: number[]) {
    if (!arr || arr.length === 0) return [0, 0, 0, 0, 0];
    const sorted = [...arr].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const q25 = sorted[Math.floor((sorted.length - 1) * 0.25)] ?? min;
    const q50 = sorted[Math.floor((sorted.length - 1) * 0.5)] ?? min;
    const q75 = sorted[Math.floor((sorted.length - 1) * 0.75)] ?? max;
    return [
      Number(min.toFixed(2)),
      Number(q25.toFixed(2)),
      Number(q50.toFixed(2)),
      Number(q75.toFixed(2)),
      Number(max.toFixed(2)),
    ];
  }

  // Initial fetch: build all charts (default 30 days)
  useEffect(() => {
    if (!id) return;

    const fetchInitial = async () => {
      try {
        // coin details
        const detailsRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const coin = await detailsRes.json();
        setDetails(coin);

        // market chart for initial 30 days (used for "all other" charts)
        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
        );
        const chart = await chartRes.json();

        // RAW arrays (30 days)
        const rawPrices = (chart.prices || []).map((p: any) => ({
          date: new Date(p[0]).toLocaleDateString(),
          price: typeof p[1] === "number" ? p[1] : null,
        }));

        const rawVolumes = (chart.total_volumes || []).map((v: any) => ({
          date: new Date(v[0]).toLocaleDateString(),
          volume: typeof v[1] === "number" ? v[1] / 1_000_000_000 : null, // billions
        }));

        const rawMarketCaps = (chart.market_caps || []).map((m: any) => ({
          date: new Date(m[0]).toLocaleDateString(),
          marketCap: typeof m[1] === "number" ? m[1] / 1_000_000_000 : null, // billions
        }));

        // ----------------
        // BEFORE datasets (30d raw)
        // ----------------
        setPriceBefore({
          labels: rawPrices.map((r: any) => r.date),
          datasets: [
            {
              label: `${coin.name} Price (Raw 30d)`,
              data: rawPrices.map((r: any) => r.price),
              borderColor: "rgba(255,99,132,1)",
              backgroundColor: "rgba(255,99,132,0.12)",
              fill: true,
              tension: 0.3,
            },
          ],
        });

        setWeeklyBefore({
          labels: rawPrices.slice(-7).map((r: any) => r.date),
          datasets: [
            {
              label: `${coin.name} Weekly (Raw)`,
              data: rawPrices.slice(-7).map((r: any) => r.price),
              borderColor: "rgba(255,99,132,1)",
              backgroundColor: "rgba(255,99,132,0.12)",
              fill: true,
            },
          ],
        });

        setVolumeBefore({
          labels: rawVolumes.map((r: any) => r.date),
          datasets: [
            {
              label: "Volume (Raw, B USD)",
              data: rawVolumes.map((r: any) => r.volume),
              backgroundColor: "rgba(255,159,64,0.6)",
              borderColor: "rgba(255,159,64,1)",
              borderWidth: 1,
            },
          ],
        });

        setPieBefore({
          labels: ["Market Cap", "Total Volume", "High 24h", "Low 24h"],
          datasets: [
            {
              data: [
                coin.market_data?.market_cap?.usd ?? 0,
                coin.market_data?.total_volume?.usd ?? 0,
                coin.market_data?.high_24h?.usd ?? 0,
                coin.market_data?.low_24h?.usd ?? 0,
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
          ],
        });

        const rawPriceOnly = rawPrices.map((r: any) => r.price).filter((v: any) => v != null);
        setHistBefore({
          labels: ["Min", "25%", "Median", "75%", "Max"],
          datasets: [
            {
              label: "Price Dist (Raw)",
              data: fivePointSummary(rawPriceOnly),
              backgroundColor: "rgba(255,99,132,0.4)",
            },
          ],
        });

        setScatterBefore({
          datasets: [
            {
              label: "Price vs MarketCap (Raw)",
              data: rawPrices.map((r: any, i: number) => ({
                x: r.price,
                y: rawMarketCaps[i] ? rawMarketCaps[i].marketCap : null,
              })),
              backgroundColor: "rgba(255,99,132,1)",
            },
          ],
        });

        setDoughnutBefore({
          labels: ["Market Cap", "Total Volume", "High", "Low"],
          datasets: [
            {
              data: [
                coin.market_data?.market_cap?.usd ?? 0,
                coin.market_data?.total_volume?.usd ?? 0,
                coin.market_data?.high_24h?.usd ?? 0,
                coin.market_data?.low_24h?.usd ?? 0,
              ],
              backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#9966FF"],
            },
          ],
        });

        // ----------------
        // CLEANING (for the 30-day used by other AFTER charts)
        // ----------------
        let cleanPrices = rawPrices.filter((p: any) => typeof p.price === "number" && p.price > 0);

        // dedupe by date
        cleanPrices = cleanPrices.filter((p: any, i: number, arr: any[]) => i === arr.findIndex(x => x.date === p.date));

        // smooth spikes (30% heuristic)
        cleanPrices = cleanPrices.map((p: any, i: number, arr: any[]) => {
          if (i === 0 || i === arr.length - 1) return p;
          const prev = arr[i - 1].price;
          const next = arr[i + 1].price;
          if (!prev || !next) return p;
          const changePrev = Math.abs(p.price - prev) / prev;
          const changeNext = Math.abs(p.price - next) / next;
          if (changePrev > 0.3 && changeNext > 0.3) {
            return { ...p, price: parseFloat(((prev + next) / 2).toFixed(2)) };
          }
          return { ...p, price: parseFloat(p.price.toFixed(2)) };
        });

        // align to minimum length for volume & caps
        const minLen = Math.min(cleanPrices.length, rawVolumes.length, rawMarketCaps.length);
        const alignedPrices = cleanPrices.slice(0, minLen);
        const alignedVolumes = rawVolumes.slice(0, minLen);
        const alignedCaps = rawMarketCaps.slice(0, minLen);

        // AFTER datasets (30d)
        setPriceAfter({
          labels: alignedPrices.map((p: any) => p.date),
          datasets: [
            {
              label: `${coin.name} Price (Cleaned 30d)`,
              data: alignedPrices.map((p: any) => p.price),
              borderColor: "rgba(34,197,94,1)",
              backgroundColor: "rgba(34,197,94,0.12)",
              fill: true,
              tension: 0.3,
            },
          ],
        });

        setWeeklyAfter({
          labels: alignedPrices.slice(-7).map((p: any) => p.date),
          datasets: [
            {
              label: `${coin.name} Weekly (Cleaned)`,
              data: alignedPrices.slice(-7).map((p: any) => p.price),
              borderColor: "rgba(34,197,94,1)",
              backgroundColor: "rgba(34,197,94,0.12)",
              fill: true,
            },
          ],
        });

        setVolumeAfter({
          labels: alignedVolumes.map((v: any) => v.date),
          datasets: [
            {
              label: "Volume (Cleaned, B USD)",
              data: alignedVolumes.map((v: any) => (typeof v.volume === "number" ? parseFloat(v.volume.toFixed(2)) : null)),
              backgroundColor: "rgba(75,192,192,0.5)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });

        const rawMetrics = [
          coin.market_data?.market_cap?.usd ?? 0,
          coin.market_data?.total_volume?.usd ?? 0,
          coin.market_data?.high_24h?.usd ?? 0,
          coin.market_data?.low_24h?.usd ?? 0,
        ];
        const sumMetrics = rawMetrics.reduce((a: number, b: number) => a + b, 0) || 1;

        setPieAfter({
          labels: ["Market Cap %", "Volume %", "High 24h %", "Low 24h %"],
          datasets: [
            {
              data: rawMetrics.map((v: number) => parseFloat(((v / sumMetrics) * 100).toFixed(2))),
              backgroundColor: ["#22c55e", "#60a5fa", "#f97316", "#a78bfa"],
            },
          ],
        });

        setHistAfter({
          labels: ["Min", "25%", "Median", "75%", "Max"],
          datasets: [
            {
              label: "Price Dist (Cleaned)",
              data: fivePointSummary(alignedPrices.map((p: any) => p.price)),
              backgroundColor: "rgba(34,197,94,0.5)",
            },
          ],
        });

        setScatterAfter({
          datasets: [
            {
              label: "Price vs MarketCap (Cleaned)",
              data: alignedPrices.map((p: any, i: number) => ({
                x: p.price,
                y: alignedCaps[i] ? alignedCaps[i].marketCap : null,
              })),
              backgroundColor: "rgba(34,197,94,1)",
            },
          ],
        });

        setDoughnutAfter({
          labels: ["MC %", "Vol %", "High %", "Low %"],
          datasets: [
            {
              data: rawMetrics.map((v: number) => parseFloat(((v / sumMetrics) * 100).toFixed(2))),
              backgroundColor: ["#22c55e", "#60a5fa", "#f97316", "#a78bfa"],
            },
          ],
        });

        // Initialize bigBefore & bigAfter for default 30-day range
        setBigBefore({
          labels: rawPrices.map((r: any) => r.date),
          datasets: [
            {
              label: `${coin.name} (${30}d - Raw)`,
              data: rawPrices.map((r: any) => r.price),
              borderColor: "rgba(255,99,132,1)",
              backgroundColor: "rgba(255,99,132,0.12)",
              fill: true,
            },
          ],
        });

        setBigAfter({
          labels: alignedPrices.map((p: any) => p.date),
          datasets: [
            {
              label: `${coin.name} (${30}d - Cleaned)`,
              data: alignedPrices.map((p: any) => p.price),
              borderColor: "rgba(34,197,94,1)",
              backgroundColor: "rgba(34,197,94,0.12)",
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error("initial fetch error:", err);
      }
    };

    fetchInitial();
    // only run on id change
  }, [id]);

  // When range changes, fetch only market_chart for that range and update bigBefore & bigAfter
  useEffect(() => {
    if (!id) return;

    const fetchRange = async () => {
      try {
        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${range}`
        );
        const chart = await chartRes.json();
        const rawPrices = (chart.prices || []).map((p: any) => ({
          date: new Date(p[0]).toLocaleDateString(),
          price: typeof p[1] === "number" ? p[1] : null,
        }));
        const rawVolumes = (chart.total_volumes || []).map((v: any) => ({
          date: new Date(v[0]).toLocaleDateString(),
          volume: typeof v[1] === "number" ? v[1] / 1_000_000_000 : null,
        }));
        const rawMarketCaps = (chart.market_caps || []).map((m: any) => ({
          date: new Date(m[0]).toLocaleDateString(),
          marketCap: typeof m[1] === "number" ? m[1] / 1_000_000_000 : null,
        }));

        // bigBefore for selected range
        setBigBefore({
          labels: rawPrices.map((r: any) => r.date),
          datasets: [
            {
              label: `Raw (${range}d)`,
              data: rawPrices.map((r: any) => r.price),
              borderColor: "rgba(255,99,132,1)",
              backgroundColor: "rgba(255,99,132,0.12)",
              fill: true,
            },
          ],
        });

        // cleaning only for bigAfter (same logic used previously)
        let cleanPrices = rawPrices.filter((p: any) => typeof p.price === "number" && p.price > 0);
        cleanPrices = cleanPrices.filter((p: any, i: number, arr: any[]) => i === arr.findIndex(x => x.date === p.date));
        cleanPrices = cleanPrices.map((p: any, i: number, arr: any[]) => {
          if (i === 0 || i === arr.length - 1) return p;
          const prev = arr[i - 1].price;
          const next = arr[i + 1].price;
          if (!prev || !next) return p;
          const changePrev = Math.abs(p.price - prev) / prev;
          const changeNext = Math.abs(p.price - next) / next;
          if (changePrev > 0.3 && changeNext > 0.3) {
            return { ...p, price: parseFloat(((prev + next) / 2).toFixed(2)) };
          }
          return { ...p, price: parseFloat(p.price.toFixed(2)) };
        });

        const minLen = Math.min(cleanPrices.length, rawVolumes.length, rawMarketCaps.length);
        const alignedPrices = cleanPrices.slice(0, minLen);

        setBigAfter({
          labels: alignedPrices.map((p: any) => p.date),
          datasets: [
            {
              label: `Cleaned (${range}d)`,
              data: alignedPrices.map((p: any) => p.price),
              borderColor: "rgba(34,197,94,1)",
              backgroundColor: "rgba(34,197,94,0.12)",
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error("range fetch error:", err);
      }
    };

    // fetch for the selected range
    fetchRange();
  }, [id, range]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto Dashboard — Before vs After Cleaning</h1>

      {/* DETAILS + Range selector (Range controls only big charts) */}
      {details && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
          <div className="flex items-center flex-col md:flex-row gap-6">
            <Image
              src={details.image?.large}
              alt={details.name}
              width={96}
              height={96}
              className="rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {details.name} ({details.symbol?.toUpperCase()})
              </h2>
              <p><strong>Market Rank:</strong> {details.market_cap_rank}</p>
              <p><strong>Market Cap:</strong> ${ (details.market_data?.market_cap?.usd ?? 0).toLocaleString() }</p>
              <p><strong>High 24h:</strong> ${ (details.market_data?.high_24h?.usd ?? 0).toLocaleString() }</p>
              <p><strong>Low 24h:</strong> ${ (details.market_data?.low_24h?.usd ?? 0).toLocaleString() }</p>
              <p>
                <strong>24h Change:</strong>{" "}
                <span className={(details.market_data?.price_change_percentage_24h ?? 0) > 0 ? "text-green-500" : "text-red-500"}>
                  {(details.market_data?.price_change_percentage_24h ?? 0).toFixed(2)}%
                </span>
              </p>
            </div>

            <div className="ml-auto">
              <label className="mr-2 font-semibold">Select range for main charts:</label>
              <select
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                <option value={7}>7 Days</option>
                <option value={14}>14 Days</option>
                <option value={30}>30 Days</option>
                <option value={90}>90 Days</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* FULL WIDTH MAIN CHARTS (Before & After) */}
      <h2 className="text-2xl font-semibold mb-3">Main Price Trend — Raw ({range}d)</h2>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md mb-8" style={{ height: 460 }}>
        {bigBefore ? <Line data={bigBefore} /> : <p className="text-center">Loading main raw chart...</p>}
      </div>

      <h2 className="text-2xl font-semibold mb-3">Main Price Trend — Cleaned ({range}d)</h2>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md mb-10" style={{ height: 460 }}>
        {bigAfter ? <Line data={bigAfter} /> : <p className="text-center">Loading main cleaned chart...</p>}
      </div>

      {/* BEFORE charts */}
      <h2 className="text-xl font-semibold mb-4">BEFORE (Raw / Uncleaned) — other charts (30d)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ChartCard title="30-Day Price (Before)">{priceBefore && <Line data={priceBefore} />}</ChartCard>
        <ChartCard title="7-Day Price (Before)">{weeklyBefore && <Line data={weeklyBefore} />}</ChartCard>
        <ChartCard title="Volume (Before)">{volumeBefore && <Bar data={volumeBefore} />}</ChartCard>
        <ChartCard title="Market Metrics (Before)">{pieBefore && <Pie data={pieBefore} />}</ChartCard>
        <ChartCard title="Price Distribution (Before)">{histBefore && <Bar data={histBefore} />}</ChartCard>
        <ChartCard title="Price vs MarketCap (Before)">{scatterBefore && <Scatter data={scatterBefore} />}</ChartCard>
        <ChartCard title="Portfolio Breakdown (Before)">{doughnutBefore && <Doughnut data={doughnutBefore} />}</ChartCard>
      </div>

      {/* AFTER charts */}
      <h2 className="text-xl font-semibold mb-4">AFTER (Cleaned / Processed) — other charts (30d)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ChartCard title="30-Day Price (After)">{priceAfter && <Line data={priceAfter} />}</ChartCard>
        <ChartCard title="7-Day Price (After)">{weeklyAfter && <Line data={weeklyAfter} />}</ChartCard>
        <ChartCard title="Volume (After)">{volumeAfter && <Bar data={volumeAfter} />}</ChartCard>
        <ChartCard title="Market Metrics (After)">{pieAfter && <Pie data={pieAfter} />}</ChartCard>
        <ChartCard title="Price Distribution (After)">{histAfter && <Bar data={histAfter} />}</ChartCard>
        <ChartCard title="Price vs MarketCap (After)">{scatterAfter && <Scatter data={scatterAfter} />}</ChartCard>
        <ChartCard title="Portfolio Breakdown (After)">{doughnutAfter && <Doughnut data={doughnutAfter} />}</ChartCard>
      </div>
    </div>
  );
}

/* Small helper card */
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-2 text-center">{title}</h3>
      <div style={{ height: 260 }}>{children}</div>
    </div>
  );
}
