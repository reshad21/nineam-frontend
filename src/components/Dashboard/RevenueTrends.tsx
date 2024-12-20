/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const RevenueTrends = ({ bookings }: any) => {
  const chartRef = useRef<any>(null);

  // Aggregate revenue by day
  const aggregatedData = bookings?.data?.reduce((acc: any, booking: any) => {
    const date = new Date(booking.createdAt).toLocaleDateString(); // Format as 'MM/DD/YYYY'
    acc[date] = (acc[date] || 0) + booking.totalCost; // Sum revenue by date
    return acc;
  }, {});

  const labels = Object.keys(aggregatedData || {}).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const data = labels.map((date) => aggregatedData[date]);

  // Chart.js Data
  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue ($)",
        data,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart.js Options
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "X Axis Label",
        },
      },
      y: {
        title: {
          display: true,
          text: "Y Axis Label",
        },
      },
    },
  };

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      {labels.length > 0 ? (
        <Line ref={chartRef} data={chartData} options={options} />
      ) : (
        <p className="text-gray-500">
          No revenue data available for the selected period.
        </p>
      )}
    </div>
  );
};

export default RevenueTrends;
