/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from "react-apexcharts";

const RevenueTrends = ({ bookings }: any) => {
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

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: "revenue-trends",
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: labels,
      title: {
        text: "Dates",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    yaxis: {
      title: {
        text: "Revenue ($)",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const, // Ensure correct typing here
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    markers: {
      size: 5,
    },
    colors: ["#4CAF50"],
  };

  const chartSeries = [
    {
      name: "Revenue",
      data,
    },
  ];

  return (
    <div>
      {labels.length > 0 ? (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
      ) : (
        <p className="text-gray-500">
          No revenue data available for the selected period.
        </p>
      )}
    </div>
  );
};

export default RevenueTrends;
