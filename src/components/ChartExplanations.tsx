function ChartExplanations() {
  const explanations = [
    {
      title: "30-Day Price Chart",
      desc: "This shows how the coin's price moved each day for the last 30 days. A rising line = price going up, falling line = price going down."
    },
    {
      title: "7-Day Price Chart",
      desc: "This shows a smaller view — only the last 7 days — helping you see short-term trends like sudden spikes or dips."
    },
    {
      title: "Volume Chart",
      desc: "Volume means how much of the coin was traded. Higher volume = more activity. If price moves a lot with low volume, it's less reliable."
    },
    {
      title: "Market Metrics (Pie Chart)",
      desc: "This compares the size of 4 things — Market Cap, Total Volume, High 24h, and Low 24h — so you can see which is largest or smallest."
    },
    {
      title: "Price Distribution (Histogram / 5-Point Summary)",
      desc: "Instead of showing price over time, this chart shows the statistical spread: Minimum, 25% level, Median, 75% level, and Maximum price from last 30 days."
    },
    {
      title: "Price vs Market Cap (Scatter Plot)",
      desc: "Each dot shows price vs market cap for a day. It helps you see the relationship: if dots form a pattern, price and market cap are linked."
    },
    {
      title: "Portfolio Breakdown (Doughnut Chart)",
      desc: "This shows the same metrics as the pie chart but in a doughnut shape. It helps visualize the percentage contribution of Market Cap, Volume, High, and Low."
    },
    {
      title: "Main Price Trend (Raw vs Cleaned)",
      desc: "Raw is the original data from API (with spikes/noise). Cleaned removes errors, duplicates, and extreme spikes so the trend becomes smoother and easier to understand."
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">📘 Graph Explanations</h2>
      <div className="space-y-4">
        {explanations.map((item) => (
          <div key={item.title} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartExplanations;
