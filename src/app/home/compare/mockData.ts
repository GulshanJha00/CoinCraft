// mockData.ts (you can also keep this inside same file)

export const COINS = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    market_cap_rank: 1,
    image: { large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    market_data: {
      market_cap: { usd: 850000000000 },
      total_volume: { usd: 28000000000 },
      high_24h: { usd: 44000 },
      low_24h: { usd: 42000 },
      price_change_percentage_24h: 1.2,
    },
    prices: [
      41000, 41500, 41800, 42000, 42200,
      42500, 42800, 43000, 43200, 43500,
      43700, 43800, 43900, 44000, 43850,
      43700, 43600, 43500, 43400, 43300,
      43200, 43100, 43050, 43100, 43200,
      43300, 43400, 43500, 43600, 43700,
    ],
  },

  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    market_cap_rank: 2,
    image: { large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
    market_data: {
      market_cap: { usd: 410000000000 },
      total_volume: { usd: 16000000000 },
      high_24h: { usd: 2400 },
      low_24h: { usd: 2250 },
      price_change_percentage_24h: -0.8,
    },
    prices: [
      2100, 2120, 2150, 2170, 2200,
      2220, 2240, 2260, 2280, 2300,
      2320, 2340, 2350, 2360, 2380,
      2390, 2400, 2380, 2370, 2360,
      2350, 2340, 2330, 2320, 2310,
      2300, 2290, 2280, 2270, 2260,
    ],
  },

  {
    id: "solana",
    name: "Solana",
    symbol: "sol",
    market_cap_rank: 5,
    image: { large: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
    market_data: {
      market_cap: { usd: 45000000000 },
      total_volume: { usd: 2500000000 },
      high_24h: { usd: 105 },
      low_24h: { usd: 96 },
      price_change_percentage_24h: 2.4,
    },
    prices: [
      82, 84, 86, 88, 90,
      92, 94, 96, 97, 98,
      99, 100, 101, 102, 103,
      104, 105, 104, 103, 102,
      101, 100, 99, 98, 97,
      96, 95, 94, 93, 92,
    ],
  },

  {
    id: "bnb",
    name: "BNB",
    symbol: "bnb",
    market_cap_rank: 4,
    image: { large: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png" },
    market_data: {
      market_cap: { usd: 70000000000 },
      total_volume: { usd: 1800000000 },
      high_24h: { usd: 320 },
      low_24h: { usd: 305 },
      price_change_percentage_24h: 0.6,
    },
    prices: [
      280, 282, 285, 287, 289,
      291, 293, 295, 297, 299,
      301, 303, 305, 307, 309,
      311, 313, 315, 317, 318,
      319, 320, 319, 318, 317,
      316, 315, 314, 313, 312,
    ],
  },

  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "doge",
    market_cap_rank: 9,
    image: { large: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png" },
    market_data: {
      market_cap: { usd: 12000000000 },
      total_volume: { usd: 900000000 },
      high_24h: { usd: 0.09 },
      low_24h: { usd: 0.08 },
      price_change_percentage_24h: -1.5,
    },
    prices: [
      0.072, 0.073, 0.074, 0.075, 0.076,
      0.077, 0.078, 0.079, 0.080, 0.081,
      0.082, 0.083, 0.084, 0.085, 0.086,
      0.087, 0.088, 0.089, 0.088, 0.087,
      0.086, 0.085, 0.084, 0.083, 0.082,
      0.081, 0.080, 0.079, 0.078, 0.077,
    ],
  },
];
