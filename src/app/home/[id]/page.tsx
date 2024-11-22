'use client';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Define types for fetched data
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

const fetchCryptoAnalysis = async (id: string): Promise<PriceData[]> => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '30', // Fetch last 30 days' data
      },
    });

    const data = response.data;

    return data.prices.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp).toLocaleDateString('en-US'),
      price,
    }));
  } catch (error) {
    console.error(`Error fetching data for coin ID: ${id}`, error);
    return [];
  }
};

const CryptoAnalysisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the `id` dynamically from route parameters
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalysis = async () => {
      if (!id) return; // Ensure `id` exists

      try {
        setLoading(true);
        setError(null); // Reset any previous error message
        const analysisData = await fetchCryptoAnalysis(id);

        if (analysisData.length === 0) {
          setError('No data available for this cryptocurrency.');
          setChartData(null);
        } else {
          const labels = analysisData.map((entry) => entry.date);
          const prices = analysisData.map((entry) => entry.price);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Price (USD)',
                data: prices,
                borderColor: 'rgba(255, 215, 0, 1)', // Yellow color for the line
                backgroundColor: 'rgba(255, 215, 0, 0.2)', // Light yellow fill
                fill: true,
              },
            ],
          });
        }
      } catch (err) {
        console.log(err)
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>Loading data...</p>;
  }
  

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{error}</p>;
  }

  if (!chartData) {
    return <p style={{ textAlign: 'center', fontSize: '18px' }}>No data available for the selected cryptocurrency.</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', borderRadius: '10px' }}>
      <div style={{ backgroundColor: '#f4f4f4', padding: '10px 20px', borderRadius: '8px', border: '2px solid #ffcc00', display: 'inline-block', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '30px', color: '#ffcc00', textAlign: 'center' }}>Cryptocurrency Analysis: {id?.toUpperCase()}</h1>
      </div>
      
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  font: {
                    size: 14,
                    weight: 'bold',
                    family: 'Arial, sans-serif',
                  },
                  color: '#333',
                },
              },
              title: {
                display: true,
                text: `Price Trend for ${id?.toUpperCase()} (Last 30 Days)`,
                font: {
                  size: 18,
                  family: 'Arial, sans-serif',
                },
                color: '#333',
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#888',
                },
              },
              y: {
                ticks: {
                  color: '#888',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CryptoAnalysisPage;
