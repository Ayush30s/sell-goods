import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample datasets for filters
const datasets = {
  thisYear: [
    1200, 1500, 1700, 1300, 2000, 2100, 2500, 2300, 2600, 2800, 3000, 3200,
  ],
  lastYear: [
    1000, 1200, 1400, 1100, 1600, 1700, 2000, 1800, 2100, 2200, 2400, 2600,
  ],
  last6Months: [2000, 2100, 2500, 2300, 2600, 2800],
};

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Sales() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const [filter, setFilter] = useState("thisYear");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // ✅ track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallDevice = windowWidth < 768;
  const isLandscape = windowWidth > windowHeight;

  // Chart height auto-calculated
  const reservedSpace = isSmallDevice ? 240 : 200;
  const chartHeight = Math.max(220, windowHeight - reservedSpace);

  // Data selection
  const selectedData = datasets[filter];
  const labels = filter === "last6Months" ? monthLabels.slice(6) : monthLabels;

  // Insights
  const totalSales = selectedData.reduce((a, b) => a + b, 0);
  const avgSales = (totalSales / selectedData.length).toFixed(0);
  const highestMonthIndex = selectedData.indexOf(Math.max(...selectedData));
  const highestMonth = labels[highestMonthIndex];
  const highestValue = Math.max(...selectedData);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Sales",
        data: selectedData,
        backgroundColor: isDarkMode
          ? "rgba(167, 139, 250, 0.7)"
          : "rgba(99, 102, 241, 0.7)",
        borderRadius: 6,
        maxBarThickness: isSmallDevice ? 28 : 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: !(isSmallDevice && isLandscape) },
        ticks: {
          display: !(isSmallDevice && isLandscape),
          color: isDarkMode ? "#e5e7eb" : "#374151",
          font: { size: isSmallDevice ? 9 : 12 },
        },
      },
      y: {
        grid: {
          color: isDarkMode ? "#374151" : "#f3f4f6",
          display: !(isSmallDevice && isLandscape),
        },
        ticks: {
          display: !(isSmallDevice && isLandscape),
          color: isDarkMode ? "#e5e7eb" : "#374151",
          font: { size: isSmallDevice ? 9 : 12 },
        },
      },
    },
  };

  const filters = [
    { label: "This Year", value: "thisYear" },
    { label: "Last Year", value: "lastYear" },
    { label: "Last 6 Months", value: "last6Months" },
  ];

  return (
    <div
      className={`flex flex-col h-full overflow-hidden p-4 md:p-6 rounded-sm shadow-lg border transition-colors duration-300
        ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
    >
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-lg md:text-xl font-semibold">Monthly Sales</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 md:px-4 py-1.5 rounded-md text-sm md:text-base font-medium transition border
                ${
                  filter === f.value
                    ? "bg-purple-600 text-white border-purple-600 shadow"
                    : isDarkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 w-full">
        <div
          className={`p-3 rounded-md text-center ${
            isDarkMode ? "bg-purple-900/30" : "bg-purple-50"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Total Sales
          </p>
          <p className="text-lg font-bold text-purple-700 dark:text-purple-400">
            ${totalSales.toLocaleString()}
          </p>
        </div>
        <div
          className={`p-3 rounded-md text-center ${
            isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Average / Month
          </p>
          <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
            ${avgSales}
          </p>
        </div>
        <div
          className={`p-3 rounded-md text-center ${
            isDarkMode ? "bg-green-900/30" : "bg-green-50"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">Best Month</p>
          <p className="text-lg font-bold text-green-700 dark:text-green-400">
            {highestMonth} (${highestValue.toLocaleString()})
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full" style={{ height: `${chartHeight}px` }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
