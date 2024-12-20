import React from "react";
import ApexCharts from "react-apexcharts";

// Define types for props
interface Booking {
  createdAt: string; // ISO Date String
}

interface BookingStatisticsProps {
  bookings: {
    data: Booking[]; // List of booking data
  } | null;
}

const BookingStatistics: React.FC<BookingStatisticsProps> = ({ bookings }) => {
  // Helper function to process bookings data
  const getDailyBookingCounts = () => {
    const counts: Record<string, number> = {};
    bookings?.data.forEach((booking) => {
      const date = new Date(booking.createdAt).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });

    const labels = Object.keys(counts).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    const data = labels.map((label) => counts[label]);

    return { labels, data };
  };

  const { labels, data } = getDailyBookingCounts();

  // Define the options for the ApexCharts component
  const chartOptions = {
    chart: {
      type: "bar" as const, // Ensure type is "bar"
      height: 350,
    },
    plotOptions: {
      bar: {
        columnWidth: "50%", // Adjust bar width
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels on the bars
    },
    stroke: {
      width: 1,
      colors: ["#fff"], // White border for the bars
    },
    xaxis: {
      categories: labels, // X-axis categories (dates)
    },
    yaxis: {
      min: 0, // Start the y-axis at zero
    },
    fill: {
      opacity: 0.6, // Set transparency for bars
    },
    colors: ["#36A2EB"], // Bar color
  };

  // Prepare the series data for the chart
  const chartSeries = [
    {
      name: "Daily Bookings",
      data, // Data for the bars
    },
  ];

  return (
    <div className="">
      {labels.length > 0 ? (
        <ApexCharts
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      ) : (
        <p className="text-center text-gray-500">No booking data available.</p>
      )}
    </div>
  );
};

export default BookingStatistics;
